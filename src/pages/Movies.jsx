import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import useMovie from "../hooks/useMovie";
import LocalSearch from "../components/LocalSearch";
import MovieSection from "../components/MovieSection";
import "./Movies.scss";

export default function Movies() {
  const { type } = useParams(); // Lấy type từ URL params
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, totalPages } = useMovie({
    type,
    limit: 24,
    page: currentPage,
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  // Filter movies based on search keyword
  const filteredMovies = useMemo(() => {
    if (!searchKeyword.trim()) return movies;

    return movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        movie.origin_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [movies, searchKeyword]);

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
          Danh sách {type} ({movies.length})
        </h1>
        <p className="movies-subtitle">
          Type list hiện tại: <span className="movies-type-info">{type}</span>
        </p>
      </div>
      {/* Search component */}
      <div className="movies-search-section">
        <LocalSearch
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder={`Tìm kiếm trong ${type}...`}
          totalCount={movies.length}
          filteredCount={filteredMovies.length}
        />
      </div>{" "}
      {/* Movies Grid */}
      {filteredMovies.length === 0 && searchKeyword ? (
        <div className="movies-empty">
          <div className="movies-empty-icon">🔍</div>
          <div className="movies-empty-title">Không tìm thấy kết quả</div>
          <div className="movies-empty-message">
            Không tìm thấy phim nào với từ khóa{" "}
            <span className="movies-empty-keyword">"{searchKeyword}"</span>
            <br />
            Hãy thử từ khóa khác.
          </div>
        </div>
      ) : (
        <MovieSection
          title=""
          movies={filteredMovies}
          enableCarousel={false}
          viewAllLink=""
        />
      )}
      {/* Pagination */}
      {!searchKeyword && totalPages > 1 && (
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
