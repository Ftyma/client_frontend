import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { LayoutMain } from "../Layout/index";
import Store from "../pages/Store";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import React from "react";
import Order from "../pages/Order";
import Page404 from "../pages/Page404";
const Middleware = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  if (uid && token) {
    return children;
  } else {
    return <Navigate to="/404" state={{ from: location }} replace />;
  }
};
const Router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: <LayoutMain />,
    children: [
      {
        path: "/cart",
        element: (
          <Middleware>
            <Cart />
          </Middleware>
        ),
      },
      {
        path: "/store",
        element: (
          <Middleware>
            <Store />
          </Middleware>
        ),
      },
      {
        path: "/order",
        element: (
          <Middleware>
            <Order />
          </Middleware>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/404",
        element: <Page404 />,
      },
    ],
  },
]);
export default Router;
