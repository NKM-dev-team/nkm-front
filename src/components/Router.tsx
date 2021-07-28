import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import HexMapsView from "../views/HexMapsView";
import { RootState } from "../app/store";
import Profile from "../views/Profile";
import RegisterForm from "./RegisterForm";
import LobbiesView from "../views/LobbiesView";
import { Routes } from "../types/Routes";
import MainLayout from "./MainLayout";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import LobbyView from "../views/LobbyView";

function Router() {
  const authData = useSelector((state: RootState) => state.authData);

  const routes = [
    {
      path: Routes.REGISTER,
      component: authData.login ? <Redirect to="/user" /> : <RegisterForm />,
    },
    {
      path: Routes.LOGIN,
      component: authData.login ? <Redirect to="/user" /> : <LoginView />,
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
      path: Routes.LOBBY,
      component: <LobbyView />,
    },
    {
      path: Routes.USER,
      component: authData.login ? <Profile /> : <Redirect to="/login" />,
    },
    {
      path: Routes.HOME,
      component: <HomeView />,
    },
  ];

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {routes.map((route) => (
          <Route key={1} path={route.path}>
            <MainLayout>{route.component}</MainLayout>
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
