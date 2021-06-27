import '../styles/main.css';
import { useState, useEffect } from 'react';
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
import { Error } from '../pages/Error'
import { getUserRegister } from '../services/Backend';


// checking if user has already a session when the application is loaded

function App() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    getUserRegister().then(
      () => setHasSession(true),
      () => setHasSession(false))
  }, [])

  // if has session, displays the dashboard page
  if (hasSession) {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard/:year/:month" exact component={Dashboard} />
          {/* <Redirect to={{ pathname: "/home" }} /> */}
        </Switch>
      </Router>
    );
  } else {
    // otherwise, return the home page with login and sign in pages
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
