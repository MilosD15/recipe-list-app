import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import '../css/app.css';
import { v4 } from 'uuid';

export const RecipeContext = React.createContext();
export const APP_PREFIX = 'COOKING_WITH_REACT';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(getInitialRecipes());
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  const recipeContextValue = {
    handleAddRecipe,
    handleDeleteRecipe,
    handleSelectRecipe
  }

  useEffect(() => {
    localStorage.setItem(`${APP_PREFIX}-recipes`, JSON.stringify(recipes));
  }, [recipes]);

  function getInitialRecipes() {
    const recipesJSON = localStorage.getItem(`${APP_PREFIX}-recipes`);
    if (recipesJSON != null) return [...JSON.parse(recipesJSON)];

    return sampleRecipes;
  }

  function handleSelectRecipe(id) {
    setSelectedRecipeId(id);
  }

  function handleAddRecipe() {
    const newRecipe = {
      id: v4(),
      name: "Name",
      cookTime: "1:00h",
      servings: 1,
      instructions: "/",
      ingredients: [
        {
          id: v4(),
          name: "ingredient",
          amount: "amount"
        }
      ]
    }

    setRecipes([...recipes, newRecipe]);
  }

  function handleDeleteRecipe(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <div className="flex flex-col-reverse bg-zinc-900 text-zinc-100 md:flex-row md:min-h-screen">
        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </div>
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    cookTime: "1:45h",
    servings: 3,
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Plain Pork",
    cookTime: "0:45h",
    servings: 5,
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds"
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

export default App;