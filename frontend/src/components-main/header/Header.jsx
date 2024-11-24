import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import SearchDropdown from "../search/SearchDropDown";
import { IoFilter } from "react-icons/io5";

import { LogOut } from "lucide-react";
import { useAuth } from "../../Context/authContext";
import movieApi from "../../api/movieApi";
import { genres } from "../../api/movieApi";
const headerNav = [
  {
    display: "Movies",
    path: "/",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      console.log("Cannot select more than 3 genres!");
    }
  };
  const handleRatingSelect = (ratingText) => {
    const rating = parseFloat(ratingText.split(":")[1]);
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
      console.log(selectedRatings);
    } else if (selectedRatings.length < 3) {
      setSelectedRatings([...selectedRatings, rating]);
      console.log(selectedRatings);
    } else {
      console.log("Cannot select more than 3 ratings!");
    }
  };

  const handleFilter = () => {
    const genreQuery =
      selectedGenres.length > 0 ? `genres=${selectedGenres.join("-")}` : "";
    const ratingQuery =
      selectedRatings.length > 0 ? `ratings=${selectedRatings.join("-")}` : "";
    const movieNameQuery = searchTerm ? `movieName=${searchTerm}` : "";
    const query = [movieNameQuery, genreQuery, ratingQuery]
      .filter(Boolean)
      .join("&");
    if (query) {
      setQuery(`?${query}`);
      navigate(`/search?${query}`);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?movieName=${searchTerm}`);
    }
  };
  const handleClose = () => {
    setShowDropdown(false); // Close the dropdown
  };

  const { logout } = useAuth();

  return (
    <div ref={headerRef} className="header">
      <div className="header_wrap container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">tMovies</Link>
        </div>
        {/* Navigation and Search */}
        <ul className="header_nav">
          <LogOut className="cursor-pointer" onClick={logout} />
          {headerNav.map((item, index) => (
            <li key={index} className={`${index === active ? "active" : ""}`}>
              <Link to={item.path}>{item.display}</Link>
            </li>
          ))}

          {/* Search Icon or Search Bar */}
          <li>
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="search-icon"
              onClick={() => setShowSearch(true)}
            />
          </li>
        </ul>
      </div>

      {/* Modal Search Overlay */}
      {showSearch && (
        <div className="search-modal">
          <div
            className="search-modal-overlay"
            onClick={() => setShowSearch(false)}
          ></div>
          <div className="search-modal-content">
            <div className="header_wrap container">
              {/* Logo */}
              <div className="logo">
                <Link to="/">tMovies</Link>
              </div>

              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search Movie"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />

                {/* filter button */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="filter-btn"
                >
                  <IoFilter />
                </button>

                {/* search button */}
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                  className="search-btn"
                >
                  Search
                </button>
              </div>

              {/* click to filter button get drop down*/}
              {showDropdown && (
                <SearchDropdown
                  genres={genres}
                  selectedGenres={selectedGenres}
                  selectedRatings={selectedRatings}
                  handleGenreSelect={handleGenreSelect}
                  handleRatingSelect={handleRatingSelect}
                  handleApplyFilter={handleFilter}
                  CloseDropDown={handleClose}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {/* Movie Results */}
      <div className="movie-results">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
