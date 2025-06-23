import useMovie from "../hooks/useMovie";
import MovieSection from "../components/MovieSection";
import TYPES from "../constants/movieTypes";
import "./Home.css"; 

export default function Home() {
  // Phim mới cập nhật
  const { movies: newMovies, loading: loadingNew } = useMovie({
    isNew: true,
    page: 1,
    limit: 12,
  });

  // Lấy phim theo từng type từ movieTypes
  const movieSections = TYPES.map((type) => {
    const { movies, loading } = useMovie({
      type: type.value,
      page: 1,
      limit: 12,
    });
    return { ...type, movies, loading };
  });

  // Kiểm tra loading
  const isLoading =
    loadingNew || movieSections.some((section) => section.loading);
  if (isLoading)
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Đang tải phim...</p>
    </div>
  );

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">🎬 Xem Phim Online Miễn Phí</h1>
            <p className="hero-subtitle">
              Khám phá hàng ngàn bộ phim hấp dẫn với chất lượng HD
            </p>
          </div>
        </section>
        {/* Section phim mới */}
        <MovieSection
          title="🎬 Phim mới cập nhật"
          movies={newMovies.slice(0, 12)}
          emptyMessage="Không có phim mới"
          showViewAll={true}
          viewAllLink="/"
        />

        {/* Dynamic sections từ movieTypes */}
        {movieSections.map((section) => (
          <MovieSection
            key={section.value}
            title={`🎞️ ${section.label}`}
            movies={section.movies}
            emptyMessage={`Không có ${section.label.toLowerCase()}`}
            showViewAll={true}
            viewAllLink={`/${section.value}`}
          />
        ))}
      </div>
    </div>
  );
}
