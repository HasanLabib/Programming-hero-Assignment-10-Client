import React from "react";


import { Link } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import useReviewHook from "../../hooks/useReviewHook";
import ReviewCard from "./ReviewCard";
import ScrollAnimation from "../../Components/Scroll/ScrollAnimation";

const Reviews = ({ review }) => {
  const { review: reviewN, loading } = useReviewHook();

  return loading ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-6 w-11/12 mx-auto items-center">
                {review.map((rv, idx) => {
                  const delay = 0.3 + idx * 0.2;
                  return (
                    <ScrollAnimation delay={delay}>
                      <div key={rv.serviceId}>
                        <Link to={`/reviews/${rv.serviceId}`}>
                          <ReviewCard review={rv} />
                        </Link>
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
              <div className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-4 lg:gap-6 w-11/12 mx-auto items-center">
                {reviewN.map((rv, idx) => {
                  const delay = 0.3 + idx * 0.2;
                  return (
                    <ScrollAnimation delay={delay}>
                      <div key={rv.serviceId}>
                        <Link to={`/reviews/${rv.serviceId}`}>
                          <ReviewCard review={rv} />
                        </Link>
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
