import { Link } from "react-router-dom";
import "./MovieCard.css"; 

// Function to decode HTML entities
const decodeHtmlEntities = (str) => {
  if (!str) return str;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

export default function MovieCard({ movie }) {
  return (
    <Link to={`/phim/${movie.slug}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster_url} alt={movie.name} loading="lazy" />

        {/* Góc trên trái & phải */}
        <div className="top-badges">
          {movie.quality && <span className="badge left">{movie.quality}</span>}
          {movie.episode_current && (
            <span className="badge right"> {movie.episode_current}</span>
          )}
        </div>

        {/* Nút xem phim khi hover */}
        <div className="play-button">
          <span>▶</span>
        </div>        <div className="movie-info">
          <h3 className="movie-title">{decodeHtmlEntities(movie.name)}</h3>
          <h4 className="movie-origin-title">{decodeHtmlEntities(movie.origin_name)}</h4>
          <div className="meta">
            <span>{movie.year}</span>
            <span>{movie.lang}</span>
          </div>
          <div className="categories">
            {movie.category.slice(0, 2).map((cat, idx) => (
              <span key={idx} className="category-badge">
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
