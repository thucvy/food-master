import axios from "axios";

const getRecipeAPI = async (ingredients) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=6`
  );
  return data;
};

export default getRecipeAPI;
