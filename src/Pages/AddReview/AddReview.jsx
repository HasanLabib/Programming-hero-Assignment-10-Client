// import React, { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthContext";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AddReview = () => {
//   const { user } = useContext(AuthContext);

//   const handleAddReview = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const foodName = form.foodName.value;
//     const foodImage = form.foodImage.files[0];
//     const restaurant = form.restaurant.value;
//     const location = form.location.value.toUpperCase();
//     const city = form.city.value;
//     const category = form.category.value;
//     const rating = Number(form.rating.value);
//     const reviewText = form.review.value;

//     const reviewDataBase = {
//       foodName,
//       restaurant,
//       location,
//       city,
//       category,
//       rating,
//       reviewText,
//       userEmail: user.email,
//       userName: user.displayName,
//       createdAt: new Date(),
//     };

//     try {
//       const imgRes = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         { image: foodImage },
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (!imgRes.data.success) {
//         toast.error("Image upload failed");
//         return;
//       }

//       reviewDataBase.foodImage = imgRes.data.data.display_url;

//       await axios.post(
//         "https://programming-hero-assignment-10-serv.vercel.app/add-review",
//         reviewDataBase
//       );

//       toast.success("Review added successfully 🎉");
//       form.reset();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add review");
//     }
//   };

  

//   return (
//     <div className="flex justify-center mt-6 px-4">
//       <form
//         onSubmit={handleAddReview}
//         className="bg-base-200 shadow-xl rounded-lg w-full max-w-md p-6"
//       >
//         <h2 className="text-xl font-bold text-center mb-4">
//           Add Food Review 🍽️
//         </h2>
//         <label className="label">Food Name</label>
//         <input
//           type="text"
//           name="foodName"
//           className="input input-bordered w-full mb-3"
//           placeholder="Food name"
//           required
//         />

//         <label className="label">Food Image</label>
//         <input
//           type="file"
//           name="foodImage"
//           className="input input-bordered w-full mb-3"
//           required
//         />

//         <label className="label">Restaurant Name</label>
//         <input
//           type="text"
//           name="restaurant"
//           className="input input-bordered w-full mb-3"
//           placeholder="Restaurant name"
//           required
//         />

//         <label className="label">Address</label>
//         <input
//           type="text"
//           name="location"
//           className="input input-bordered w-full mb-3"
//           placeholder="Full address"
//           required
//         />

//         <label className="label">City</label>
//         <select name="city" className="select select-bordered w-full mb-3" required>
//           <option value="" disabled>
//             Select city
//           </option>
//           <option value="Dhaka">Dhaka</option>
//           <option value="Gazipur">Gazipur</option>
//           <option value="Narayanganj">Narayanganj</option>
//           <option value="Narsingdi">Narsingdi</option>
//           <option value="Tangail">Tangail</option>
//           <option value="Faridpur">Faridpur</option>
//           <option value="Madaripur">Madaripur</option>
//           <option value="Gopalganj">Gopalganj</option>
//           <option value="Manikganj">Manikganj</option>
//           <option value="Munshiganj">Munshiganj</option>
//           <option value="Rajbari">Rajbari</option>
//           <option value="Shariatpur">Shariatpur</option>
//           <option value="Kishoreganj">Kishoreganj</option>
//           <option value="Chattogram">Chattogram</option>
//           <option value="Coxs Bazar">Cox’s Bazar</option>
//           <option value="Cumilla">Cumilla</option>
//           <option value="Feni">Feni</option>
//           <option value="Noakhali">Noakhali</option>
//           <option value="Lakshmipur">Lakshmipur</option>
//           <option value="Chandpur">Chandpur</option>
//           <option value="Brahmanbaria">Brahmanbaria</option>
//           <option value="Khagrachhari">Khagrachhari</option>
//           <option value="Rangamati">Rangamati</option>
//           <option value="Bandarban">Bandarban</option>
//           <option value="Khulna">Khulna</option>
//           <option value="Jessore">Jessore</option>
//           <option value="Satkhira">Satkhira</option>
//           <option value="Bagerhat">Bagerhat</option>
//           <option value="Narail">Narail</option>
//           <option value="Jhenaidah">Jhenaidah</option>
//           <option value="Magura">Magura</option>
//           <option value="Chuadanga">Chuadanga</option>
//           <option value="Meherpur">Meherpur</option>
//           <option value="Rajshahi">Rajshahi</option>
//           <option value="Bogura">Bogura</option>
//           <option value="Pabna">Pabna</option>
//           <option value="Natore">Natore</option>
//           <option value="Naogaon">Naogaon</option>
//           <option value="Chapainawabganj">Chapainawabganj</option>
//           <option value="Joypurhat">Joypurhat</option>
//           <option value="Sirajganj">Sirajganj</option>
//           <option value="Sylhet">Sylhet</option>
//           <option value="Moulvibazar">Moulvibazar</option>
//           <option value="Habiganj">Habiganj</option>
//           <option value="Sunamganj">Sunamganj</option>
//           <option value="Barishal">Barishal</option>
//           <option value="Bhola">Bhola</option>
//           <option value="Patuakhali">Patuakhali</option>
//           <option value="Pirojpur">Pirojpur</option>
//           <option value="Jhalokathi">Jhalokathi</option>
//           <option value="Barguna">Barguna</option>
//           <option value="Rangpur">Rangpur</option>
//           <option value="Dinajpur">Dinajpur</option>
//           <option value="Kurigram">Kurigram</option>
//           <option value="Gaibandha">Gaibandha</option>
//           <option value="Nilphamari">Nilphamari</option>
//           <option value="Lalmonirhat">Lalmonirhat</option>
//           <option value="Panchagarh">Panchagarh</option>
//           <option value="Thakurgaon">Thakurgaon</option>
//           <option value="Mymensingh">Mymensingh</option>
//           <option value="Jamalpur">Jamalpur</option>
//           <option value="Netrokona">Netrokona</option>
//           <option value="Sherpur">Sherpur</option>
//         </select>

//         <label className="label">Category</label>
//         <select
//           name="category"
//           className="select select-bordered w-full mb-3"
//           required
//         >
//           <option value="" disabled>
//             Select category
//           </option>
//           <option value="Street Food">Street Food 🍢</option>
//           <option value="Restaurants">Restaurants 🍽️</option>
//         </select>

//         <label className="label">Star Rating</label>
//         <select
//           name="rating"
//           className="select select-bordered w-full mb-3"
//           required
//         >
//           <option value="" disabled>
//             Select rating
//           </option>
//           <option value="5">★★★★★ (5)</option>
//           <option value="4">★★★★☆ (4)</option>
//           <option value="3">★★★☆☆ (3)</option>
//           <option value="2">★★☆☆☆ (2)</option>
//           <option value="1">★☆☆☆☆ (1)</option>
//         </select>

//         <label className="label">Review</label>
//         <textarea
//           name="review"
//           className="textarea textarea-bordered w-full resize-none mb-3"
//           placeholder="Write your review"
//           required
//         ></textarea>

//         <button className="btn btn-neutral w-full">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default AddReview;


import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddReview = () => {
  const { user } = useContext(AuthContext);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;

    const foodName = form.foodName.value;
    const foodImage = form.foodImage.files[0];
    const restaurant = form.restaurant.value;
    const location = form.location.value.toUpperCase();
    const city = form.city.value;
    const category = form.category.value;
    const rating = Number(form.rating.value);
    const overview = form.overview.value;
    const reviewText = form.review.value;

    const priceRange = form.priceRange.value;
    const spiceLevel = form.spiceLevel.value;
    const hygiene = form.hygiene.value;
    const seating = form.seating.value;
    const bestTimeToEat = form.bestTime.value;

    const relatedFoods = form.relatedFoods.value
      .split(",")
      .map((item) => item.trim());

    const reviewDataBase = {
      foodName,
      restaurant,
      location,
      city,
      category,
      rating,
      overview,
      reviewText,
      keyInfo: {
        priceRange,
        spiceLevel,
        hygiene,
        seating,
        bestTimeToEat,
      },
      relatedFoods,
      media: [],
      userEmail: user.email,
      userName: user.displayName,
      createdAt: new Date(),
      isPublic: true,
    };

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        { image: foodImage },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!imgRes.data.success) {
        toast.error("Image upload failed");
        return;
      }

      reviewDataBase.foodImage = imgRes.data.data.display_url;
      reviewDataBase.media = [imgRes.data.data.display_url];

      await axios.post(
        "https://programming-hero-assignment-10-serv.vercel.app/add-review",
        reviewDataBase
      );

      toast.success("Review added successfully 🎉");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add review");
    }
  };

  return (
    <div className="flex justify-center mt-6 px-4">
      <form
        onSubmit={handleAddReview}
        className="bg-base-200 shadow-xl rounded-lg w-full max-w-md p-6"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          Add Food Review 🍽️
        </h2>

        <label className="label">Food Name</label>
        <input
          type="text"
          name="foodName"
          className="input input-bordered w-full mb-3"
          required
        />

        <label className="label">Food Image</label>
        <input
          type="file"
          name="foodImage"
          className="input input-bordered w-full mb-3"
          required
        />

        <label className="label">Restaurant Name</label>
        <input
          type="text"
          name="restaurant"
          className="input input-bordered w-full mb-3"
          required
        />

        <label className="label">Address</label>
        <input
          type="text"
          name="location"
          className="input input-bordered w-full mb-3"
          required
        />

        <label className="label">City</label>
        <select name="city" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>
            Select city
          </option>
          <option value="Dhaka">Dhaka</option>
          <option value="Gazipur">Gazipur</option>
          <option value="Narayanganj">Narayanganj</option>
          <option value="Narsingdi">Narsingdi</option>
          <option value="Tangail">Tangail</option>
          <option value="Faridpur">Faridpur</option>
          <option value="Madaripur">Madaripur</option>
          <option value="Gopalganj">Gopalganj</option>
          <option value="Manikganj">Manikganj</option>
          <option value="Munshiganj">Munshiganj</option>
          <option value="Rajbari">Rajbari</option>
          <option value="Shariatpur">Shariatpur</option>
          <option value="Kishoreganj">Kishoreganj</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Coxs Bazar">Cox’s Bazar</option>
          <option value="Cumilla">Cumilla</option>
          <option value="Feni">Feni</option>
          <option value="Noakhali">Noakhali</option>
          <option value="Lakshmipur">Lakshmipur</option>
          <option value="Chandpur">Chandpur</option>
          <option value="Brahmanbaria">Brahmanbaria</option>
          <option value="Khagrachhari">Khagrachhari</option>
          <option value="Rangamati">Rangamati</option>
          <option value="Bandarban">Bandarban</option>
          <option value="Khulna">Khulna</option>
          <option value="Jessore">Jessore</option>
          <option value="Satkhira">Satkhira</option>
          <option value="Bagerhat">Bagerhat</option>
          <option value="Narail">Narail</option>
          <option value="Jhenaidah">Jhenaidah</option>
          <option value="Magura">Magura</option>
          <option value="Chuadanga">Chuadanga</option>
          <option value="Meherpur">Meherpur</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Bogura">Bogura</option>
          <option value="Pabna">Pabna</option>
          <option value="Natore">Natore</option>
          <option value="Naogaon">Naogaon</option>
          <option value="Chapainawabganj">Chapainawabganj</option>
          <option value="Joypurhat">Joypurhat</option>
          <option value="Sirajganj">Sirajganj</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Moulvibazar">Moulvibazar</option>
          <option value="Habiganj">Habiganj</option>
          <option value="Sunamganj">Sunamganj</option>
          <option value="Barishal">Barishal</option>
          <option value="Bhola">Bhola</option>
          <option value="Patuakhali">Patuakhali</option>
          <option value="Pirojpur">Pirojpur</option>
          <option value="Jhalokathi">Jhalokathi</option>
          <option value="Barguna">Barguna</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Dinajpur">Dinajpur</option>
          <option value="Kurigram">Kurigram</option>
          <option value="Gaibandha">Gaibandha</option>
          <option value="Nilphamari">Nilphamari</option>
          <option value="Lalmonirhat">Lalmonirhat</option>
          <option value="Panchagarh">Panchagarh</option>
          <option value="Thakurgaon">Thakurgaon</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Jamalpur">Jamalpur</option>
          <option value="Netrokona">Netrokona</option>
          <option value="Sherpur">Sherpur</option>
        </select>

        <label className="label">Category</label>
        <select name="category" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select category</option>
          <option value="Street Food">Street Food 🍢</option>
          <option value="Restaurant">Restaurant 🍽️</option>
        </select>

        <label className="label">Star Rating</label>
        <select name="rating" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select rating</option>
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>

        <label className="label">Overview</label>
        <textarea
          name="overview"
          className="textarea textarea-bordered w-full mb-3"
          required
        ></textarea>

        <label className="label">Review</label>
        <textarea
          name="review"
          className="textarea textarea-bordered w-full mb-3"
          required
        ></textarea>

        <label className="label">Price Range</label>
        <select name="priceRange" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select price range</option>
          <option>৳50 – ৳100</option>
          <option>৳100 – ৳200</option>
          <option>৳200 – ৳400</option>
          <option>৳400 - ৳500</option>
          <option>৳500+</option>
        </select>

        <label className="label">Spice Level</label>
        <select name="spiceLevel" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select spice level</option>
          <option>Mild</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label className="label">Hygiene</label>
        <select name="hygiene" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select hygiene</option>
          <option>Poor</option>
          <option>Average</option>
          <option>Good</option>
          <option>Excellent</option>
        </select>

        <label className="label">Seating</label>
        <select name="seating" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select seating</option>
          <option>Indoor</option>
          <option>Outdoor</option>
          <option>Both</option>
        </select>

        <label className="label">Best Time To Eat</label>
        <select name="bestTime" className="select select-bordered w-full mb-3" required>
          <option value="" disabled>Select time</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Late Night</option>
        </select>

        <label className="label">Related Foods (comma separated)</label>
        <input
          type="text"
          name="relatedFoods"
          className="input input-bordered w-full mb-4"
        />

        <button className="btn btn-neutral w-full">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
