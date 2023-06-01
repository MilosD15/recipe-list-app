import React, { useContext, useEffect, useRef, useState } from 'react'
import IngredientsList from './IngredientsList'
import { RecipeContext } from './App';
import { motion } from 'framer-motion';
import AuthorList from "./AuthorList";
import '../css/imageLoader.css';

export default function Recipe(props) {
  const { handleDeleteRecipe, handleSelectRecipe } = useContext(RecipeContext);
  const {
    id, 
    name, 
    cookTime, 
    servings, 
    instructions, 
    imgURL, 
    ingredients, 
    authors
  } = props;
  const recipeImageRef = useRef();
  const [loaderState, setLoaderState] = useState("hidden");

  useEffect(() => {
    setLoaderState("visible");
    recipeImageRef.current.addEventListener("load", () => {
      setLoaderState("hidden");
    });
  }, []);

  const setRecipeImage = () => {
    if (!imgURL) {
      return require("../images/no-photo-available.webp");
    }

    if (imgURL === "sampleRecipe") {
      return require("../images/sample-recipe.webp");
    }

    return imgURL;
  }

  return (
    <motion.div 
      className='relative border-b-2 border-solid border-zinc-400 last:border-0 p-3'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3}}
      >
        <div className="flex justify-between py-3 items-start min-[400px]:items-center gap-2">
          <h3 className="text-xl">{name}</h3>
          <div className="flex gap-4 flex-col min-[400px]:flex-row">
            <button 
              className='theme-button bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600'
              onClick={() => handleSelectRecipe(id)}
            >
              Edit
            </button>
            <button 
              className='theme-button bg-red-600 hover:bg-red-700 focus-visible:bg-red-700'
              onClick={() => handleDeleteRecipe(id)}
            >Delete</button>
          </div>
        </div>
        <div className="pb-1 sm:mr-56 lg:mr-72">
          <span>Cook time: </span>
          <span className="font-bold">{cookTime}</span>
        </div>
        <div className="pb-1 sm:mr-56 lg:mr-72">
          <span>Servings: </span>
          <span className="font-bold">{servings}</span>
        </div>
        <div className="pb-1 sm:mr-56 lg:mr-72 leading-relaxed">
          <span>Instructions: </span>
          <div className="font-bold pl-4 whitespace-pre-wrap">{instructions}</div>
        </div>
        {ingredients && <div className="pb-1 sm:mr-56 lg:mr-72">
          <div>Ingredients:</div>
          <IngredientsList ingredients={ingredients} />
        </div>}
        <div className="pb-1 sm:mr-56 lg:mr-72">
          <div>Authors:</div>
          <AuthorList authors={authors} />
        </div>
        <div className="relative my-3 rounded-md overflow-hidden w-full aspect-video mx-auto min-[400px]:w-5/6 sm:absolute sm:w-52 sm:bottom-0 sm:right-3 lg:w-72">
          <div className="dot-spinner" data-state={loaderState} data-img-type="recipe-img">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
          <img src={setRecipeImage()} ref={recipeImageRef} alt="Sample Recipe" className="absolute w-full object-cover left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4" />
        </div>
    </motion.div>
  )
}
