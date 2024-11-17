import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./header.css";

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



    return (
        <div ref={headerRef} className="header">
            <div className="header_wrap container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">tMovies</Link>
                </div>

                {/* Navigation and Search */}
                <ul className="header_nav">
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
                                <button onClick={handleSearch} className="search-btn">
                                    Search
                                </button>
                            </div>
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
