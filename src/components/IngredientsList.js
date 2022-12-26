import React from 'react'
import Ingredient from './Ingredient';

export default function IngredientsList({ingredients}) {
    const ingredientsElements = ingredients.map(ingredient => {
        return (
            <Ingredient key={ingredient.id} {...ingredient} />
        )
    });

    return (
        <table className="ml-4">
            <tbody>
                {ingredientsElements}
            </tbody>
        </table>
    )
}
