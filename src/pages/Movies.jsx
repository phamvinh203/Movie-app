import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import useMovie from "../hooks/useMovie";
import LocalSearch from "../components/LocalSearch";

export default function Movies() {
  const { type } = useParams(); // Lấy type từ URL params
  const { movies, loading, error } = useMovie({ type });
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

  console.log("Current type_list:", type); // Log để kiểm tra

  if (loading) {
    return <div>Đang tải {type}...</div>;
  }

  if (error) {
    return <div>Lỗi: {error.message}</div>;
  }
  return (
    <div style={{ padding: "1rem" }}>
      <h1>
        Danh sách {type} ({movies.length})
      </h1>{" "}
      <p>
        Type list hiện tại: <strong>{type}</strong>
      </p>
      {/* Search component */}
      <LocalSearch
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder={`Tìm kiếm trong ${type}...`}
        totalCount={movies.length}
        filteredCount={filteredMovies.length}
      />
      <div>
        {filteredMovies.length === 0 && searchKeyword ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#666",
            }}
          >
            <p>Không tìm thấy phim nào với từ khóa "{searchKeyword}"</p>
            <p>Hãy thử từ khóa khác.</p>
          </div>
        ) : (
          filteredMovies.map((movie) => {
            return (
              <div key={movie._id}>
                <h3>{movie.name}</h3>
                <p>Tên gốc: {movie.origin_name}</p>
                <p>
                  Năm: {movie.year} | Chất lượng: {movie.quality}
                </p>{" "}
                {movie.poster_url && (
                  <img
                    src={movie.poster_url}
                    alt={movie.name}
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <p>Ngôn ngữ: {movie.lang}</p>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
