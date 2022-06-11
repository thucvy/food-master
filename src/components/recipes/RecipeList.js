import { Card, Button, Nav, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

const RecipeList = ({ recipes }) => {
  const renderedRecipeList = recipes.map((recipe, i) => {
    return (
      <Col lg={4} md={6} key={i} className="mb-5">
        <Card
          style={{
            width: "100%",
            maxWidth: "100%",
            color: "black",
            height: "100%",
          }}
        >
          <Card.Img variant="top" src={recipe.image} alt="Recipe Image" />
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <i>Missed Ingredients:</i> {recipe.missedIngredientCount}
              </ListGroup.Item>
              <ListGroup.Item>
                <BsFillBookmarkHeartFill />: {recipe.likes}
              </ListGroup.Item>
            </ListGroup>
            <LinkContainer to={`/recipe/${recipe.id}`}>
              <Nav.Link>
                <Button variant="warning">See More</Button>
              </Nav.Link>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Col>
    );
  });
  return <Row>{renderedRecipeList} </Row>;
};

export default RecipeList;
