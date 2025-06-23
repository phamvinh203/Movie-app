import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import useMovie from "../../hooks/useMovie";

import MovieSection from "../../components/MovieSection";
import "./Movies.scss";
import "./Movies.css";

export default function Movies() {
  const { type } = useParams(); // Lấy type từ URL params
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, totalPages, titlePage } = useMovie({
    type,
    limit: 24,
    page: currentPage,
  });

  console.log("Current type_list:", type);
  if (loading) {
    return (
      <div className="movies-page">
        <div className="movies-loading">
          <div className="movies-loading-spinner"></div>
          <div className="movies-loading-text">Đang tải {type}...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-page">
        <div className="movies-error">
          <div className="movies-error-icon">⚠️</div>
          <div className="movies-error-title">Có lỗi xảy ra</div>
          <div className="movies-error-message">{error.message}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1 className="movies-title">
          Danh sách {titlePage}
        </h1>
      </div>
      {/* Movies Grid */}
      <MovieSection
        title=""
        movies={movies}
        enableCarousel={false}
        viewAllLink=""
      />
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
