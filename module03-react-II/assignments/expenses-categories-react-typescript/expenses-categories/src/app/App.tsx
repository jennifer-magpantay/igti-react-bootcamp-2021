import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// pages
import { Home } from "../pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
