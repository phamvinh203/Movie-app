import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchResult from "../pages/Search/SearchResult";
import Movies from "../pages/Movies/Movies";
import MovieDetail from "../pages/Movies/MovieDetail";
import Categories from "../pages/Categoties/Categories";
import CategoryDetail from "../pages/Categoties/CategoryDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/phim/:slug" element={<MovieDetail />} />
      <Route path="/phim/:slug/:episode" element={<MovieDetail />} />
      <Route path="/:type" element={<Movies />} />
      <Route path="/the-loai" element={<Categories />} />
      <Route path="/the-loai/:slug" element={<CategoryDetail />} />
    </Routes>
  );
};
export default AppRouter;
