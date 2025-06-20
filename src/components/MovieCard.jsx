export default function MovieCard({ movie }) {
  return (
    <div style={{ width: "150px" }}>
      <img
        src={movie.poster_url}
        alt={movie.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <p>{movie.name}</p>
      <p>{movie.year}</p>
    </div>
  );
}
