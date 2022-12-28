import React, { useContext } from 'react'
import IngredientsList from './IngredientsList'
import { RecipeContext } from './App';
import { motion } from 'framer-motion';

export default function Recipe(props) {
  const { handleDeleteRecipe, handleSelectRecipe } = useContext(RecipeContext);
  const {
    id,
    name, 
    cookTime, 
    servings, 
    instructions, 
    ingredients
  } = props;

  return (
    <motion.div 
      className='border-b-2 border-solid border-zinc-400 last:border-0 p-3'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3}}
      >
        <div className="flex justify-between py-3 items-center">
          <h3 className="text-xl">{name}</h3>
          <div className="flex gap-4">
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
        <div className="pb-1">
          <span>Cook time: </span>
          <span className="font-bold">{cookTime}</span>
        </div>
        <div className="pb-1">
          <span>Servings: </span>
          <span className="font-bold">{servings}</span>
        </div>
        <div className="pb-1">
          <span>Instructions: </span>
          <div className="font-bold pl-4 whitespace-pre-wrap">{instructions}</div>
        </div>
        <div className="pb-1">
          <div>Ingredients:</div>
          <IngredientsList ingredients={ingredients} />
        </div>
    </motion.div>
  )
}
