import React, { useState, useEffect } from "react";
import { getUser, updateUserRecipes } from "./updateUsers";
import { getRandomRecipes } from "./recipeAPI";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import Login from "./Login";
import '../css/app.css';
import { v4 } from 'uuid';

export const RecipeContext = React.createContext();
export const UserContext = React.createContext();
export const APP_PREFIX = 'COOKING_WITH_REACT';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(null);
  const selectedRecipe = recipes?.find(recipe => recipe.id === selectedRecipeId);
  const [searchBarRecipeIds, setSearchBarRecipeIds] = useState(null);

  const [user, setUser] = useState(null);

  // FIND RECIPES API AND FETCH SAMPLE RECIPES
  // useEffect(() => {
  //   user && getRandomRecipes(20).then(data => {
  //     console.log(data);
  //   });
  // }, [user]);

  // NEXT TASKS
  // add image option for all recipes (default no image)
  // try to implement upload image and to save it with firebase
  // make panel for loading random recipes (styling and structure)
  // try it with Tasty API and see if it works
  // implement saving recipes if user clicks Save btn in random recipes panel
  // be careful with saving recipe and prompting new ones to the user (a user should just be prompted with non-saved recipes)
  // implement load more btn for fetching more recipes
  // restrict each user to 60 random recipes per day (3 Tasty API requests)

  useEffect(() => {
    const loggedInUserId = localStorage.getItem(`${APP_PREFIX}-loggedInUserId`);
    loggedInUserId && getUser(loggedInUserId).then(userData => {
      setUser(userData);
    });
  }, []);

  useEffect(() => {
    setRecipes(user?.recipes);
  }, [user]);

  const userContextValue = {
    user,
    setUser
  }

  const recipeContextValue = {
    handleAddRecipe,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleChangeRecipe,
    handleRecipeSearch
  }

  useEffect(() => {
    setSearchBarRecipeIds(recipes && getRecipeIds([...recipes]));
    user && user.id && recipes && updateUserRecipes(user.id, recipes);
  }, [recipes]);

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
      imgURL: undefined,
      ingredients: [
        {
          id: v4(),
          name: "",
          amount: ""
        }
      ],
      authors: [
        {
          id: v4(),
          name: ""
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
    <UserContext.Provider value={userContextValue}>
      <RecipeContext.Provider value={recipeContextValue}>
      { 
        user && recipes && searchBarRecipeIds ? (
          <div className="flex flex-col-reverse bg-zinc-900 text-zinc-100 md:flex-row md:min-h-screen">
            <RecipeList recipes={recipes} searchBarRecipeIds={searchBarRecipeIds} />
            {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
          </div>
        ) : <Login />
      }
      </RecipeContext.Provider>
    </UserContext.Provider>
  )
}

export default App;