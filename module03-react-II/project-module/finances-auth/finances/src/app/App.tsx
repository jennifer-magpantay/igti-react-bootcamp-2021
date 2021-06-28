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
import { IUser, getUserSession } from '../services/Backend';
import { authContext } from '../services/AuthContent';

// checking if user has already a session when the application is loaded

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserSession().then(setUser, logOutApp);
  }, [])

  function logOutApp() {
    setUser(null);
  }

  // if has session, displays the dashboard page
  if (user) {
    return (
      <authContext.Provider value={{ user, logOutApp }}>
        <Router>
          <Switch>
            <Route path="/dashboard/:year/:month">
              <Dashboard />
            </Route>
            <Redirect to={{ pathname: "/dashboard/2021/01" }} />
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    // otherwise, return the home page with login and sign in pages
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login">
            <Login onLogin={setUser} />
          </Route>
          <Route path="/create-account" component={CreateAccount} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
