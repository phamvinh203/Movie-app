import { Link } from "react-router-dom";
import TYPES from "../../constants/movieTypes";
import Search from "../../components/Search";
import "./Header.css";

function Header() {
  return (
    <nav>
      <Link to="/">Movie App</Link>
      <Search />
      {TYPES.map((item) => (
        <Link key={item.value} to={`/${item.value}`}>
          {item.label}
        </Link>
      ))}
      <Link to="/the-loai">Thể loại</Link>
    </nav>
  );
}
export default Header;
