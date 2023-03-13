/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';
import RecipeSearchBar from "./RecipeSearchBar";
import SignOut from "./SignOut";
import GoogleLoginBtn from "./GoogleLoginBtn";
import { UserContext } from "./App";

export default function RecipeList({ recipes, searchBarRecipeIds }) {
  const { handleAddRecipe } = useContext(RecipeContext);
  const { user } = useContext(UserContext);

  const selectedRecipes = recipes.filter(r => searchBarRecipeIds.includes(r.id));

  return (
      <div className='recipes-list
      w-full 
      flex flex-col 
      items-center
      md:flex-1
      md:min-h-screen
      relative
      '>
        <div className="pt-4 pl-3 text-2xl self-start md:pt-5">Recipes</div>
        {recipes.length !== 0 &&  <RecipeSearchBar />}
        <div className='w-full'>
        {selectedRecipes.map(recipe => {
            return (
              <Recipe key={recipe.id} {...recipe} />
            )
          })}
        </div>
        <button 
        className="theme-button bg-zinc-700 my-5 hover:text-zinc-700 hover:bg-zinc-300 focus:text-zinc-700 focus:bg-zinc-300 mb-6" 
        onClick={() => { handleAddRecipe(); }}>Add Recipe</button>
        {user && user.name !== "unknown" && <SignOut userImgUrl={user.imgURL} />}
        {user && user.name === "unknown" && (
          <div className="absolute right-3">
            <GoogleLoginBtn smallerOnMobile={true} />
          </div>
        )}
      </div>
  )
}
