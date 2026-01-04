import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
import Hero from "../Components/Hero/Hero";
import ScrollAnimation from "../Components/Scroll/ScrollAnimation";
import ReviewCard from "./Reviews/ReviewCard";
import TopContributors from "../Components/TopContributer";
import FoodChallenges from "../Components/FoodChallenges";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";

const Home = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const toggleFavorite = async (id) => {
    if (!user) return toast("Please login first");

    try {
      await axios.post(
        `https://programming-hero-assignment-10-serv.vercel.app/reviews/favorite/${id}`,
        { userEmail: user.email }
      );

      setTopReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, isFavorited: !r.isFavorited } : r
        )
      );
    } catch {
      toast.error("Failed to update favorite");
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://programming-hero-assignment-10-serv.vercel.app/top-reviews"
        );

        setTopReviews(res.data.reviews.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <ScrollAnimation delay={0.4}>
        <Hero />
      </ScrollAnimation>

      <ScrollAnimation delay={0.8}>
        <section className="my-10">
          <h1 className="text-2xl md:text-4xl font-black text-center mb-6">
            Latest Reviews
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-11/12 mx-auto">
            {topReviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                toggleFavorite={() => toggleFavorite(review._id)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link to="/reviews" className="btn btn-neutral bg-amber-600">
              View More
            </Link>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={1}>
        <TopContributors />
      </ScrollAnimation>

      <ScrollAnimation delay={1.2}>
        <FoodChallenges />
      </ScrollAnimation>
    </div>
  );
};

export default Home;
