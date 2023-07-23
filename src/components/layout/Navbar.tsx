import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { Grid, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { authLogout } from "../../features/authSlice";
import logo from "../../img/nkm_logo.png";
import { MAIN_ROUTE_MAP } from "../../types/route_mapping";
import WebsocketStatusIcon from "./WebsocketStatusIcon";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

interface NavbarProps {
  lobbyWsHook: WebSocketHook;
  gameWsHook: WebSocketHook;
  refreshLobbyWsConnection: () => void;
  refreshGameWsConnection: () => void;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  lobbyWsHook,
  gameWsHook,
  refreshLobbyWsConnection,
  refreshGameWsConnection,
  setDrawerOpen,
}: NavbarProps) {
  const authData = useSelector((state: RootState) => state.authData);
  const dispatch = useDispatch();

  const [loginViewOpen, setLoginViewOpen] = React.useState(false);
  const [registerViewOpen, setRegisterViewOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseClick = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    setAnchorEl(null);
    dispatch(authLogout());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to={MAIN_ROUTE_MAP[0][1]} style={{ flexGrow: 1 }}>
            <Grid container>
              <img
                src={logo}
                alt={MAIN_ROUTE_MAP[0][0]}
                width={49}
                style={{ alignSelf: "center" }}
              />
            </Grid>
          </NavLink>
          <WebsocketStatusIcon
            wsName={"Lobby"}
            wsHook={lobbyWsHook}
            restartWs={refreshLobbyWsConnection}
          />
          <WebsocketStatusIcon
            wsName={"Game"}
            wsHook={gameWsHook}
            restartWs={refreshGameWsConnection}
          />

          {authData.token ? (
            <>
              <Button
                onClick={handleMenu}
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                {authData.userState?.userId ?? "undefined"}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseClick}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => setLoginViewOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <LoginDialog
        loginViewOpen={loginViewOpen}
        setLoginViewOpen={setLoginViewOpen}
        setRegisterViewOpen={setRegisterViewOpen}
      />

      <RegisterDialog
        registerViewOpen={registerViewOpen}
        setRegisterViewOpen={setRegisterViewOpen}
        setLoginViewOpen={setLoginViewOpen}
      />
    </div>
  );
}
