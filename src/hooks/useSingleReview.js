import { useEffect, useState } from "react";
import axios from "axios";

const useSingleReview = (id) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchReview = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://programming-hero-assignment-10-serv.vercel.app/reviews/${id}`
        );
        setReview(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  return { review, loading, error };
};

export default useSingleReview;
