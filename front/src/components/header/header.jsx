import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Menu,
  Typography,
  MenuItem,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
// import { deepPurple } from "@mui/material/colors";
import { Icons } from "../../utils/mui.components";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { close, open } from "../../store/sidebar/sidebarSlice";

export function Header() {
  const avatar = null;
  const menuState = useSelector((state) => state.sidebar.value);
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const onSettings = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const onCloseSettings = () => {
    setAnchorElUser(null);
  };

  const onSidebar = () => {
    menuState === "opened" ? dispatch(close()) : dispatch(open());
  };
  return (
    <AppBar sx={{ width: "calc(100vw - 55px)" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onSidebar}
        >
          {menuState === "opened" ? <Icons.Close /> : <Icons.Menu />}
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Configuracion">
            <IconButton onClick={onSettings} sx={{ p: 0 }}>
              <Avatar
                alt={avatar ? avatar : ""}
                sx={{ bgcolor: avatar ? "white" : deepPurple[500] }}
              >
                {!avatar ? "LS" : ""}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={onCloseSettings}
          >
            <MenuItem key={0} onClick={onCloseSettings}>
              <Typography textAlign="center">Cerrar</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
