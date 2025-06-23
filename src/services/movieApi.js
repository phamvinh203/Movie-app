import axiosClient from "./axiosClient";

const movieApi = {
  // phim mới cập nhật
  getNewMovies: (page = 1, limit = 12) =>
    axiosClient.get(`/danh-sach/phim-moi-cap-nhat-v3?page=${page}`),

  // Lấy chi tiết phim và danh sách tập phim
  getMovieDetail: (slug) => axiosClient.get(`/phim/${slug}`),

  // Tổng hợp danh sách phim có thể sử dụng
  getMoviesWithFilter: (params) => {
    const query = new URLSearchParams(params).toString();
    return axiosClient.get(`/v1/api/danh-sach/${params.type_list}?${query}`);
  },

  // search phim
  getSearchMovies: (keyword) => {
    return axiosClient.get("/v1/api/tim-kiem", {
      params: { keyword },
    });
  },
  // Lấy danh sách thể loại phim
  getMovieCategories: () => {
    return axiosClient.get("/the-loai");
  },
  // Lấy chi tiết thể loại phim
  getCategoryDetail: (slug, page = 1, limit = 24) => {
    return axiosClient.get(
      `/v1/api/the-loai/${slug}?page=${page}&limit=${limit}`
    );
  },
};

export default movieApi;
