export const sampleRecipe = {
  id: 1,
  name: "Plain Chicken (Sample Recipe)", // name (string)
  cookTime: "1:45h", // total_time_minutes (number)
  servings: 3, // num_servings (number)
  instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken", // instructions (array),
  imgURL: "sampleRecipe", // thumbnail_url (string)
  ingredients: [ // no field for ingredients (possible solution: just don't print ingredients at all)
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
  ],
  authors: [
    { id: 1, name: "John Smith" }, // unknown (source: Tasty API - Rapid API)
    { id: 2, name: "My mum" }
  ]
};