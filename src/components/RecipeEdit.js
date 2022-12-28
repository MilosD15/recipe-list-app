import React from 'react';
import IngredientEdit from "./IngredientEdit";

export default function RecipeEdit() {
  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl text-center pt-5 pb-4">Edit Recipe</h2>
      <button className="text-4xl px-3 absolute top-0 right-0 mr-1 mt-1">&times;</button>
      <form id="change-recipe-data" className="p-4 pt-0 w-full">
        <div className="form-group">
          <label htmlFor="recipe-name" className="form-label">Name</label>
          <input type="text" name="recipe-name" id="recipe-name" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-cook-time" className="form-label">Cook time</label>
          <input type="text" name="recipe-cook-time" id="recipe-cook-time" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-servings" className="form-label">Servings</label>
          <input type="number" min="1" name="recipe-servings" id="recipe-servings" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-instructions" className="form-label">Instructions</label>
          <textarea id="recipe-instructions" name="recipe-instructions" className="form-input resize-y" rows="4"></textarea>
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
                <IngredientEdit />
                <IngredientEdit />
                <IngredientEdit />
              </tbody>
            </table>
            <button className="theme-button bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 m-auto">Add Ingredient</button>
          </div>
        </div>
      </form>
    </div>
  )
}