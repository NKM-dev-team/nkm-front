import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import { Link, Menu, MenuItem } from "@material-ui/core";
import LeftDrawer from "../LeftDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { authLogout } from "../../features/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function Navbar() {
  const classes = useStyles();
  const authData = useSelector((state: RootState) => state.authData);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseClick = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    setAnchorEl(null);
    dispatch(authLogout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setOpen(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/*News*/}
          </Typography>
          {authData.login ? (
            <>
              <Button onClick={handleClick}>{authData.login}</Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseClick}
              >
                <MenuItem onClick={handleLogoutClick}>Wyloguj się</MenuItem>
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
