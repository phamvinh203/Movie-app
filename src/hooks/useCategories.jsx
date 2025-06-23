import { useEffect, useState } from "react";
import movieApi from "../services/movieApi";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await movieApi.getMovieCategories();
            setCategories(res || []);

        } catch (err) {
            console.error("Error fetching categories:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
