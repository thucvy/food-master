import { useEffect, useState } from "react";
import { Alert, Row, Col, Card, ListGroup, Nav, Button } from "react-bootstrap";
import { MdArrowBack } from "react-icons/md";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { LinkContainer } from "react-router-bootstrap";
import { useParams} from "react-router-dom";
import getRecipeDetailAPI from "../api/getRecipeDetailAPI";
import "./RecipeDetail.css"

const RecipeDetails = () => {
  const [recipeData, setRecipeData] = useState("");
  const [error, setError] = useState("");
  const recipeId = useParams().id;

  const renderedInstructionSteps =
    recipeData &&
    recipeData.analyzedInstructions[0].steps.map((step) => {
      return (
        <ListGroup.Item key={step.number} style={{ textAlign: "initial" }}>
          {step.number}. {step.step}
        </ListGroup.Item>
      );
    });

  const renderedIngredientLists =
    recipeData &&
    recipeData.extendedIngredients.map((ingredient) => {
      return (
        <ListGroup.Item key={ingredient.id} style={{ textAlign: "initial" }}>
          {ingredient.original}
        </ListGroup.Item>
      );
    });

  useEffect(() => {
    const getRecipeDetails = async (recipeId) => {
      setError("");
      try {
        const response = await getRecipeDetailAPI(recipeId);
        if (response) {
          setRecipeData(response);
        } else {
          setError("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getRecipeDetails(recipeId);
  }, [recipeId]);

  return (
    <div>
      {error && (
        <Alert variant="danger" onClose={() => setError()} dismissible>
          {error}
        </Alert>
      )}
      <Row>
        <Col>
          <LinkContainer to="/fridge" style={{ width: "fit-content" }}>
            <Nav.Link>
              <Button variant="warning">
                <MdArrowBack />
                Back
              </Button>
            </Nav.Link>
          </LinkContainer>
        </Col>
        <Col>
          <h1 className="mb-5">{recipeData.title}</h1>
        </Col>
      </Row>

      <Row>
        <Col md className="mb-4">
          <Card
            style={{
              width: "100%",
              maxWidth: "100%",
              color: "black",
            }}
          >
            <Card.Img variant="top" src={recipeData.image} alt="Recipe Image" />
            <Card.Body>
              <Card.Title>{recipeData.title}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <i>Servings: </i> {recipeData.servings}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsFillBookmarkHeartFill />: {recipeData.aggregateLikes}
                </ListGroup.Item>
              </ListGroup>
              <a href={recipeData.sourceUrl} target="_blank" rel="noreferrer" className="button">
                {" "}
                Source
                <BiLinkExternal/>
              </a>
            </Card.Body>
          </Card>
        </Col>
        <Col md className="mb-4">
          <Card style={{ color: "black", maxWidth: "100%" }} className="mb-3">
            <Card.Body>
              <Card.Title>Ingredients</Card.Title>
              <ListGroup variant="flush">{renderedIngredientLists}</ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ color: "black", maxWidth: "100%" }}>
            <Card.Body>
              <Card.Title>Instructions</Card.Title>
              <ListGroup variant="flush">{renderedInstructionSteps}</ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RecipeDetails;
