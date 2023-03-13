import React from 'react';

export default function UploadImage({ id }) {
  return (
    <div>
      <input type="file" id={id} 
      className="block w-full text-sm text-slate-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-zinc-100 file:text-zinc-700
      hover:file:bg-zinc-200 file:cursor-pointer
      file:transition-all file:duration-300" />
      {/* restrict file types on just image formats, no more than one image can be selected, implement uploading image (firebase storage) */}
    </div>
  )
}
