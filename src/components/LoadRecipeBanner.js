/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useContext, useState } from 'react';
// import { samplePotentialRecipe } from "./samplePotentialRecipe";
import { RecipeContext } from "./App";
import { v4 } from 'uuid';

export default function LoadRecipeBanner({ recipe }) {
  const { handleAddRecipe } = useContext(RecipeContext);
  const {
    id,
    name,
    cookTime,
    servings,
    imgURL,
    description,
    instructions,
    authors
  } = recipe;
  const potentialRecipeContentRef = useRef(null);
  const recipeGradientRef = useRef(null);
  const readMoreButtonRef = useRef(null);
  const saveRecipeButtonRef = useRef(null);
  const [recipeSaved, setRecipeSaved] = useState(false);

  function slideUpToSpecificHeight(el, specificHeight, duration = 500) {
    if (!el) return;

    el.style.height = `${specificHeight}px`;

    setTimeout(() => {
      el.style.removeProperty('height');
    }, duration)
  }

  function slideDownToHeightAuto(el) {
    if (!el) return;

    // copy of element
    const copyOfElement = el.cloneNode(true);
    copyOfElement.style.position = 'absolute';
    copyOfElement.style.width = `${el.offsetWidth}px`;
    copyOfElement.style.visibility = 'hidden';
    copyOfElement.style.zIndex = '0';
    el.insertAdjacentElement('afterend', copyOfElement);

    // get height of element when auto
    const nextHeight = getHeightWhenAuto(copyOfElement);

    // remove copy of element
    copyOfElement.remove();

    // slide down
    el.style.height = `${nextHeight}px`;
  }

  function getHeightWhenAuto(el) {
    el.style.height = 'auto';
    let height = el.offsetHeight;
    return height;
  }

  function handleReadMoreClick() {
    if (potentialRecipeContentRef.current.dataset.expanded === 'false') {
      slideDownToHeightAuto(potentialRecipeContentRef.current);
      potentialRecipeContentRef.current.dataset.expanded = 'true';
      recipeGradientRef.current.style.opacity = '0';
      recipeGradientRef.current.style.pointerEvents = 'none';
      readMoreButtonRef.current.classList.remove('read-more-btn--expand');
      readMoreButtonRef.current.classList.add('read-more-btn--collapse');
      readMoreButtonRef.current.textContent = 'Collapse';
    } else {
      slideUpToSpecificHeight(potentialRecipeContentRef.current, 400, 500);
      potentialRecipeContentRef.current.dataset.expanded = 'false';
      recipeGradientRef.current.style.opacity = '1';
      recipeGradientRef.current.style.pointerEvents = 'initial';
      readMoreButtonRef.current.classList.remove('read-more-btn--collapse');
      readMoreButtonRef.current.classList.add('read-more-btn--expand');
      readMoreButtonRef.current.textContent = 'Read more';
    }
  }

  function handleSaveRecipe() {
    const newRecipe = {
      id: id,
      name: name ?? "Unspecified",
      cookTime: cookTime ? cookTime.toString().concat(" mins") : "Unspecified",
      servings: servings ?? "Unspecified",
      instructions: instructions ?? "Unspecified",
      imgURL: imgURL ?? undefined,
      ingredients: [
        { id: v4(), name: "", amount: "" }
      ],
      authors: authors
    }

    handleAddRecipe(newRecipe);
    setRecipeSaved(true);
    saveRecipeButtonRef.current.textContent = "Saved!";
    saveRecipeButtonRef.current.removeEventListener("click", handleSaveRecipe);
  }

  return (
    <article className="bg-zinc-800 rounded-md p-3">
      <div className="transition-[height] duration-500 ease-in-out overflow-hidden h-[400px]" ref={potentialRecipeContentRef} data-expanded="false">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center lg:items-stretch">
          <div className="flex flex-col lg:justify-center">
            <h3 className="text-xl pb-3">{name}</h3>
            <div>
              <div className="pb-1">
                <span>Cook time: </span>
                <span className="font-bold">{cookTime ? cookTime.toString().concat(" mins") : "Unspecified"}</span>
              </div>
              <div className="pb-1">
                <span>Servings: </span>
                <span className="font-bold">{servings ?? "Unspecified"}</span>
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-video overflow-hidden mx-auto sm:mx-0 my-2 sm:my-0 rounded-md min-[400px]:w-5/6 sm:w-52 lg:w-60">
            <img src={imgURL} alt="Recipe Picture" 
            className="absolute w-full object-cover left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4" />
          </div>
        </div>
        <div className="mb-3">
          <span>Description: </span>
            <div className="font-bold pl-4 leading-relaxed mt-1">{description}</div>
        </div>
        <div className="mb-3">
          <span>Instructions: </span>
          <div className="font-bold pl-4 whitespace-pre-wrap leading-relaxed mt-1">{instructions}</div>
        </div>
        <div className="pb-1 mb-1">
          Authors:
          <ul className="list-disc pl-8 mt-1">
            {authors.map(({id, name}) => (
              <li key={id} className="font-bold">{name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="h-1 relative read-more-gradient transition-opacity duration-500 ease-in-out" ref={recipeGradientRef}></div>
        <div className="flex justify-between pt-3">
          <button 
            className="theme-button read-more-btn--expand"
            ref={readMoreButtonRef}
            onClick={handleReadMoreClick}
          >
            Read more
          </button>
          <button 
            className="theme-button bg-zinc-700 hover:text-zinc-700 hover:bg-zinc-300 focus-visible:text-zinc-700 focus-visible:bg-zinc-300 save-recipe-btn"
            onClick={handleSaveRecipe}
            ref={saveRecipeButtonRef}
            data-recipe-saved={recipeSaved}
          >
            Save
          </button>
        </div>
      </div>
    </article>
  )
}
