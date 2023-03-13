import React, { useContext, useEffect } from 'react'
import IngredientsList from './IngredientsList'
import { RecipeContext } from './App';
import { motion } from 'framer-motion';
import AuthorList from "./AuthorList";
import sampleRecipeImage from '../images/sample-recipe.webp';

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
        <div className="flex justify-between py-3 items-start min-[400px]:items-center">
          <h3 className="text-xl">{name}</h3>
          <div className="flex gap-4 flex-col min-[400px]:flex-row">
            <button 
              className='theme-button bg-blue-500 hover:bg-blue-600 focus:bg-blue-600'
              onClick={() => handleSelectRecipe(id)}
            >
              Edit
            </button>
            <button 
              className='theme-button bg-red-600 hover:bg-red-700 focus:bg-red-700'
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
        <div className="pb-1 sm:mr-56 lg:mr-72">
          <span>Instructions: </span>
          <div className="font-bold pl-4 whitespace-pre-wrap">{instructions}</div>
        </div>
        <div className="pb-1 sm:mr-56 lg:mr-72">
          <div>Ingredients:</div>
          <IngredientsList ingredients={ingredients} />
        </div>
        <div className="pb-1 sm:mr-56 lg:mr-72">
          <div>Authors:</div>
          <AuthorList authors={authors} />
        </div>
        <div className="relative my-2 rounded-md overflow-hidden w-full aspect-video mx-auto min-[400px]:w-5/6 sm:absolute sm:w-52 sm:bottom-0 sm:right-3 lg:w-72">
          <img src={setRecipeImage()} alt="Sample Recipe" className="absolute w-full object-cover left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4" />
        </div>
    </motion.div>
  )
}
