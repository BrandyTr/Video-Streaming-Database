import axios from "axios";

export const movieType = {
  trending: "trending",
  popular: "popular",
  top_rated: "top_rated",
  all: "all",
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
  "Music",
];
const baseURL = "http://localhost:5173";

const movieApi = {
  getMoviesList: (type, params) => {
    const url = `${baseURL}/api/movie/${movieType[type]}`;
    return axios.get(url, { params: params });
  },

  getMovieDetails: (id) => {
    const url = `${baseURL}/api/movie/${id}/details`;
    return axios.get(url);
  },

  getMoviesByCategory: (cate) => {
    const url = `${baseURL}/api/movie/${cate}/category`;
    return axios.get(url, { cate });
  },

  searchMovie: (movieName) => {
    const url = `${baseURL}/api/search/movie`;
    return axios.get(url, {
      params: {
        name: movieName,
      },
    });
  },
  rateMovie: (id, rating) => {
    const url = `${baseURL}/api/movie/${id}/rate`;
    return axios.post(url, { rating });
  },

  loveMovie: (id) => {
    const url = `${baseURL}/api/movie/${id}/favorite`;
    return axios.post(url);
  },
  searchPerson: (personName) => {
    const url = `${baseURL}/api/search/person`;
    return axios.get(url, {
      params: {
        name: personName,
      },
    });
  },
  addMovie: (movie) => {
    const url = `${baseURL}/api/movie`;
    return axios.post(url, movie);
  },

  updateMovie: (id, movie) => {
    const url = `${baseURL}/api/movie/${id}`;
    return axios.put(url, movie);
  },

  deleteMovie: (id) => {
    const url = `${baseURL}/api/movie/${id}`;
    return axios.delete(url);
  },
};

export default movieApi;