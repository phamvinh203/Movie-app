import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Điều hướng đến trang kết quả tìm kiếm
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          minWidth: "200px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🔍
      </button>
    </form>
  );
}
