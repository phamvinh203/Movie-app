import { useEffect, useState } from "react";
import movieApi from "../services/movieApi";

export default function useSearch(keyword) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("upload/")) return `https://phimimg.com/${url}`;
    return url;
  };

  useEffect(() => {
    if (!keyword || keyword.trim() === "") {
      setMovies([]);
      setLoading(false);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await movieApi.getSearchMovies(keyword.trim());
        const rawMovies = res?.data?.items || [];

        const moviesWithFullImageUrl = rawMovies.map((item) => ({
          ...item,
          poster_url: getFullImageUrl(item.poster_url),
          thumb_url: getFullImageUrl(item.thumb_url),
        }));

        setMovies(moviesWithFullImageUrl);
      } catch (err) {
        console.error("Lỗi khi search movie:", err);
        setError(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [keyword]);

  return { movies, loading, error };
}
