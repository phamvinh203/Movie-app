// hooks/useCategoryDetail.jsx
import { useState, useEffect } from "react";
import movieApi from "../services/movieApi";

export default function useCategoryDetail({
  slug,
  page = 1,
  limit = 24,
  sortField = "_id",
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [titlePage, setTitlePage] = useState("");

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("upload/")) return `https://phimimg.com/${url}`;
    return url;
  };

  useEffect(() => {
    if (!slug) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await movieApi.getCategoryDetail(slug, page, limit);

        const rawMovies = res?.data?.items || [];

        const imgUrl = rawMovies.map((item) => ({
          ...item,
          poster_url: getFullImageUrl(item.poster_url),
          thumb_url: getFullImageUrl(item.thumb_url),
        }));
        setMovies(imgUrl);

        if (res.data?.titlePage) {
          setTitlePage(res.data.titlePage);
        }

        const pagination = res.data.params?.pagination?.totalPages || 1;
        setTotalPages(pagination);
      } catch (err) {
        console.error("Lỗi khi fetch phim theo thể loại:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug, page, limit, sortField]);

  return { movies, loading, error, totalPages, titlePage };
}
