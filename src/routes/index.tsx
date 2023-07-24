import {
  createBrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LayoutMain } from "../Layout/index";
import Store from "../pages/Store";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import React, { useEffect } from "react";
import Order from "../pages/Order";
import Page404 from "../pages/Page404";
const Middleware = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  // if (uid && token) {
  //   return children;
  // } else {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  const navigate = useNavigate();

  useEffect(() => {
    if (!uid || !token) {
      // Redirect to "/login" if uid or token is not present
      navigate("/register", { state: { from: location }, replace: true });
    }
  }, [uid, token, navigate, location]);

  // Render the children only when uid and token are present
  return uid && token ? children : null;
};
const Router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: <LayoutMain />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
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
