/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import noPhoto from '../images/no-photo-available.webp';
import { storage } from "./firebaseConfig";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import '../css/imageLoader.css';

export default function UploadImage({ id, handleRecipeChanges, imgURL }) {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(imgURL ?? noPhoto);
  const [loaderState, setLoaderState] = useState("hidden");

  // useEffect(() => {
  //   console.log("On load img url: " + imgURL);
  // }, []);

  useEffect(() => {
    // console.log(image);
  }, [image]);

  useEffect(() => {
    // console.log(uploadedImageUrl);
    handleRecipeChanges({ imgURL: uploadedImageUrl });
  }, [uploadedImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  const deleteFileFromUrl = (url) => {
    const previousPictureRef = ref(storage, url);

    deleteObject(previousPictureRef).then(() => {
      // console.log("Previous picture deleted successfully");
    }).catch((error) => {
      console.log("Error occured while deleting previous picture: " + error.message);
    });
  }

  const handleImageDelete = (e) => {
    e.preventDefault();
    if (imgURL === "" || imgURL === noPhoto || imgURL === "sampleRecipe") return;

    deleteFileFromUrl(imgURL);
    setUploadedImageUrl(noPhoto);
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!image) return;

    setLoaderState("visible");
    const imageRef = ref(storage, `recipe-images/${v4() + "-" + image.name}`);
    const metadata = {
      contentType: image.type
    };
    uploadBytes(imageRef, image, metadata).then(() => {
      getDownloadURL(imageRef).then((url) => {
        if (imgURL !== "" && imgURL !== noPhoto && imgURL !== "sampleRecipe") {
          deleteFileFromUrl(imgURL);
        }
        setUploadedImageUrl(url);
        setLoaderState("hidden");
        // console.log("Image uploaded successfully");
      }).catch((error) => {
        console.log("Error on uploading image to Firebase Storage" + error.message);
      });
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="flex gap-3 justify-between flex-col sm:flex-row">
        <input type="file" id={id} 
        className="block w-full text-sm text-slate-200
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-zinc-100 file:text-zinc-700
        hover:file:bg-zinc-200 file:cursor-pointer
        file:transition-all file:duration-300" accept="image/*" onChange={handleFileChange} />
        <div className="dot-spinner" data-state={loaderState} data-img-type="upload-img">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
        <button type="submit" className="theme-button bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600" onClick={handleImageUpload}>Upload</button>
      </div>
      <div className="flex justify-between gap-3">
        <div className="w-full aspect-video m-auto overflow-hidden rounded-md relative">
          <img src={uploadedImageUrl} className="absolute w-full object-cover left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4" alt="Uploaded Picture Preview" />
        </div>
        <button 
          className="rounded-md transition-all duration-300 text-xl bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 px-2 py-0"
          onClick={handleImageDelete}
        >
          &times;
        </button>
      </div>
    </div>
  )
}
