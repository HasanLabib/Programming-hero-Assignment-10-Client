import axios from "axios";
import { useEffect, useState } from "react";

const useReviewHook = () => {
  const [review, setReview] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const result = await axios.get("https://programming-hero-assignment-10-serv.vercel.app/reviews");

        setReview(result.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, []);
  return { review, error, loading };
};

export default useReviewHook;
