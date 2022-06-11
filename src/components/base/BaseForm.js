import { useEffect, useState } from "react";

import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { BsSearch, BsPlusCircleDotted } from "react-icons/bs";
import getRecipeAPI from "../api/getRecipeAPI";

import IngredientList from "../ingredients/IngredientList";
import RecipeList from "../recipes/RecipeList";

const BaseForm = () => {
  const [input, setInput] = useState(""); //ingredient input PUT to the form
  const [ingredients, setIngredients] = useState([]); // ingredient input SUBMITTED to the form
  const [recipes, setRecipes] = useState([]); // recipes result RECEIVED from API based on ingredient inputs
  const [error, setError] = useState(""); // error alert variable
  const [isSearchDisabled, setIsSearchDisabled] = useState(false); //to determine if user can search recipes (will be disabled after user click the button until more ingredient is added or deleted from the fridge)

  // On the first render, get local data on ingredients list and recipes list (if any)
  useEffect(() => {
    const getDataLocally = (storageKey) => {
      const dataObj = localStorage.getItem(storageKey);
      return JSON.parse(dataObj);
    };

    const localIngredientData = getDataLocally("ingredientList");
    const localRecipeData = getDataLocally("recipeList");
    localIngredientData && setIngredients(localIngredientData);
    localRecipeData && setRecipes(localRecipeData);
  }, []);

  // On every render when "ingredients" and/or "recipes" list change, save the new list(s) to local and replace with the old ones
  useEffect(() => {
    localStorage.setItem("ingredientList", JSON.stringify(ingredients));
    localStorage.setItem("recipeList", JSON.stringify(recipes));
  }, [ingredients, recipes]);

  // Function to add ingredient (on form submit)
  const addIngredient = (e) => {
    e.preventDefault();
    if (input) {
      if (ingredients.includes(input)) {
        setError(
          "This ingredient was already added to your fridge. Please add another ingredient."
        );
      } else if (ingredients.length > 0) {
        setIngredients([...ingredients, input]);
      } else {
        setRecipes([]);
        setIngredients([input]);
      }
    } else {
      setError("Please provide an ingredient to add!");
    }
    setInput("");
    setIsSearchDisabled(false);
  };

  // Function to remove ingredient (remove button in each ingredient pill)
  const removeIngredient = (ing) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient !== ing
    );
    setIngredients(newIngredients);
    setIsSearchDisabled(false);
  };

  // Function to dislay receipe lists (when Search button is clicked)
  const displayRecipes = async (ingredients) => {
    setError("");
    try {
      const response = await getRecipeAPI(ingredients);
      if (response.length === 0) {
        setError("Oops! No recipes are found with your ingredients.");
      } else {
        setRecipes(response);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsSearchDisabled(true);
  };

  return (
    <div>
      {/* if there's any errors, show alert on top of the page */}
      {error && (
        <Alert variant="danger" onClose={() => setError()} dismissible>
          {error}
        </Alert>
      )}

      {/* Form to add ingredient */}
      <Form onSubmit={addIngredient}>
        <Row className="justify-content-center">
          <h3>FIND YOUR BEST RECIPE</h3>
          <Col md={6} className="my-1">
            <Form.Control
              placeholder="Ingredient (e.g. Rice, Egg, Tomato, etc.)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ borderRadius: "20px" }}
            />
          </Col>

          <Col xs="auto" className="my-1">
            <Button variant="warning" type="submit">
              <BsPlusCircleDotted className="mx-2" />
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      {/* IngredientList component to show all ingredient pills */}
      <IngredientList
        ingredients={ingredients}
        removeIngredient={removeIngredient}
      />

      {/* Show Search Recipe button and RecipeList component only when there's at least 1 ingredient in the fridge */}
      {ingredients?.length > 0 && (
        <div>
          <Button
            onClick={() => {
              displayRecipes(ingredients.toString());
            }}
            variant="warning"
            disabled={isSearchDisabled ? true : false}
          >
            Search For Recipes
            <BsSearch className="mx-2" />
          </Button>
          <div className="mt-5">
            <RecipeList recipes={recipes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseForm;
