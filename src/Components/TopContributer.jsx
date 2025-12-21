import React from "react";

const contributors = [
  {
    name: "Sarah Khan",
    reviews: 12,
    city: "Dhaka",
    avatar: "https://i.pravatar.cc/150?img=32",
    contribution:
      "Shares honest reviews of local street foods, helping others discover hidden gems.",
  },
  {
    name: "Rafi Ahmed",
    reviews: 8,
    city: "Chittagong",
    avatar: "https://i.pravatar.cc/150?img=33",
    contribution:
      "Posts detailed restaurant reviews and food photos, making it easier to choose the best dishes.",
  },
  {
    name: "Mina Rahman",
    reviews: 15,
    city: "Sylhet",
    avatar: "https://i.pravatar.cc/150?img=34",
    contribution:
      "Helps the community by rating local eateries and sharing tips for must-try meals.",
  },
];

const TopContributors = () => {
  return (
    <div className="bg-slate-200 py-8">
      <section className="my-12 px-4  py-8 rounded-lg md:w-[96%] lg:w-11/12 mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-6">
          Meet Our Food Enthusiasts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contributors.map((user, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg p-4 flex flex-col items-center text-center"
            >
              <div className="avatar mb-3">
                <div className="w-24 rounded-full">
                  <img src={user.avatar} alt={user.name} />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <div className="card-actions justify-around mt-3">
                <div className="badge badge-outline text-gray-500">
                  {user.city}
                </div>
                <div className="badge badge-outline text-gray-500 ">
                  Num of Reviews: {user.reviews}{" "}
                </div>
              </div>
              <p className="mt-2 text-gray-600 text-sm italic border-l-2 border-gray-500 pl-3">
                “{user.contribution}”
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopContributors;
