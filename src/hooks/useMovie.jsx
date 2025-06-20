import { useEffect, useState } from "react";
import movieApi from "../services/movieApi";

export default function useMovie({
  type,
  page = 1,
  isNew = false,
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("upload/")) return `https://phimimg.com/${url}`;
    return url;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let res;
        let rawMovies = [];
        if (isNew) {
          res = await movieApi.getNewMovies(page);
          rawMovies = res?.items || [];
        } else {
          res = await movieApi.getMoviesWithFilter({ type_list: type, page });
          rawMovies = res?.data?.items || [];
        }

        const imgUrl = rawMovies.map((item) => {
          return {
            ...item,
            poster_url: getFullImageUrl(item.poster_url),
            thumb_url: getFullImageUrl(item.thumb_url),
          };
        });

        setMovies(imgUrl);

      } catch (err) {
        console.error("Lỗi khi fetch movie:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type, page, isNew]);

  return { movies, loading, error };
}
