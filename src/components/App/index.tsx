import React, { EffectCallback, useEffect } from "react";
import Navbar from "../Navbar";
import LoginForm from "../LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMailsAll } from "../../features/hexMapSlice";
import HexMapsView from "../HexMapsView";

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

  useMountEffect(() => {
    dispatch(getMailsAll());
  });

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/login">
            {/*{userData?.loggedIn ? <Redirect to="/" /> : <LoginForm />}*/}
            <Navbar />
            <LoginForm />
          </Route>
          <Route path="/hexmaps">
            <Navbar />
            <HexMapsView />
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
