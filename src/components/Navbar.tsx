import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CircleIcon from "@mui/icons-material/Circle";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { Grid, Link, Menu, MenuItem } from "@mui/material";
import LeftDrawer from "./LeftDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { authLogout } from "../features/authSlice";
import logo from "../img/nkm_logo.png";
import { MAIN_ROUTE_MAP } from "../types/route_mapping";
import WebsocketStatusIcon from "./WebsocketStatusIcon";

export default function Navbar() {
  const authData = useSelector((state: RootState) => state.authData);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
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
            onClick={() => setOpen(true)}
            sx={{ mr: 2 }}
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
          <WebsocketStatusIcon />

          {authData.login ? (
            <>
              <Button
                onClick={handleMenu}
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                {authData.login}
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
            <Link color="inherit" component={RouterLink} to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <LeftDrawer open={open} setOpen={setOpen} />
    </div>
  );
}
