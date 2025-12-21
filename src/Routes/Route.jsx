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
import PrivateRouteProvide from "../Provider/PrivateRouteProvider/PrivateRouteProvide";
import ReviewDetails from "../Pages/Reviews/ReviewDetails";
import RouteError from "../Error/RouteErrorPage/RouteError";

export const route = () =>
  createBrowserRouter([
    {
      path: "/",
      Component: App,
      errorElement: <RouteError />,
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
          element: (
            <PrivateRouteProvide>
              <AddReview />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "/reviews",
          Component: Reviews,
        },
        {
          path: "/reviews/:id",
          element: (
            <PrivateRouteProvide>
              <ReviewDetails />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "/my-reviews",
          element: (
            <PrivateRouteProvide>
              <MyReviews />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "/edit-review/:id",
          element: (
            <PrivateRouteProvide>
              <EditReview />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "/my-favorites",
          element: (
            <PrivateRouteProvide>
              <MyFavouriteReview />
            </PrivateRouteProvide>
          ),
        },
      ],
    },
  ]);
