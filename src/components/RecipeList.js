import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
  const { handleAddRecipe } = useContext(RecipeContext);

  return (
      <div className='recipes-list
      w-full 
      flex flex-col 
      items-center
      md:flex-1
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
