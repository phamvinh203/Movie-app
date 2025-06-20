export default function LocalSearch({
  searchKeyword,
  setSearchKeyword,
  placeholder,
  totalCount,
  filteredCount,
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "0.75rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
      {searchKeyword && (
        <p style={{ marginTop: "0.5rem", color: "#666" }}>
          Hiển thị {filteredCount} / {totalCount} phim
        </p>
      )}
    </div>
  );
}
