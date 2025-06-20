import MovieCard from "./MovieCard";

// render từng section phim
export default function MovieSection({ title, movies, emptyMessage }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h1>{title}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {movies.length === 0 ? (
          <p>{emptyMessage}</p>
        ) : (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        )}
      </div>
    </div>
  );
}
