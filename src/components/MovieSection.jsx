import { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import "./MovieSection.css";

// render từng section phim
export default function MovieSection({
  title,
  movies,
  enableCarousel = true,
  viewAllLink = "#",
}) {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="movie-section">
      {title && (
        <div className="section-header">
          <h2>{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="view-all-link">
              Xem tất cả →
            </Link>
          )}
        </div>
      )}

      <div
        className="movies-container-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {" "}
        {/* Nút scroll trái */}
        {enableCarousel && isHovered && (
          <button className="scroll-btn scroll-btn-left" onClick={scrollLeft}>
            <span>❮</span>
          </button>
        )}
        {/* Container cuộn ngang */}
        <div
          className={`movies-container ${enableCarousel ? "scrollable" : ""}`}
          ref={scrollContainerRef}
        >
          {" "}
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie._id} className="movie-item">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        {/* Nút scroll phải */}
        {enableCarousel && isHovered && (
          <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
            <span>❯</span>
          </button>
        )}
      </div>
    </section>
  );
}
