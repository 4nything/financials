import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { CommonRoutes } from "../../routes/routes";
import "./main.layout.css";
import { useScrollTrigger } from "@mui/material";
import React from "react";
import { PropTypes } from "prop-types";
import Sidebar from "../../components/sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../store/sidebar/sidebarSlice";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function MainLayout(props) {
  const menuState = useSelector((state) => state.sidebar.value);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    if (menuState === "opened") dispatch(close());
  };

  const styles = {
    width:
      menuState === "opened" ? "calc(100vw - 250px)" : "calc(100vw - 55px)",
    marginLeft: menuState === "opened" ? "250px" : "55px",
  };
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <ElevationScroll {...props}>
          <Header />
        </ElevationScroll>
        <div className="main" onClick={closeSidebar} style={styles}>
          <Routes>
            {CommonRoutes.map((route, index) => (
              <Route
                path={route.path}
                element={route.element}
                key={index}
              ></Route>
            ))}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
