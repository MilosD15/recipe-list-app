import React from 'react'

export default function Ingredient({name, amount}) {
  return (
    <tr>
        <td className="font-bold">{name}</td>
        <td className="font-bold pl-4">{amount}</td>
    </tr>
  )
}
