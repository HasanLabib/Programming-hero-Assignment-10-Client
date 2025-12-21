import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import AddReview from "../Pages/AddReview/AddReview";
import Reviews from "../Pages/Reviews/Reviews";

export const route = () =>
  createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "/signup",
          Component: SignUp,
        },
        {
          path: "/login",
          Component: Login,
        },
        {
          path: "/add-review",
          element: <AddReview />,
        },
        {
          path: "/reviews",
          Component: Reviews
        }
      ],
    },
  ]);
