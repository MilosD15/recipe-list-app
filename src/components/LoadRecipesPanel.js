import React, { useEffect, useRef, useState, useContext } from 'react';
import "../css/animateDialog.css";
import { getRandomRecipes } from "./recipeAPI";
import LoadRecipeBanner from "./LoadRecipeBanner";
import { v4 } from 'uuid';
import { RecipeContext } from "./App";
import '../css/imageLoader.css';

export default function LoadRecipesPanel({ state, setState }) {
  const dialogRef = useRef();
  const [newRecipes, setNewRecipes] = useState([]);
  const [loaderState, setLoaderState] = useState("hidden");
  const [maxNumAPIRecipes, setMaxNumAPIRecipes] = useState(100);
  const { checkIfRecipeExists } = useContext(RecipeContext);
  const recipeCountPerPortion = 4;

  const removeFadeClasses = (element) => {
    element?.classList.remove("fade-in");
    element?.classList.remove("fade-out");
  }

  function closeDialogOnBackdropClick(e) {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      setState(false);
    }
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function loadRecipes(count = 1) {
    const recipesFromCount = getRandomNumber(0, maxNumAPIRecipes);

    getRandomRecipes(recipesFromCount, count).then(data => {
      setMaxNumAPIRecipes(data.count);

      const recipes = filterOutDuplicateRecipes(filterOutSavedRecipes(filterToPlainRecipes(data.results).map(formatRecipeProperly)));

      setNewRecipes(recipes);
    });
  }

  function filterOutSavedRecipes(recipes) {
    return recipes.filter(recipe => {
      return !checkIfRecipeExists(recipe.id);
    });
  }

  function filterToPlainRecipes(recipes) {
    return recipes.reduce((acc, curr) => {
      if (curr.recipes && Array.isArray(curr.recipes) && curr.recipes.length > 0) {
        return [...acc, ...curr.recipes];
      }

      return [...acc, curr];
    }, []);
  }

  function formatRecipeProperly(recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      cookTime: recipe.cook_time_minutes ?? recipe.total_time_minutes,
      servings: recipe.num_servings,
      instructions: recipe.instructions.reduce((acc, curr) => {
        const iNumber = curr.position;
        const iText = curr.display_text;
        return acc += `${iNumber}. ${iText}\n`;
      }, ""),
      imgURL: recipe.thumbnail_url,
      description: recipe.description,
      authors: [
        { id: v4(), name: "Source: Tasty API - Rapid API" }
      ]
    }
  }

  function handleLoadMoreRecipes() {
    setLoaderState("visible");

    const recipesFromCount = getRandomNumber(0, maxNumAPIRecipes);
    getRandomRecipes(recipesFromCount, recipeCountPerPortion).then(data => {
      const recipes = filterOutDuplicateRecipes(filterOutSavedRecipes(filterToPlainRecipes(data.results).map(formatRecipeProperly)));

      setLoaderState("hidden");
      setNewRecipes([...newRecipes, ...recipes]);
    });
  }

  function filterOutDuplicateRecipes(recipes) {
    return recipes.filter(recipe => {
      return !newRecipes.some(newRecipe => newRecipe.id === recipe.id)
      || !recipes.some(r => r !== recipe && r.id === recipe.id)
    });
  }

  useEffect(() => {
    setLoaderState("visible");
  }, []);

  useEffect(() => {
    if (state === true) {
      removeFadeClasses(dialogRef.current)
      dialogRef.current?.showModal();
      dialogRef.current?.classList.add("fade-in");

      loadRecipes(recipeCountPerPortion);
    }
    if (state === false) {
      dialogRef.current?.classList.add("fade-out");
      setTimeout(() => {
        dialogRef.current?.close();
        setNewRecipes([]);
        setLoaderState("visible");
        setMaxNumAPIRecipes(100);
      }, 300);
    }
  }, [state]);

  useEffect(() => {
    if (newRecipes.length > 0) {
      setLoaderState("hidden");
    }
    // console.log(newRecipes);
  }, [newRecipes]);

  return (
    <dialog 
      ref={dialogRef} 
      className="
      fixed 
      top-1/2 
      left-1/2 
      -translate-x-1/2 
      -translate-y-1/2 
      w-[calc(100%-1.75rem)] 
      h-[calc(100%-1.75rem)] 
      md:w-4/5 
      md:h-[80%] 
      backdrop:bg-black
      backdrop:opacity-75
      bg-zinc-900
      text-zinc-100
      rounded-lg
      m-0
      max-w-none
      max-h-none
      p-4
      md:p-6"
      onClick={closeDialogOnBackdropClick}
    >
      <div className="flex justify-between items-center pb-4">
        <div className="text-2xl">Save recipes</div>
        <button className="" onClick={() => { setState(false); }}>
          <svg viewBox="0 0 24 24" className="stroke-zinc-100 stroke-2 w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-4 left-4 right-4 top-16 md:top-[4.5rem] overflow-y-auto rounded-md remove-scrollbar flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {newRecipes && newRecipes.map(recipe => {
            return <LoadRecipeBanner key={recipe.id} recipe={recipe} />
          })}
        </div>
        <div className="flex items-center justify-center py-3">
          <button 
          className="theme-button bg-zinc-700 hover:text-zinc-700 hover:bg-zinc-300 focus-visible:text-zinc-700 focus-visible:bg-zinc-300 load-more-recipes-btn" 
          onClick={handleLoadMoreRecipes}
          data-loader-state={loaderState}
          >
            Load more
          </button>
          <div className="dot-spinner" data-state={loaderState} data-img-type="load-more-recipes">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      </div>
    </dialog>
  )
}