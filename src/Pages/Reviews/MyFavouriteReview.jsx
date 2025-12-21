import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";

import { ClimbingBoxLoader } from "react-spinners";

const MyFavouriteReview = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:4000/favorites/${user.email}`).then((res) => {
        setReviews(res.data);
        setLoading(false);
      });
    }
  }, [user]);

  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:4000/favorites/${deleteId}?userEmail=${user.email}`
    );

    setReviews(reviews.filter((r) => r._id !== deleteId));
    setDeleteId(null);
  };

  if (reviews.length === 0 && !loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-5">My Favourite Reviews</h2>
        <p className="text-lg mb-4">
          You have not added any favourite review yet.
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-5">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Food Image</th>
              <th>Food Name</th>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Review Text</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{review.foodName}</td>
                <td>{review.restaurant}</td>
                <td>{review.rating}</td>
                <td>{review.reviewText}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setDeleteId(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this review?</p>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn btn-error">
                Confirm
              </button>
              <button onClick={() => setDeleteId(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyFavouriteReview;
