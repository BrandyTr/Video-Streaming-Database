import React from "react";
import "./Dropdown.css";

const Dropdown = ({ genres, selectedGenres, handleGenreSelect, handleApplyFilter }) => {

    return (
        <div className="drop-down">
            <h3>Genres</h3>
            <p>Pick a maximum of 3</p>
            <div className="genre-list">
                {genres.map((genre) => (
                    <div
                        key={genre}
                        className={`genre-tab ${selectedGenres.includes(genre) ? "selected" : ""}`}
                        onClick={() => handleGenreSelect(genre)}
                    >
                        {genre}
                    </div>
                ))}
            </div>

            <h3>Rating score</h3>
            <p>Pick a maximum of 3</p>

            <button onClick={handleApplyFilter} className="apply-filter-btn">
                Apply Filters
            </button>
        </div>
    );
};

export default Dropdown;
