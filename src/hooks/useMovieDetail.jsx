import { useEffect, useState } from "react";
import movieApi from "../services/movieApi";

export default function useMovieDetail(slug) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("upload/")) return `https://phimimg.com/${url}`;
    return url;
  };

  useEffect(() => {
    if (!slug) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await movieApi.getMovieDetail(slug);

        const responseData = result.data || result;
        const movieData = responseData?.movie;
        const episodesData = responseData?.episodes;


        if (movieData) {
          // Xử lý URL hình ảnh và kết hợp với episodes
          const processedMovie = {
            ...movieData,
            poster_url: getFullImageUrl(movieData.poster_url),
            thumb_url: getFullImageUrl(movieData.thumb_url),
            episodes: episodesData || [],
          };
          console.log("Processed Movie:", processedMovie);
          setMovie(processedMovie);
        }
      } catch (err) {
        setError(err);
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slug]);

  return { movie, loading, error };
}



