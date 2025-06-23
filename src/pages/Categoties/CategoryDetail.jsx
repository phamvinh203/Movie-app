import { useParams } from "react-router-dom";
import { useState } from "react";
import MovieCard from "../../components/MovieCard";
import useCategoryDetail from "../../hooks/useCategoryDetail";
import "./CategoryDetail.css";

export default function CategoryDetail() {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, totalPages, titlePage } = useCategoryDetail({
    slug,
    page: currentPage,
    limit: 24,
  });
  return (
    <div className="category-detail">
      <h1 className="category-title"> Thể loại: {titlePage}</h1>

      {loading && <p className="loading-message">Đang tải phim...</p>}
      {error && <p className="error-message">Lỗi: {error.message}</p>}

      {!loading && !error && (
        <div className="movie-list">
          {movies.length === 0 ? (
            <p className="no-movies-message">
              Không có phim nào thuộc thể loại này.
            </p>
          ) : (
            movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
          )}
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹ Trang trước
          </button>

          <span className="pagination-info">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Trang sau ›
          </button>
        </div>
      )}
    </div>
  );
}
