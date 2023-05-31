import React, { useState, useEffect } from "react";
import { getUser, updateUserRecipes, addUser } from "./updateUsers";
import { getRandomRecipes } from "./recipeAPI";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import { auth, googleProvider } from "./firebaseConfig";
import { getRedirectResult } from "firebase/auth";
import Login from "./Login";
import { sampleRecipe } from "./sampleRecipe";
import '../css/app.css';
import { v4 } from 'uuid';
import PageLoader from "./PageLoader";
import LoadRecipesPanel from "./LoadRecipesPanel";
import noPhoto from '../images/no-photo-available.webp';

export const RecipeContext = React.createContext();
export const UserContext = React.createContext();
export const LocalStorageContext = React.createContext();
export const APP_PREFIX = 'COOKING_WITH_REACT';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(null);
  const selectedRecipe = recipes?.find(recipe => recipe.id === selectedRecipeId);
  const [searchBarRecipeIds, setSearchBarRecipeIds] = useState(null);
  const [currentSearchBarValue, setCurrentSearchBarValue] = useState('');

  const [user, setUser] = useState(null);
  const [pageLoaderState, setPageLoaderState] = useState(true);
  const [loadRecipesModalOpen, setLoadRecipesModalOpen] = useState(false);

  // FIND RECIPES API AND FETCH SAMPLE RECIPES
  // useEffect(() => {
  //   user && getRandomRecipes(20).then(data => {
  //     console.log(data);
  //   });
  // }, [user]);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem(`${APP_PREFIX}-loggedInUserId`);
    loggedInUserId && getUser(loggedInUserId).then(userData => {
      setUser(userData);
    });
  }, []);

  useEffect(() => {
    getRedirectResult(auth)
    .then((data) => {
      if (data && data.user) {
        const userData = {
          id: data.user.uid,
          name: data.user.displayName,
          email: data.user.email,
          imgURL: data.user.photoURL,
          recipes: [sampleRecipe]
        };

        getUser(userData.id).then(potentialUser => {
          if (potentialUser) {
            setUser(potentialUser);
          } else {
            setUser(userData);
            addUser(userData);
          }
          localStorage.setItem(`${APP_PREFIX}-loggedInUserId`, userData.id);
        });
      }

      // setTimeout(() => {
      //   setPageLoaderState(false);
      // }, 5000);
      setPageLoaderState(false);
    }).catch((err) => {
      console.log("Error on logging in with Google: " + err);
    });
  }, []);

  useEffect(() => {
    setRecipes(user?.recipes);
  }, [user]);

  const userContextValue = {
    user,
    setUser
  }

  const handleLoadRecipesModalOpen = (value) => {
    setLoadRecipesModalOpen(value);
  }

  const recipeContextValue = {
    handleAddRecipe,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleChangeRecipe,
    handleRecipeSearch,
    checkIfRecipeExists
  }

  useEffect(() => {
    setSearchBarRecipeIds(recipes && getRecipeIds([...recipes]));
    user && user.id && recipes && updateUserRecipes(user.id, recipes);
    saveRecipesToLocalStorage();
    handleRecipeSearch(currentSearchBarValue);
  }, [recipes]);

  function saveRecipesToLocalStorage() {
    if (user?.id) return;
    if (!recipes) return;

    localStorage.setItem(`${APP_PREFIX}-recipes`, JSON.stringify(recipes));
  }

  function loadRecipesFromLocalStorage() {
    if (user?.id) return;

    return JSON.parse(localStorage.getItem(`${APP_PREFIX}-recipes`));
  }

  const LocalStorageContextValue = {
    saveRecipesToLocalStorage,
    loadRecipesFromLocalStorage
  }

  function handleRecipeSearch(term) {
    if (!recipes) return;

    const newRecipes = [...recipes];
    if (term === '') {
      setSearchBarRecipeIds(getRecipeIds(newRecipes)); 
      setCurrentSearchBarValue('');
      return;
    }

    const searchedRecipes = newRecipes.filter(r => objectHasThisTerm(term, r));
    setSearchBarRecipeIds(getRecipeIds(searchedRecipes));

    setCurrentSearchBarValue(term);
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

  function checkIfRecipeExists(id) {
    return recipes.some(recipe => recipe.id === id);
  }

  function handleAddRecipe(recipe = null) {
    const newRecipe = {
      id: v4(),
      name: "",
      cookTime: "",
      servings: 1,
      instructions: "",
      imgURL: noPhoto,
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

    const recipeToAdd = recipe ?? newRecipe;

    if (!recipe) setSelectedRecipeId(recipeToAdd.id);
    setRecipes([recipeToAdd, ...recipes]);
    setSearchBarRecipeIds([recipeToAdd.id, ...searchBarRecipeIds]);
  }

  function handleDeleteRecipe(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }

    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  return (
    <LocalStorageContext.Provider value={LocalStorageContextValue}>
      <UserContext.Provider value={userContextValue}>
        <RecipeContext.Provider value={recipeContextValue}>
        { 
          pageLoaderState ? <PageLoader /> :
          (user && recipes && searchBarRecipeIds ? (
            <div className="flex flex-col-reverse bg-zinc-900 text-zinc-100 md:flex-row md:min-h-screen">
              <RecipeList recipes={recipes} searchBarRecipeIds={searchBarRecipeIds} handleLoadRecipesModalOpen={handleLoadRecipesModalOpen} />
              {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
              <LoadRecipesPanel state={loadRecipesModalOpen} setState={setLoadRecipesModalOpen} />
            </div>
          ) : <Login />)
        }
        </RecipeContext.Provider>
      </UserContext.Provider>
    </LocalStorageContext.Provider>
  )
}

export default App;