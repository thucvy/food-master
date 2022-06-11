import axios from "axios";

const getRecipeDetailAPI = async (id) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  return data;
};

export default getRecipeDetailAPI;
