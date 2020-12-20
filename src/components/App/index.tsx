import React from "react";
import Navbar from "../Navbar";
import LoginForm from "../LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/login">
            {/*{userData?.loggedIn ? <Redirect to="/" /> : <LoginForm />}*/}
            <Navbar />
            <LoginForm />
          </Route>
          <Route path="/">
            <Navbar />
            test
            {/*{userData?.loggedIn ? <LoggedInView /> : <About />}*/}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
