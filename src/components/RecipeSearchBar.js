import React, { useContext } from 'react';
import { RecipeContext } from "./App";

export default function RecipeSearchBar() {
  const { handleRecipeSearch } = useContext(RecipeContext);

  return (
    <div className="flex w-full justify-start">
      <input 
        type="text" 
        placeholder="Search recipes by any term..." 
        onChange={e => { handleRecipeSearch(e.target.value ?? '') }}
        className="mt-4 mx-4 ml-3 py-2 px-3 min-w-0 basis-80 rounded-md bg-zinc-800 placeholder:text-slate-300 text-slate-100"
      />
    </div>
  )
}
