import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import star from "../../assets/icon-ratings.png";
import axios from "axios";
import ServiceError from "../../Error/ServiceErrorPage/ServiceError";

const ReviewDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reviewDetail, setReviewDetail] = useState(null);
  const [loadingSpin, setLoadingSpin] = useState(true);

  setInterval(() => {
    setLoadingSpin(false);
  }, 2000);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      try {
        const res = await axios.get(`https://programming-hero-assignment-10-serv.vercel.app/reviews/${id}`);
        const review = res.data;
        setReviewDetail(review);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviewDetail();
  }, [id]);

  const {
    foodName,
    foodImage,
    restaurant,
    location,
    city,
    rating,
    userName,
    reviewText,
  } = reviewDetail || {};

  return loadingSpin ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    <>
      {!loading && !loadingSpin ? (
        !reviewDetail ? (
            <ServiceError />
         
        ) : (
          <>
            <div className="flex bg-[rgb(129, 125, 125)] flex-col gap-2 mt-10 justify-around items-center-safe md:justify-start w-11/12 mx-auto">
              <figure className="flex-1">
                <img src={foodImage} alt="" className=" object-contain w-72" />
              </figure>
              <div className="flex-1 space-y-5">
                <h1 className="text-2xl md:text-4xl font-bold">{foodName}</h1>
                <p className="text-[14px] ">Category: {restaurant}</p>
                <p className="text-[14px] md:text-lg">
                  {location}, {city}
                </p>
                <div>
                  <p className="bg-gradient-to-br from-[#2e8ce3] to-[#62a3f28d] bg-clip-text text-transparent font-semibold">
                    Review: {reviewText}
                  </p>
                  <span className="font-semibold text-[#627382]">
                    Reviewer :{" "}
                  </span>{" "}
                  <span className="bg-gradient-to-br from-[#e38c2e] to-[#f2d862] bg-clip-text text-transparent font-semibold">
                    {userName}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#627382]">Email: </span>{" "}
                  <span className="bg-gradient-to-br from-[#e38c2e] to-[#f2d862] bg-clip-text text-transparent font-semibold">
                    {reviewDetail.userEmail}
                  </span>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <section className="flex flex-wrap gap-3">
                  <div className="btn bg-[#d9d4d2] rounded-3xl">
                    <p>Popular </p>{" "}
                  </div>
                  <div className="btn bg-[#d9d4d2] rounded-3xl">
                    <img src={star} className="w-[13%]" />
                    <p>Rating: </p>

                    <p>{rating}</p>
                  </div>
                </section>
              </div>
            </div>
          </>
        )
      ) : (
        " "
      )}
    </>
  );
};

export default ReviewDetails;
