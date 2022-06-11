import { Container, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { GiPressureCooker } from "react-icons/gi";

const Home = () => {
  return (
    <Container
      style={{
        position: "absolute",
        top: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Struggling with what to eat or cook?</h1>
      <LinkContainer to="/fridge" style={{ width: "fit-content" }}>
        <Nav.Link>
          <Button variant="warning">
            Let's cook with us!
            <GiPressureCooker className="mx-1" />
          </Button>
        </Nav.Link>
      </LinkContainer>
    </Container>
  );
};

export default Home;
