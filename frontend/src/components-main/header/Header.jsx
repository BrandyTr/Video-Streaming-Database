import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./header.css";
import Dropdown from "../search/DropDown.jsx"
import movieApi from "../../api/movieApi"
import { LogOut } from "lucide-react";
import { useAuth } from "../../Context/authContext";

const headerNav = [
    {
        display: "Movies",
        path: "/",
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
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

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.example.com/movies?query=${searchTerm}`);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    const {logout}=useAuth()

    {/* đoạn này đang sai*/}
    const genres = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "History", "Horror", "Musical", "Mystery", "Romance", "Science Fiction", "Thriller", "War", "Western",
    ];

    const handleGenreSelect = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else if (selectedGenres.length < 3) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            console.log("Cannot select more than 3 genres!");
        }
    };

    const handleFilter = async () => {
        try { 
            const response = await movieApi.getMoviesByCategory(selectedGenres.join(',')); 
            setMovies(response.data.content); 
    } catch (error) { 
            console.error('Error fetching movies by genre:', error); 
        }

    };
  
    return (
        <div ref={headerRef} className="header">
            <div className="header_wrap container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">tMovies</Link>
                </div>
                {/* Navigation and Search */}
                <ul className="header_nav">
                    <LogOut className="cursor-pointer" onClick={logout}/>
                    {headerNav.map((item, index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
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
                    <div className="search-modal-overlay" onClick={() => setShowSearch(false)}></div>
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
                                <button onClick={() => setShowDropdown(!showDropdown)} className="filter-btn">
                                    <FontAwesomeIcon icon="fa-solid fa-filter" />
                                </button>

                                {/* search button */}
                                <button onClick={handleSearch} className="search-btn">
                                    Search
                                </button>
                            </div>

                            {/* click to filter button get drop down*/}
                            {showDropdown && (
                            <Dropdown
                                genres={genres}
                                selectedGenres={selectedGenres}
                                handleGenreSelect={handleGenreSelect}
                                handleApplyFilter={handleFilter}
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
