import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import MovieCard from "../components/MovieCard";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { movies, loading, error } = useSearch(keyword);

  if (!keyword) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Tìm kiếm phim</h1>
        <p>Vui lòng sử dụng thanh tìm kiếm ở trên để tìm phim.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Kết quả tìm kiếm</h1>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Từ khóa: <strong>"{keyword}"</strong>
      </p>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Đang tìm kiếm "{keyword}"...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "red",
          }}
        >
          <p>Lỗi khi tìm kiếm: {error.message}</p>
        </div>
      )}

      {/* No results */}
      {!loading && movies.length === 0 && !error && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Không tìm thấy phim nào với từ khóa "{keyword}"</p>
          <p style={{ color: "#666" }}>Hãy thử tìm kiếm với từ khóa khác.</p>
        </div>
      )}

      {/* Results */}
      {!loading && movies.length > 0 && (
        <div>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            Tìm thấy <strong>{movies.length}</strong> kết quả
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
