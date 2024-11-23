import axios from "axios";

export const movieType = {
  trending: "trending",
  popular: "popular",
  top_rated: "top_rated",
};
export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
];

const movieApi = {
  getMoviesList: (type, params) => {
    const url = `/api/movie/${movieType[type]}`;
    return axios.get(url, { params: params });
  },

  getMovieDetails: (id) => {
    const url = `/api/movie/${id}/details`;
    return axios.get(url);
  },

  getMoviesByCategory: (cate) => {
    const url = `/api/movie/${cate}/category`;
    return axios.get(url, { cate });
  },

  searchMovie: (movieName) => {
    const url = `/api/search/movie`;
    return axios.get(url, {
      params: {
        name: movieName,
      },
    });
  },
  rateMovie: (id, rating) => {
    const url = `/api/movie/${id}/rate`;
    return axios.post(url, { rating });
  },

  loveMovie: (id) => {
    const url = `/api/movie/${id}/favorite`;
    return axios.post(url);
  },
  searchPerson: (personName) => {
    const url = `/api/search/person`;
    return axios.get(url, {
      params: {
        name: personName,
      },
    });
  },
};

export default movieApi;
