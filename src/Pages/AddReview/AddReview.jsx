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
    const rating = Number(form.rating.value);
    const reviewText = form.review.value;
    const userEmail = user.email;
    const userName = user.name;
    const createdAt = new Date();

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        image: foodImage,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const photoUrl = res.data.data.display_url;

    if (res.data.success) {
      const reviewData = {
        foodName,
        foodImage: photoUrl,
        restaurant,
        location,
        city,
        rating,
        reviewText,
        userEmail,
        userName,
        createdAt,
      };

      try {
        await axios.post("http://localhost:4000/add-review", reviewData);
        toast.success("Review added successfully");
        form.reset();
      } catch (error) {
        toast.error("Failed to add review");
        console.error(error);
      }
    } else {
      toast.error("Image upload failed");
    }
  };
  return (
    <div className="flex justify-center md:justify-around mt-5 px-3 sm:px-6">
      <form
        onSubmit={handleAddReview}
        className="fieldset bg-base-200 shadow-2xl flex flex-col border-base-300 rounded-box w-full max-w-md border p-6 sm:p-8 bg-[#fffaf05e]"
      >
        <legend className="fieldset-legend text-base sm:text-lg font-semibold text-center mb-2">
          Add Your Favourite Restaurant Review
        </legend>

        <label className="label">Food Name</label>
        <input
          type="text"
          name="foodName"
          className="input input-bordered w-full"
          placeholder="Food name"
          required
        />

        <label className="label">Food Image</label>
        <input
          type="file"
          name="foodImage"
          className="input input-bordered w-full"
          required
        />

        <label className="label">Restaurant Name</label>
        <input
          type="text"
          name="restaurant"
          className="input input-bordered w-full"
          placeholder="Restaurant name"
          required
        />

        <label className="label">Address</label>
        <input
          type="text"
          name="location"
          className="input input-bordered w-full"
          placeholder="Full address"
          required
        />

        <label className="label">City</label>
        <select name="city" className="select select-bordered w-full" required>
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

        <label className="label">Star Rating</label>
        <select
          name="rating"
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>
            Select rating
          </option>
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>

        <label className="label">Review</label>
        <textarea
          name="review"
          className="textarea textarea-bordered w-full resize-none"
          placeholder="Write your review"
          required
        ></textarea>

        <button className="btn btn-neutral mt-4 w-full">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
