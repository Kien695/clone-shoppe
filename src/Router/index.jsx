import Login from "../pages/Login";
import RegisterLayout from "../Layout/RegisterLayout";
import Register from "../pages/Register";
import ProductList from "../pages/ProductList";
import MainLayout from "../Layout/MainLayout";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/app.context";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export const routers = [
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          // ...
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RejectedRoute />,
    children: [
      {
        path: "/",
        element: <RegisterLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      // ...
    ],
  },
];
