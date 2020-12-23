import React from "react";
import Navbar from "../Navbar";
import LoginForm from "../LoginForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMapsAll } from "../../features/hexMapSlice";
import HexMapsView from "../HexMapsView";
import { Container } from "@material-ui/core";
import { RootState } from "../../app/store";
import Profile from "../Profile";
import { useMountEffect } from "../../app/utils";

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
  const authData = useSelector((state: RootState) => state.authData);

  useMountEffect(() => {
    dispatch(getMapsAll());
  });

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/login">
            <MainView>
              {authData.login ? <Redirect to="/user" /> : <LoginForm />}
            </MainView>
          </Route>
          <Route path="/hexmaps">
            <MainView>
              <HexMapsView />
            </MainView>
          </Route>
          <Route path="/user">
            <MainView>
              <Profile />
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
