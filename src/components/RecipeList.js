import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
  const { handleAddRecipe } = useContext(RecipeContext);

  return (
      <div className='recipes-list
      w-full 
      border-r-0 
      border-solid 
      border-zinc-400 
      border-t-2
      flex flex-col 
      items-center
      md:w-1/2
      md:border-r-2
      md:border-t-0
      md:min-h-screen
      '>
        <div className="pt-5 text-2xl">Recipes</div>
        <div className='w-full'>
        {recipes.map(recipe => {
            return (
              <Recipe key={recipe.id} {...recipe} />
            )
          })}
        </div>
        <button className="theme-button bg-zinc-700 my-5 hover:text-zinc-700 hover:bg-zinc-300 focus:text-zinc-700 focus:bg-zinc-300 mb-6" onClick={() => handleAddRecipe()}>Add Recipe</button>
      </div>
  )
}
