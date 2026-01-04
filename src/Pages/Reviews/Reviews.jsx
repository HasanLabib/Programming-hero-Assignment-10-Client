import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
import ReviewCard from "./ReviewCard";
import ScrollAnimation from "../../Components/Scroll/ScrollAnimation";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";

const Reviews = () => {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchText);
      setPage(1);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://programming-hero-assignment-10-serv.vercel.app/reviews",
          {
            params: { search, page, limit },
          }
        );

        setReviews(res.data.reviews);
        setTotalPages(Math.ceil(res.data.totalCount / limit));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [search, page]);

  useEffect(() => {
    if (!user || reviews.length === 0) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `https://programming-hero-assignment-10-serv.vercel.app/reviews/favorites/${user.email}`
        );

        const favIds = res.data;

        setReviews((prev) =>
          prev.map((r) => ({
            ...r,
            isFavorited: favIds.includes(r._id),
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [reviews.length, user]);

  const toggleFavorite = async (id) => {
    if (!user) return toast("Please login first");

    try {
      await axios.post(
        `https://programming-hero-assignment-10-serv.vercel.app/reviews/favorite/${id}`,
        { userEmail: user.email }
      );

      setReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, isFavorited: !r.isFavorited } : r
        )
      );
    } catch {
      toast.error("Failed to update favorite");
    }
  };

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-black text-center mb-6 mt-10">
        All Reviews
      </h1>
      <div className="w-11/12 mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by food name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full md:w-1/2 mx-auto block"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12 mx-auto">
        {reviews.map((review, idx) => (
          <ScrollAnimation key={review._id} delay={0.2 + idx * 0.1}>
            <ReviewCard
              review={review}
              toggleFavorite={() => toggleFavorite(review._id)}
            />
          </ScrollAnimation>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="btn btn-sm btn-outline cursor-default">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Reviews;
