import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const Explore = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const categories = ["All", "Street Food", "Restaurants", "Home-Cooked"];
  const cities = [
    "All",
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ];

  useEffect(() => {
    const fetchExplore = async () => {
      setLoading(true);
      const url = `https://programming-hero-assignment-10-serv.vercel.app/explore?search=${search}&category=${category}&city=${city}&sort=${sort}&page=${page}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();

      setReviews(data.reviews);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchExplore();
  }, [search, category, city, sort, page]);

  return (
    <section className="w-11/12 mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Local Food 🍽️</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search food or restaurant"
          className="input input-bordered"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setPage(1);
          }}
        >
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            onClick={() => navigate(`/reviews/${review._id}`)}
            className="cursor-pointer"
          >
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden h-[420px]">
              <figure className="relative h-[200px]">
                <img
                  src={review.foodImage}
                  alt={review.foodName}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <FaStar className="text-amber-400" />
                  <span>{review.rating}</span>
                </div>
              </figure>

              <div className="card-body p-5 flex flex-col justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold line-clamp-1">
                    {review.foodName}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {review.restaurant} · {review.city}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {review.reviewText}
                  </p>
                </div>

                <div className="pt-3">
                  <span className="badge badge-outline badge-primary">
                    {review.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-10">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
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
    </section>
  );
};

export default Explore;
