import React, { use, useContext, useEffect, useState } from "react";

import { Link } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import useReviewHook from "../../hooks/useReviewHook";
import ReviewCard from "./ReviewCard";
import ScrollAnimation from "../../Components/Scroll/ScrollAnimation";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const Reviews = ({ review }) => {
  const { review: reviewN, loading } = useReviewHook();
  const [allReviews, setReviews] = useState(reviewN || []);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchReviews = async () => {
        try {
          setSearchLoading(true);
          const res = await axios.get(
            `http://localhost:4000/reviews?search=${search}`
          );
          setReviews(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setSearchLoading(false);
        }
      };

      if (search.trim() !== "") {
        fetchReviews();
      } else {
        setReviews(reviewN);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [search, reviewN]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `https://programming-hero-assignment-10-serv.vercel.app/reviews/favorites/${user.email}`
        );
        const favoriteIds = res.data;
        setReviews((prev) =>
          prev.map((rv) => ({
            ...rv,
            isFavorited: favoriteIds.includes(rv._id),
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (reviewId) => {
    if (!user) return toast("Please login to favorite a review");
    try {
      await axios.post(`https://programming-hero-assignment-10-serv.vercel.app/reviews/favorite/${reviewId}`, {
        userEmail: user.email,
      });
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? { ...review, isFavorited: !review.isFavorited }
            : review
        )
      );
    } catch (error) {
      console.error("Error favoriting the review:", error);
      toast.error("Failed to favorite the review. Please try again.");
    }
  };

  return loading || searchLoading ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    !loading && (
      <>
        <div className="my-3.5">
          {review ? (
            <>
              {" "}
              <h1 className="text-2xl md:text-4xl font-black w-11/12 mx-auto  text-center mb-5 mt-9">
                All Reviews
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto items-center">
                {review.map((rv, idx) => {
                  const delay = 0.3 + idx * 0.2;
                  return (
                    <ScrollAnimation delay={delay}>
                      <div key={rv._id}>
                        <ReviewCard review={rv} />
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
              <div className="w-11/12 mx-auto flex justify-center-safe mt-5">
                <ScrollAnimation
                  delay={
                    parseFloat((Math.random() * 1.2 + 0.3).toFixed(2)) + 0.2
                  }
                >
                  <Link
                    to={`/reviews`}
                    className="  text-center btn btn-neutral bg-amber-600 w-fit"
                  >
                    View More
                  </Link>
                </ScrollAnimation>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-4xl font-Bold text-center mb-5">
                All Reviews
              </h1>
              <div className="w-11/12 mx-auto mb-5">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by food name"
                  className="input input-bordered w-full md:w-1/2 mx-auto block"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto items-center">
                {allReviews.map((rv, idx) => {
                  const delay = 0.3 + idx * 0.2;
                  return (
                    <ScrollAnimation delay={delay}>
                      <div key={rv._id}>
                        <ReviewCard
                          review={rv}
                          user={user}
                          toggleFavorite={() => toggleFavorite(rv._id)}
                        />
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </>
    )
  );
};

export default Reviews;
