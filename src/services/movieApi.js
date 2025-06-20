import axiosClient from "./axiosClient";

const movieApi = {
  // phim mới cập nhật
  getNewMovies: (page = 1, limit = 12) =>
    axiosClient.get(`/danh-sach/phim-moi-cap-nhat-v3?page=${page}`),

  // Lấy chi tiết phim và danh sách tập phim
  getMovieDetail: (slug) => axiosClient.get(`/${slug}`),

  // Tổng hợp danh sách phim có thể sử dụng
  //   getMoviesWithFilter: ({
  //     type_list,
  //     page = 1,
  //     sort_field = 'modified.time',
  //     sort_type = 'desc',
  //     sort_lang = '',
  //     category = '',
  //     country = '',
  //     year = '',
  //     limit = 12,
  //   }) => {
  //     const query = new URLSearchParams({
  //       page,
  //       sort_field,
  //       sort_type,
  //       sort_lang,
  //       category,
  //       country,
  //       year,
  //       limit,
  //     }).toString();

  //     return axiosClient.get(`/v1/api/danh-sach/${type_list}?${query}`);
  //   },
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
};

export default movieApi;
