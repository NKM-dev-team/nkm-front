import React from "react";
import LoginForm from "./LoginForm";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMapsAll } from "../features/hexMapSlice";
import HexMapsView from "./HexMapsView";
import { RootState } from "../app/store";
import Profile from "./Profile";
import { useMountEffect } from "../app/utils";
import RegisterForm from "./RegisterForm";
import { getAllLobbies } from "../features/lobbiesSlice";
import LobbiesView from "./LobbiesView";
import { Routes } from "../types/Routes";
import { Layout } from "../react-hexgrid";
import MainLayout from "./MainLayout";

function Router() {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);

  const routes = [
    {
      path: Routes.REGISTER,
      component: authData.login ? <Redirect to="/user" /> : <RegisterForm />,
    },
    {
      path: Routes.LOGIN,
      component: authData.login ? <Redirect to="/user" /> : <LoginForm />,
    },
    {
      path: Routes.HEXMAPS,
      component: <HexMapsView />,
    },
    {
      path: Routes.LOBBIES,
      component: <LobbiesView />,
    },
    {
      path: Routes.USER,
      component: authData.login ? <Profile /> : <Redirect to="/login" />,
    },
    {
      path: Routes.HOME,
      component: "test",
    },
  ];

  useMountEffect(() => {
    dispatch(getMapsAll());
    dispatch(getAllLobbies());
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {routes.map((route, i) => (
          <Route path={route.path}>
            <MainLayout>{route.component}</MainLayout>
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
