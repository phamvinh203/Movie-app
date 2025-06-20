import { useEffect, useState } from "react";
import movieApi from "../services/movieApi";

export default function useMovie({
  type,
  page = 1,
  limit = 12,
  isNew = false,
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

        console.log("useMovie params:", { type, page, limit, isNew });

        let res;
        let rawMovies;
        if (isNew) {
          res = await movieApi.getNewMovies(page, limit);
          rawMovies = res?.items || [];
        } else {
          res = await movieApi.getMoviesWithFilter({
            type_list: type,
            page: page,
            limit,
          });
          rawMovies = res?.data?.items || [];
        }

        console.log("API response items count:", rawMovies.length);

        const imgUrl = rawMovies.map((item) => {
          return {
            ...item,
            poster_url: getFullImageUrl(item.poster_url),
            thumb_url: getFullImageUrl(item.thumb_url),
          };
        });
        setMovies(imgUrl);
        setCurrentPage(page);
        setTotalPages(res.data.params.pagination.totalPages || 1);
      } catch (err) {
        console.error("Lỗi khi fetch movie:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [type, page, isNew, limit]);

  return { movies, loading, error, currentPage, setCurrentPage, totalPages };
}
