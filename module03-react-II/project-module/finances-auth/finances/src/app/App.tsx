import '../styles/main.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";

// pages
import { Home } from "../pages/Home";
import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard';
import { CreateAccount } from '../pages/CreateAccount';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/create-account">
          <CreateAccount />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Redirect to={{ pathname: "/home" }} />

      </Switch>
    </Router>
  );
}

export default App;
