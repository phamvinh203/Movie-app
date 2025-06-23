import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import "./Categories.css";

export default function Categories() {
  const { categories, loading, error } = useCategories();

  if (loading) return <p className="categories-loading"> Đang tải danh sách thể loại...</p>;
  if (error) return <p className="categories-error"> Lỗi: {error.message}</p>;


  return (
    <div className="categories-container">
      <h1>🎬 Danh sách thể loại</h1>
      <ul className="category-list">
        {categories.map((item) => (
          <li key={item.slug}>
            <Link to={`/the-loai/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
