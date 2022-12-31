import React, { useContext, useEffect, useRef } from 'react';
import IngredientEdit from "./IngredientEdit";
import { RecipeContext } from "./App";
import { motion } from 'framer-motion';
import { v4 } from 'uuid';
import AuthorEdit from "./AuthorEdit";

export default function RecipeEdit({ recipe }) {
  const { id, name, cookTime, servings, instructions, ingredients, authors } = recipe;
  const { handleChangeRecipe, handleSelectRecipe } = useContext(RecipeContext);
  const inputNameRef = useRef();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  function handleRecipeChanges(changes) {
    handleChangeRecipe(id, { ...recipe, ...changes });
  }

  function handleIngredientsChanges(id, newIngredient) {
    const newIngredients = [...ingredients];
    let targetedIndex = newIngredients.findIndex(ingredient => ingredient.id === id);
    newIngredients[targetedIndex] = newIngredient;
    handleRecipeChanges({ ingredients: newIngredients });
  }

  function handleAuthorsChanges(id, newAuthor) {
    const newAuthors = [...authors];
    let targetedIndex = newAuthors.findIndex(a => a.id === id);
    newAuthors[targetedIndex] = newAuthor;
    handleRecipeChanges({ authors: newAuthors });
  }

  function handleAddIngredient() {
    const newIngredient = {
      id: v4(),
      name: '',
      amount: ''
    }
    handleRecipeChanges({ ingredients: [...ingredients, newIngredient] });
  }

  function handleAddAuthor() {
    const newAuthor = {
      id: v4(),
      name: '',
      amount: ''
    }
    handleRecipeChanges({ authors: [...authors, newAuthor] });
  }

  function handleDeleteIngredient(id) {
    handleRecipeChanges({ ingredients: ingredients.filter(ingredient => ingredient.id !== id) });
  }

  function handleDeleteAuthor(id) {
    handleRecipeChanges({ authors: authors.filter(a => a.id !== id) });
  }
  
  return (
    <motion.div className="
      w-full 
      border-r-0 
      border-solid 
      border-zinc-40
      border-b-2
      md:w-1/2
      md:border-l-2
      md:border-b-0"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3}}>
      <h2 className="text-2xl text-center pt-5 pb-4">Edit Recipe</h2>
      <button className="text-4xl px-3 absolute top-0 right-0 mr-1 mt-1" onClick={() => handleSelectRecipe(undefined)}>&times;</button>
      <form id="change-recipe-data" className="p-4 pt-0 w-full">
        <div className="form-group">
          <label htmlFor="recipe-name" className="form-label">Name</label>
          <input type="text" name="recipe-name" id="recipe-name" className="form-input" ref={inputNameRef}
          onChange={e => { handleRecipeChanges({ name: e.target.value }) }} value={name} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-cook-time" className="form-label">Cook time</label>
          <input type="text" name="recipe-cook-time" id="recipe-cook-time" className="form-input" value={cookTime}
          onChange={e => { handleRecipeChanges({ cookTime: e.target.value }) }} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-servings" className="form-label">Servings</label>
          <input type="number" min="1" name="recipe-servings" id="recipe-servings" className="form-input" value={servings}
          onChange={e => { handleRecipeChanges({ servings: parseInt(e.target.value) || 1 }) }} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-instructions" className="form-label">Instructions</label>
          <textarea id="recipe-instructions" name="recipe-instructions" className="form-input resize-y" rows="4" 
          value={instructions} onChange={e => { handleRecipeChanges({ instructions: e.target.value }) }} />
        </div>
        <div className="form-group flex-col sm:flex-row md:flex-col lg:flex-row">
          <h3 className="form-label">Ingredients</h3>
          <div className="flex-1 flex flex-col gap-3 w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[45%]">Name</th>
                  <th className="w-[45%]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  ingredients.map(ingredient => {
                    return (
                      <IngredientEdit key={ingredient.id} 
                      handleIngredientsChanges={handleIngredientsChanges} 
                      ingredient={ingredient}
                      handleDeleteIngredient={handleDeleteIngredient} />
                    )
                  })
                }
              </tbody>
            </table>
            <button className="theme-button bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 m-auto"
            onClick={e => {e.preventDefault(); handleAddIngredient();}}>Add Ingredient</button>
          </div>
        </div>
        <div className="form-group flex-col sm:flex-row md:flex-col lg:flex-row">
          <h3 className="form-label">Authors</h3>
          <div className="flex-1 w-[80%] m-auto flex flex-col gap-3">
            <div className="">
              {
                authors.map(author => {
                  return (
                    <AuthorEdit 
                      key={author.id} 
                      author={author}
                      handleAuthorsChanges={handleAuthorsChanges}
                      handleDeleteAuthor={handleDeleteAuthor}
                    />
                  )
                })
              }
            </div>
            <button className="theme-button bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 m-auto"
            onClick={e => {e.preventDefault(); handleAddAuthor(); }}>Add Author</button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}