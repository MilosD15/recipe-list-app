import React, { useContext } from 'react';
import GoogleLoginBtn from "./GoogleLoginBtn";
import randomRecipeImage from '../images/random-recipe-image.webp';
import { UserContext } from "./App";
import { sampleRecipe } from "./sampleRecipe";
import { motion } from 'framer-motion';

export default function Login() {
  const { setUser } = useContext(UserContext);

  return (
    <motion.div 
      className="w-full min-h-screen flex justify-around flex-col"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3}}
    >
      <div className="my-4 flex flex-col items-center">
        <div className="w-64 md:w-72 aspect-video overflow-hidden rounded-lg shadow-md shadow-zinc-700">
          <img src={randomRecipeImage} alt="Healthy Meal" />
        </div>
        <div className="merienda-font text-white text-xl py-6 text-center md:text-2xl px-3">Keep track of your recipes and explore new ones!</div>
      </div>
      <div className="text-white flex flex-col justify-center items-center text-md md:text-lg">
        <GoogleLoginBtn />
        <div className="text-lg">or</div>
        <button onClick={() => { setUser({ name: 'unknown', recipes: sampleRecipe }) }} className="theme-button bg-zinc-700 my-3 hover:text-zinc-700 hover:bg-zinc-300 focus:text-zinc-700 focus:bg-zinc-300">Proceed without logging in</button>
      </div>
    </motion.div>
  )
}
