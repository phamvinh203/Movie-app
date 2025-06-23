import { useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import MovieCard from "../../components/MovieCard";
import "./SearchResult.css";
import { useState, useEffect } from "react";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = searchParams.get("keyword") || "";
  const { movies, loading, error, totalPages, totalItems } = useSearch(
    keyword,
    currentPage
  );

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (!keyword) {
    return (
      <div className="search-container">
        <div className="search-empty-state">
          <div className="empty-icon">🔍</div>
          <h1 className="empty-title">Tìm kiếm phim</h1>
          <p className="empty-description">
            Vui lòng sử dụng thanh tìm kiếm ở trên để tìm phim yêu thích của
            bạn.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="search-page">
      {/* Header Section */}
      <div className="search-header">
        <h1 className="search-title">Kết quả tìm kiếm</h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <div className="loading-content">
            <h3>Đang tìm kiếm...</h3>
            <p>Đang tìm kiếm phim với từ khóa "{keyword}"</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="search-error">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <h3>Có lỗi xảy ra</h3>
            <p>Lỗi khi tìm kiếm: {error.message}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && movies.length === 0 && !error && (
        <div className="search-no-results">
          <div className="no-results-icon">😔</div>
          <div className="no-results-content">
            <h3>Không tìm thấy kết quả</h3>
            <p>Không tìm thấy phim nào với từ khóa "{keyword}"</p>
            <p className="suggestion">
              Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả.
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && movies.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <div className="search-keyword-container">
              <span className="keyword-label">Từ khóa:</span>
              <span className="keyword-value">"{keyword}"</span>
            </div>{" "}
            <div className="results-count">
              <span className="count-number">{totalItems}</span>
              <span className="count-text"> kết quả được tìm thấy</span>
            </div>
          </div>
          <div className="results-grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {keyword && totalPages > 1 && (
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
          </span>{" "}
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
