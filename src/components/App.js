import "./App.css";
import NavBar from "./NavBar";
import Home from "./Home";
import BaseForm from "./base/BaseForm";
import LovedRecipeList from "./recipes/LovedRecipeList";
import SearchHistory from "./ingredients/SearchHistory";
import RecipeDetails from "./recipes/RecipeDetails";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/fridge" exact element={<BaseForm />} />
            <Route path="/loved-recipe" exact element={<LovedRecipeList />} />
            <Route path="/search-history" exact element={<SearchHistory />} />
            <Route path="/recipe/:id" exact element={<RecipeDetails />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
