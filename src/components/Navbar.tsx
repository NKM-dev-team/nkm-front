import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { Link, Menu, MenuItem } from "@mui/material";
import LeftDrawer from "./LeftDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { authLogout } from "../features/authSlice";

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/*Photos*/}
          </Typography>

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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseClick}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            // <Typography>{authData.login}</Typography>
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
