import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import AddReview from "../Pages/AddReview/AddReview";
import Reviews from "../Pages/Reviews/Reviews";
import MyReviews from "../Pages/Reviews/MyReview";
import EditReview from "../Pages/Reviews/EditReview";
import MyFavouriteReview from "../Pages/Reviews/MyFavouriteReview";

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
          Component: Reviews,
        },
        {
          path: "/my-reviews",
          Component: MyReviews,
        },
        {
          path: "/edit-review/:id",
          Component: EditReview,
        },
        {
          path:"/my-favorites",
          Component: MyFavouriteReview,
        }
      ],
    },
  ]);
