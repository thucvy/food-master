import "./IngredientList.css";
import { ListGroup, CloseButton} from "react-bootstrap";

const IngredientList = ({ ingredients, removeIngredient }) => {
  const renderedIngredientList =
    ingredients.length > 0 &&
    ingredients.map((ingredient, i) => {
      return (
        <ListGroup key={i} className="m-2">
          <ListGroup.Item key={i} style={{ width: "fit-content" }}>
            {ingredient}
            <CloseButton onClick={() => removeIngredient(ingredient)} />
          </ListGroup.Item>
        </ListGroup>
      );
    });

  return (
    <div className="list">
      {ingredients.length > 0 && (
        <h4>Your Fridge: ({ingredients.length} items)</h4>
      )}
      <div className="list-display">{renderedIngredientList}</div>
    </div>
  );
};

export default IngredientList;
