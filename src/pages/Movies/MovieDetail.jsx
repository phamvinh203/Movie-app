import { useParams } from "react-router-dom";
import useMovieDetail from "../../hooks/useMovieDetail";
import "./MovieDetail.css";

export default function MovieDetail() {
  const { slug } = useParams();
  const { movie, loading, error } = useMovieDetail(slug);

  const handleWatchEpisode = (episode) => {
    console.log("Opening episode in new tab:", episode);
    console.log("Episode URL:", episode.link_embed);

    if (!episode.link_embed) {
      alert("Link video không hợp lệ");
      return;
    }

    window.open(episode.link_embed, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="loading-state">
        <p>Đang tải thông tin phim...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Lỗi: {error.message}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="not-found-state">
        <p>Không tìm thấy phim.</p>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div className="movie-header">
        <div className="movie-poster">
          <img src={movie.poster_url} alt={movie.name} />
        </div>

        <div className="movie-info">
          <h1 className="movie-title">{movie.name}</h1>

          <div className="movie-meta">
            {movie.year && (
              <div className="meta-item">
                <span>Năm: {movie.year}</span>
              </div>
            )}
            {movie.time && (
              <div className="meta-item">
                <span>Thời lượng: {movie.time}</span>
              </div>
            )}
            {movie.episode_current && (
              <div className="meta-item">
                <span>{movie.episode_current}</span>
              </div>
            )}
            {movie.quality && (
              <div className="meta-item">
                <span>Chất lượng: {movie.quality}</span>
              </div>
            )}
            {movie.lang && (
              <div className="meta-item">
                <span>Ngôn ngữ: {movie.lang}</span>
              </div>
            )}
          </div>

          {movie.content && (
            <div className="movie-description">
              <p>{movie.content}</p>
            </div>
          )}
        </div>
      </div>

      {/* Danh sách tập phim */}
      {movie.episodes?.length > 0 &&
        movie.episodes[0]?.server_data?.length > 0 && (
          <div className="episodes-section">
            <h3 className="episodes-title">
              Danh sách tập ({movie.episodes[0].server_data.length} tập) - Nhấn để xem
            </h3>
            <div className="episodes-grid">
              {movie.episodes[0].server_data.map((ep, idx) => (
                <button
                  key={idx}
                  className="episode-btn"
                  onClick={() => handleWatchEpisode(ep)}
                  title={`Xem ${ep.name} trong tab mới`}
                >
                  <span className="episode-name">{ep.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}