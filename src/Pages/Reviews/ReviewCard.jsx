import React, { useContext } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const ReviewCard = ({ review, toggleFavorite }) => {
  const { user } = useContext(AuthContext);

  const {
    foodName,
    foodImage,
    restaurant,
    location,
    city,
    rating,
    userName,
    reviewText,
    _id,
    isFavorited,
  } = review;

  return (
    <Link to={`/reviews/${_id}`} className="block h-full">
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col">
       
        <figure className="relative">
          <img
            src={foodImage}
            alt={foodName}
            className="h-52 w-full object-cover"
          />

          {user && (
            <button
              onClick={(e) => {
                e.preventDefault(); 
                toggleFavorite();
              }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full text-red-500 text-lg shadow hover:scale-110 transition"
            >
              {isFavorited ? <FaHeart /> : <FaRegHeart />}
            </button>
          )}

          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaStar className="text-amber-400" />
            <span className="font-semibold">{rating}</span>
          </div>
        </figure>

        <div className="card-body p-5 flex flex-col flex-grow">
          <div>
            <h2 className="text-lg font-bold line-clamp-1">{foodName}</h2>
            <p className="text-sm text-gray-500 line-clamp-1">
              {restaurant} · {location}, {city}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 mt-2 flex-grow">
            {reviewText}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="btn btn-xs btn-outline btn-primary rounded-full">
              View Details
            </span>

            <span className="text-sm text-gray-500">
              By{" "}
              <span className="font-medium text-gray-700">
                {userName?.split(" ")[0]}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
