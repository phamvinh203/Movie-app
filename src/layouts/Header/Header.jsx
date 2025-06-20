import { Link } from "react-router-dom";
import TYPES from "../../constants/movieTypes";
import Search from "../../components/Search";

function Header() {
  return (
    <nav>
      <Link to="/">🏠 Trang chủ</Link>
      <Search />
      {TYPES.map((item) => (
        <Link key={item.value} to={`/phim/${item.value}`}>
          {item.label}
        </Link>
      ))}
      <Link to="/the-loai">Thể loại</Link>
    </nav>
  );
}
export default Header;
