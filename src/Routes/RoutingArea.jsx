import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";
import Category from "../Pages/Category.jsx";
import ProductDetail from "../Pages/ProductDetail.jsx";
import Cart from "../Pages/Cart.jsx";
import Login from "../Pages/Login.jsx";
import Wishlist from "../Pages/Wishlist.jsx";
import Profile from "../Pages/Profile.jsx";

const RoutingArea = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "category/:categoryName",
          element: <Category />,
        },
        {
          path: "product/:productId",
          element: <ProductDetail />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RoutingArea;
