import React, { useEffect, useRef } from 'react'

export default function IngredientEdit({ ingredient, handleIngredientsChanges, handleDeleteIngredient }) {
  const inputIngredientNameRef = useRef();

  useEffect(() => {
    inputIngredientNameRef.current.focus();
  }, []);

  function handleIngredientChanges(changes) {
    handleIngredientsChanges(ingredient.id, { ...ingredient, ...changes });
  }

  return (
    <tr>
      <td className="w-[45%]">
        <input type="text" className="form-input w-full mb-1" value={ingredient.name} ref={inputIngredientNameRef}
        onChange={e => { handleIngredientChanges({ name: e.target.value }) }}></input>
      </td>
      <td className="w-[45%] ml-2">
        <span className="ml-2"></span>
        <input type="text" className="form-input w-[calc(100%-0.5rem)] mb-1" value={ingredient.amount}
        onChange={e => { handleIngredientChanges({ amount: e.target.value }) }}></input>
      </td>
      <td className="w-[10%] text-right text-xl">
        <button className="rounded-md transition-all duration-300 bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 px-2 py-0 mb-1"
        onClick={() => handleDeleteIngredient(ingredient.id)}>&times;</button>
      </td>
    </tr>
  )
}
