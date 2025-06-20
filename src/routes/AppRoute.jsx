import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import SearchResult from "../pages/SearchResult";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phim/:type" element={<Movies />} />
      <Route path="/search" element={<SearchResult />} />
    </Routes>
  );
};
export default AppRouter;
