import React from 'react'

export default function IngredientEdit() {
  return (
    <tr>
      <td className="w-[45%]">
        <input type="text" className="form-input w-full mb-1"></input>
      </td>
      <td className="w-[45%]">
        <input type="text" className="form-input w-full mb-1"></input>
      </td>
      <td className="w-[10%] text-center text-xl">
        <button className="rounded-md transition-all duration-300 bg-red-600 hover:bg-red-700 focus:bg-red-700 px-2 py-0 mb-1">&times;</button>
      </td>
    </tr>
  )
}
