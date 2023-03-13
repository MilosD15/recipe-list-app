// Tasty API - Rapid API
const BASE_URI = "https://api.edamam.com/api/recipes/v2";


async function getRandomRecipes(count) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1ce1160b58msh6f2e5f8cea07af6p1be15fjsnf51f492e6a3a',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };

    const response = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=${count}`, options);
    const data = await response.json();
    return data;
  } catch(err) {
    console.log("Error on fetching recipes: ", err);
  }
}

export {
  getRandomRecipes
}