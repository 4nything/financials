import "./sidebar.css";
import { Navigation } from "../../services/navigation";
import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menuState = useSelector((state) => state.sidebar.value);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelectMenu = (event, index) => {
    setSelectedIndex(index);
  };

  const name = "Luca Smigoski";
  return (
    <div
      className="sidebar"
      style={{ width: menuState === "opened" ? "250px" : "55px" }}
    >
      <div
        className="sidebar-header"
        style={{ paddingTop: menuState === "opened" ? "16px" : 0 }}
      >
        {menuState === "opened" ? `${name} Accounts` : ""}
      </div>
      <List
        component="nav"
        aria-label="main mailbox folders"
        sx={{
          paddingTop: "3px",
          marginTop: menuState === "opened" ? "24px" : 0,
        }}
      >
        {Navigation.map((item, index) => {
          return (
            <Link to={item.path} key={index} style={{textDecoration: 'none', color: 'black'}}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => onSelectMenu(event, index)}
              >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ display: menuState === "opened" ? "block" : "none" }}
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </div>
  );
}
