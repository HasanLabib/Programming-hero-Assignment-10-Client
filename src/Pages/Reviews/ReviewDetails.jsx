import React from "react";
import { useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import toast from "react-hot-toast";
import useSingleReview from "../../hooks/useSingleReview";
import { FaStar, FaMapMarkerAlt, FaUtensils } from "react-icons/fa";

const ReviewDetails = () => {
  const { id } = useParams();
  const { review: singleReview, loading, error } = useSingleReview(id);

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">
          Something went wrong!
        </h2>
      </div>
    );
  }

  if (!singleReview) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-500">Review not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-11/12 mx-auto mt-10 rounded-3xl overflow-hidden shadow-xl">
        <img
          src={singleReview.foodImage}
          alt={singleReview.foodName}
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="badge badge-warning mb-2">
            {singleReview.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            {singleReview.foodName}
          </h1>

          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> {singleReview.rating}
            </span>
            <span className="flex items-center gap-1">
              <FaUtensils /> {singleReview.restaurant}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt /> {singleReview.location}, {singleReview.city}
            </span>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-12 space-y-12">
        <div className="bg-base-100 rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {singleReview.overview}
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-4">About this food</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            {singleReview.reviewText}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Key Information</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-base-200 p-5 rounded-2xl shadow-sm">
              💰 <b>Price</b>
              <p className="text-sm">{singleReview.keyInfo.priceRange}</p>
            </div>
            <div className="card bg-base-200 p-5 rounded-2xl shadow-sm">
              🌶 <b>Spice</b>
              <p className="text-sm">{singleReview.keyInfo.spiceLevel}</p>
            </div>
            <div className="card bg-base-200 p-5 rounded-2xl shadow-sm">
              🧼 <b>Hygiene</b>
              <p className="text-sm">{singleReview.keyInfo.hygiene}</p>
            </div>
            <div className="card bg-base-200 p-5 rounded-2xl shadow-sm">
              🪑 <b>Seating</b>
              <p className="text-sm">{singleReview.keyInfo.seating}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Related Foods</h2>
          <div className="flex flex-wrap gap-3">
            {singleReview.relatedFoods.map((food, index) => (
              <span
                key={index}
                className="badge badge-outline badge-lg hover:badge-primary transition"
              >
                {food}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {singleReview.media.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Food"
                className="rounded-2xl object-cover w-full h-52 hover:scale-105 transition-transform duration-300 shadow-md"
              />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-3xl shadow-md">
          <h3 className="text-xl font-bold mb-1">Reviewed by</h3>
          <p className="font-semibold text-lg">{singleReview.userName}</p>
          <p className="text-sm text-gray-600">
            {new Date(singleReview.createdAt).toDateString()}
          </p>

          <button
            className="btn btn-neutral mt-4 rounded-full"
            onClick={() => toast.success("Thanks for supporting local food ❤️")}
          >
            Appreciate Review
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewDetails;
