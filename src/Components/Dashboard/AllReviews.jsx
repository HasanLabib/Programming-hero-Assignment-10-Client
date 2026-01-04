import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 6;

  useEffect(() => {
    fetchAllReviews(page);
  }, [page]);

  const fetchAllReviews = async (currentPage = page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://programming-hero-assignment-10-serv.vercel.app/reviews?page=${currentPage}&limit=${limit}`
      );
      setReviews(res.data.reviews);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(
        `https://programming-hero-assignment-10-serv.vercel.app/reviews/${id}`
      );
      toast.success("Review deleted");
      fetchAllReviews();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter(
    (r) =>
      r.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalCount / limit);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loading loading-spinner loading-lg text-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-3xl font-bold">All Reviews</h1>
        <div className="badge badge-lg badge-primary w-fit">
          Total: {totalCount}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Search by food, restaurant, or user..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex gap-4">
              <img
                src={review.foodImage}
                alt={review.foodName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{review.foodName}</p>
                <p className="text-sm text-gray-500">{review.restaurant}</p>
                <p className="text-xs text-gray-400">{review.city}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">{review.userName}</p>
                <p className="text-gray-400 text-xs break-all">
                  {review.userEmail}
                </p>
              </div>
              <p className="text-amber-500 font-semibold">★ {review.rating}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/reviews/${review._id}`}
                  className="btn btn-xs btn-ghost"
                >
                  <FaEye />
                </Link>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-xs btn-ghost text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>Food</th>
                <th>Restaurant</th>
                <th>User</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length ? (
                filteredReviews.map((review) => (
                  <tr key={review._id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={review.foodImage}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold">{review.foodName}</p>
                          <p className="text-sm opacity-50">{review.city}</p>
                        </div>
                      </div>
                    </td>
                    <td>{review.restaurant}</td>
                    <td>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-sm opacity-50 break-all">
                        {review.userEmail}
                      </p>
                    </td>
                    <td className="text-amber-500 font-semibold">
                      ★ {review.rating}
                    </td>
                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/reviews/${review._id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="btn btn-ghost btn-sm text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center gap-4 pt-4">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="flex items-center font-semibold">
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
    </div>
  );
};

export default AllReviews;
