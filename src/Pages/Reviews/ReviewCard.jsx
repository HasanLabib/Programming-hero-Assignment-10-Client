import React from "react";

const ReviewCard = ({ review }) => {
  
  const {
    foodName,
    foodImage,
    restaurant,
    location,
    city,
    rating,
    userName,
    reviewText,
  } = review;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-6 pt-6">
          <img
            src={foodImage}
            alt="Food Item"
            className="rounded-xl h-48 w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title text-lg">{foodName}</h2>
            <div className="badge badge-secondary">⭐ {rating}</div>
          </div>

          <p className="text-sm text-gray-500">
            {restaurant} · {location}, {city}
          </p>

          <p className="text-sm mt-2">{reviewText}</p>

          <div className="card-actions justify-end mt-4">
            <div className="badge badge-outline">{foodName}</div>
            <div className="badge badge-outline">{userName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
