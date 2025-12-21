import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPizzaSlice, FaPepperHot, FaIceCream } from "react-icons/fa";

const challenges = [
  {
    id: 1,
    title: "Street Food Marathon",
    description:
      "Try 5 popular street foods in Dhaka this month and share your experience!",
    icon: <FaPizzaSlice className="text-5xl mb-4" />,
  },
  {
    id: 2,
    title: "Spicy Challenge",
    description:
      "Can you handle the hottest local dishes? Rate and share your spicy adventure.",
    icon: <FaPepperHot className="text-5xl mb-4" />,
  },
  {
    id: 3,
    title: "Sweet Tooth Hunt",
    description:
      "Explore local desserts across your city and post your favorites.",
    icon: <FaIceCream className="text-5xl mb-4" />,
  },
];

const FoodChallenges = () => {
  const [joined, setJoined] = useState({});

  const handleToggle = (id, title) => {
    const isCurrentlyJoined = joined[id];
    const joinChallenge = { ...joined, [id]: !isCurrentlyJoined };
    setJoined(joinChallenge);

    if (!isCurrentlyJoined) {
      toast(`You joined the challenge: ${title}`);
    } else {
      toast(`You left the challenge: ${title}`);
    }
  };

  return (
    <section className="my-16 px-4 md:w-[96%] lg:w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">
        This Month’s Food Challenges
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {challenges.map((challenge) => {
          const isJoined = joined[challenge.id];
          return (
            <div
              key={challenge.id}
              className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {challenge.icon}
              <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
              <p className="text-gray-600 text-sm">{challenge.description}</p>
              <button
                onClick={() => handleToggle(challenge.id, challenge.title)}
                className={`btn btn-sm mt-4 ${
                  isJoined ? "btn-success" : "btn-primary"
                }`}
                onMouseEnter={(e) => {
                  if (isJoined) e.target.innerText = "Unjoin";
                }}
                onMouseLeave={(e) => {
                  if (isJoined) e.target.innerText = "Joined";
                }}
              >
                {isJoined ? "Joined" : "Join Challenge"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FoodChallenges;
