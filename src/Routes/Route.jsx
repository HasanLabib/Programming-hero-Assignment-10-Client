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
import Explore from "../Pages/Reviews/Explore";
import Profile from "../Components/Profile/Profile";
import Update from "../Components/Profile/Update";
import DashboardLayout from "../Components/Dashboard/DashboardLayout";
import DashboardHome from "../Components/Dashboard/DashboardHome";
import AllUsers from "../Components/Dashboard/AllUsers";
import AllReviews from "../Components/Dashboard/AllReviews";
import AboutUs from "../Components/AboutUs";
import ContactMessages from "../Components/Dashboard/ContactMessages";
import Contact from "../Pages/Contact";

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
          path: "/about",
          Component: AboutUs,
        },
        {
          path: "/contact",
          Component: Contact,
        },
        {
          path: "/login",
          Component: Login,
        },
        {
          path: "/explore",
          element: <Explore />,
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
          path: "/profile",
          element: (
            <PrivateRouteProvide>
              <Profile />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "/profile/update",
          element: (
            <PrivateRouteProvide>
              <Update />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "/reviews",
          Component: Reviews,
        },
        {
          path: "/reviews/:id",
          element: <ReviewDetails />,
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
        {
          path: "/dashboard",
          element: (
            <PrivateRouteProvide>
              <DashboardLayout />
            </PrivateRouteProvide>
          ),
          children: [
            {
              index: true,
              element: <DashboardHome />,
            },
            {
              path: "add-review",
              element: <AddReview />,
            },
            {
              path: "my-reviews",
              element: <MyReviews />,
            },
            {
              path: "edit-review/:id",
              element: <EditReview />,
            },
            {
              path: "my-favorites",
              element: <MyFavouriteReview />,
            },
            {
              path: "contact-messages",
              element: <ContactMessages />,
            },
            {
              path: "all-users",
              element: <AllUsers />,
            },
            {
              path: "all-reviews",
              element: <AllReviews />,
            },
          ],
        },
      ],
    },
  ]);
