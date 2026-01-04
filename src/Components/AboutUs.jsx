import React from "react";
import { FaUtensils, FaUsers, FaHeart, FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative h-[70vh] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Local Food Lovers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 text-white max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Local Food Lovers Network
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            A community-driven platform where food lovers discover, review, and
            celebrate the best local food around them.
          </p>
        </div>
      </div>

      <div className="w-11/12 max-w-6xl mx-auto py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Local Food Lovers Network was built to connect people through food.
            From bustling street stalls to cozy home kitchens and local
            restaurants, we believe great food deserves to be discovered and
            shared.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to create a trusted space where real people share honest
            experiences, helping others explore nearby food with confidence.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="Street food"
          className="rounded-3xl shadow-lg"
        />
      </div>

      <div className="bg-base-200 py-20">
        <div className="w-11/12 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Local Food Lovers Network?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FaUtensils />}
              title="All Kinds of Food"
              text="Street food, restaurants, and home-cooked meals — all in one place."
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Community Powered"
              text="Reviews written by real food lovers, not paid promotions."
            />
            <FeatureCard
              icon={<FaMapMarkedAlt />}
              title="Discover Nearby"
              text="Find great food experiences around your city and beyond."
            />
            <FeatureCard
              icon={<FaHeart />}
              title="Support Local"
              text="Helping local vendors and small businesses get discovered."
            />
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="w-11/12 max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <Stat number="10K+" label="Food Reviews Shared" />
          <Stat number="2K+" label="Local Food Spots" />
          <Stat number="500+" label="Active Food Lovers" />
          <Stat number="64" label="Districts Explored" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Join the Local Food Movement
        </h2>
        <p className="max-w-xl mx-auto text-lg text-orange-100 mb-6">
          Share your food experience, post reviews with photos, and help others
          discover amazing local flavors.
        </p>
        <button className="btn btn-neutral btn-lg rounded-full">
          <Link to="/explore">Explore Local Food</Link>
        </button>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
    <div className="text-3xl text-primary mb-4 mx-auto w-fit">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="bg-base-100 p-6 rounded-2xl shadow-md">
    <h3 className="text-4xl font-extrabold text-primary">{number}</h3>
    <p className="text-gray-600 mt-2">{label}</p>
  </div>
);

export default AboutUs;
