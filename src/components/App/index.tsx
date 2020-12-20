import React, { EffectCallback, useEffect } from "react";
import Navbar from "../Navbar";
import LoginForm from "../LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMailsAll } from "../../features/hexMapSlice";
import HexMapsView from "../HexMapsView";
import { Container } from "@material-ui/core";

interface MyProps {
  children?: React.ReactNode;
}
function MainView({ children }: MyProps) {
  return (
    <>
      <Navbar />
      <Container>
        <>{children}</>
      </Container>
    </>
  );
}

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
            <MainView>
              <LoginForm />
            </MainView>
          </Route>
          <Route path="/hexmaps">
            <MainView>
              <HexMapsView />
            </MainView>
          </Route>
          <Route path="/">
            <MainView>test</MainView>
            {/*{userData?.loggedIn ? <LoggedInView /> : <About />}*/}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
