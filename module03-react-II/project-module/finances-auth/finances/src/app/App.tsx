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
        <Route path="/home" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/dashboard/:year/:month" component={Dashboard} />
        <Redirect to={{ pathname: "/home" }} />
      </Switch>
    </Router>
  );
}

export default App;
