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
  const [searchBarRecipeIds, setSearchBarRecipeIds] = useState(getRecipeIds([...recipes]));

  const recipeContextValue = {
    handleAddRecipe,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleChangeRecipe,
    handleRecipeSearch
  }

  useEffect(() => {
    localStorage.setItem(`${APP_PREFIX}-recipes`, JSON.stringify(recipes));
  }, [recipes]);

  function getInitialRecipes() {
    const recipesJSON = localStorage.getItem(`${APP_PREFIX}-recipes`);
    if (recipesJSON != null) return [...JSON.parse(recipesJSON)];

    return sampleRecipes;
  }

  function handleRecipeSearch(term) {
    const newRecipes = [...recipes];
    if (term === '') {
      setSearchBarRecipeIds(getRecipeIds(newRecipes)); return;
    }

    const searchedRecipes = newRecipes.filter(r => objectHasThisTerm(term, r));
    setSearchBarRecipeIds(getRecipeIds(searchedRecipes));
  }

  function getRecipeIds(recipes) {
    return recipes.map(r => r.id);
  }

  function objectHasThisTerm(term, object) {
    return Object.keys(object).some(key => {
      // we don't take id of any object into consideration
      if (key === "id") return false;

      // when variable is a function
      if (typeof object[key] === "function") return false;

      // when variable is an array
      if (typeof object[key] === "object" && Array.isArray(object[key])) {
        return object[key].some(object => objectHasThisTerm(term, object));
      }

      // when variable is an object
      if (typeof object[key] === "object" && !Array.isArray(object[key])) {
        return objectHasThisTerm(term, object);
      }
      
      // when variable is some primitive value
      const objectValueString = object[key].toString();
      const termRegex = new RegExp(term, "gi");
      console.log(termRegex)
      console.log(objectValueString.includes(term))
      return termRegex.test(objectValueString);
    });
  }

  function handleChangeRecipe(id, newRecipe) {
    const newRecipes = [...recipes];
    let targetedIndex = newRecipes.findIndex(recipe => recipe.id === id);
    newRecipes[targetedIndex] = newRecipe;
    setRecipes(newRecipes);
  }

  function handleSelectRecipe(id) {
    setSelectedRecipeId(id);
  }

  function handleAddRecipe() {
    const newRecipe = {
      id: v4(),
      name: "",
      cookTime: "",
      servings: 1,
      instructions: "",
      ingredients: [
        {
          id: v4(),
          name: "",
          amount: ""
        }
      ]
    }

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
    setSearchBarRecipeIds([...searchBarRecipeIds, newRecipe.id]);
  }

  function handleDeleteRecipe(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }

    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <div className="flex flex-col-reverse bg-zinc-900 text-zinc-100 md:flex-row md:min-h-screen">
        <RecipeList recipes={recipes} searchBarRecipeIds={searchBarRecipeIds} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </div>
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken (Sample Recipe)",
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
  // {
  //   id: 2,
  //   name: "Plain Pork",
  //   cookTime: "0:45h",
  //   servings: 5,
  //   instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
  //   ingredients: [
  //     {
  //       id: 1,
  //       name: "Pork",
  //       amount: "3 Pounds"
  //     },
  //     {
  //       id: 2,
  //       name: "Paprika",
  //       amount: "2 Tbs"
  //     }
  //   ]
  // }
];

export default App;