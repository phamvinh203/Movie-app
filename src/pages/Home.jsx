import useMovie from "../hooks/useMovie";
import MovieSection from "../components/MovieSection";
import TYPES from "../constants/movieTypes";

export default function Home() {
  // Phim mới cập nhật
  const { movies: newMovies, loading: loadingNew } = useMovie({ isNew: true, limit: 12 });

  // Lấy phim theo từng type từ movieTypes
  const movieSections = TYPES.map((type) => {
    const { movies, loading } = useMovie({ type: type.value, page: 1, limit: 12 });
    return { ...type, movies, loading };
  });

  // Kiểm tra loading
  const isLoading =
    loadingNew || movieSections.some((section) => section.loading);
  if (isLoading) return <p>Đang tải phim...</p>;

  return (
    <div>
      {/* Section phim mới */}
      <MovieSection
        title="🎬 Phim mới cập nhật"
        movies={newMovies}
        emptyMessage="Không có phim mới"
      />

      {/* Dynamic sections từ movieTypes */}
      {movieSections.map((section) => (
        <MovieSection
          key={section.value}
          title={`🎞️ ${section.label}`}
          movies={section.movies}
          emptyMessage={`Không có ${section.label.toLowerCase()}`}
        />
      ))}
    </div>
  );
}
