import React, { useEffect, useState } from "react";

import { ClimbingBoxLoader } from "react-spinners";
import Hero from "../Components/Hero/Hero";
import ScrollAnimation from "../Components/Scroll/ScrollAnimation";
import Reviews from "./Reviews/Reviews";
import axios from "axios";
import TopContributors from "../Components/TopContributer";
import FoodChallenges from "../Components/FoodChallenges";

const Home = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://programming-hero-assignment-10-serv.vercel.app/top-reviews`);
        setTopReviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return loading ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    !loading && (
      <>
        <div className="mb-3">
          <ScrollAnimation delay={0.4}>
            <Hero />
          </ScrollAnimation>
          <ScrollAnimation delay={0.8}>
            <Reviews review={topReviews} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={1}>
            <TopContributors />
          </ScrollAnimation>
          <ScrollAnimation delay={1.2}>
            <FoodChallenges />
          </ScrollAnimation>
        </div>
      </>
    )
  );
};

export default Home;
