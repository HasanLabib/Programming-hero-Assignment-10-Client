import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";

const EditReview = () => {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchReview = () => {
      axios
        .get(
          `https://programming-hero-assignment-10-serv.vercel.app/reviews/${id}`
        )
        .then((res) => setReview(res.data))
        .finally(() => setLoading(false));
    };
    fetchReview();
  }, [id]);

  const handleEditReview = async (e) => {
    e.preventDefault();
    const form = e.target;

    let updatedImage = review.foodImage;

    if (form.foodImage.files.length > 0) {
      try {
        const formData = new FormData();
        formData.append("image", form.foodImage.files[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          formData
        );

        updatedImage = imgRes.data.data.display_url;
      } catch {
        toast.error("Image upload failed");
        return;
      }
    }

    const updatedReview = {
      foodName: form.foodName.value,
      foodImage: updatedImage,
      restaurant: form.restaurant.value,
      location: form.location.value,
      city: form.city.value,
      category: form.category.value,
      rating: Number(form.rating.value),
      reviewText: form.reviewText.value,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      await axios.put(
        `https://programming-hero-assignment-10-serv.vercel.app/reviews/${id}`,
        updatedReview
      );

      toast.success("Review updated successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update review");
    }
  };

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-6 px-4">
      <form
        onSubmit={handleEditReview}
        className="bg-base-200 shadow-xl rounded-lg w-full max-w-md p-6 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Edit Your Review ✏️</h2>

        <input
          name="foodName"
          defaultValue={review.foodName}
          className="input input-bordered w-full"
          placeholder="Food Name"
          required
        />

        <input
          type="file"
          name="foodImage"
          className="file-input file-input-bordered w-full"
        />

        <input
          name="restaurant"
          defaultValue={review.restaurant}
          className="input input-bordered w-full"
          placeholder="Restaurant Name"
          required
        />

        <input
          name="location"
          defaultValue={review.location}
          className="input input-bordered w-full"
          placeholder="Address / Area"
          required
        />

        <label className="label">City</label>
        <select
          name="city"
          className="select select-bordered w-full"
          defaultValue={review.city}
          required
        >
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

        <select
          name="category"
          defaultValue={review.category}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Street Food">Street Food 🍢</option>
          <option value="Restaurant">Restaurant 🍽️</option>
          <option value="Home-Cooked">Home-Cooked 🏠</option>
        </select>

        <select
          name="rating"
          defaultValue={review.rating}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>
            Rating
          </option>
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>

        <textarea
          name="reviewText"
          defaultValue={review.reviewText}
          className="textarea textarea-bordered w-full"
          placeholder="Your Review"
          required
        />

        <button className="btn btn-neutral w-full">Update Review</button>
      </form>
    </div>
  );
};

export default EditReview;
