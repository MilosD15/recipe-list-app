import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
  const { handleAddRecipe } = useContext(RecipeContext);

  return (
      <div className='recipes-list
      w-full 
      min-h-screen 
      border-r-0 
      border-solid 
      border-zinc-400 
      flex flex-col 
      items-center
      md:w-1/2
      md:border-r-2
      '>
        <div className="pt-5 text-2xl">Recipes</div>
        <div className='w-full'>
        {recipes.map(recipe => {
            return (
              <Recipe key={recipe.id} {...recipe} />
            )
          })}
        </div>
        <button className="theme-button bg-zinc-700 my-5 hover:text-zinc-700 hover:bg-zinc-300 focus:text-zinc-700 focus:bg-zinc-300" onClick={() => handleAddRecipe()}>Add Recipe</button>
      </div>
  )
}
