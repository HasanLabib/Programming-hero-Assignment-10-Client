import React from "react";
import crousal2Img from "../../../assets/image (2).jpg";
const Crousal_2 = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <img
        src={crousal2Img}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Hero"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex items-center h-full">
        <div className="flex flex-col w-11/12 mx-auto text-center md:text-start p-6 md:p-10 gap-4">
          <section className="content_section max-w-3xl">
            <p className="text-[#FD7E14] font-black">
              Local Food Lovers Network
            </p>

            <h1 className="font-extrabold text-white text-2xl md:text-4xl lg:text-6xl my-5 leading-tight">
              From Street Food <br />
              <span className="font-light text-[#FD7E14]">
                To Hidden Local Gems
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-200">
              Discover authentic street food, family-run restaurants, and
              underrated local spots shared by real food lovers. Explore places
              you won’t find in typical food guides.
            </p>

            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <button className="bg-[#FD7E14] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600">
                Explore Reviews
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Crousal_2;
