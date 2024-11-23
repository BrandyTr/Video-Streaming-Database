import React from "react";
import "./Dropdown.css";

const SearchDropdown = ({
  genres,
  selectedGenres,
  handleGenreSelect,
  selectedRatings,
  handleRatingSelect,
  handleApplyFilter,
}) => {
  return (
    <div className="drop-down">
      <h3>Genres</h3>
      <p>Pick a maximum of 3</p>
      <div className="genre-list">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`genre-tab ${
              selectedGenres.includes(genre) ? "selected" : ""
            }`}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </div>
        ))}
      </div>

      <h3>Rating score</h3>
      <p>Pick a maximum of 3</p>
      <div className="rating-list">
        {[9, 8, 7, 6, 5, 4, 3, 2].map((rating) => (
          <div
            key={rating}
            className={`rating-tab ${
              selectedRatings.includes(rating) ? "selected" : ""
            }`}
            onClick={() => handleRatingSelect(rating)}
          >
            {rating}.0 - {rating}.9
          </div>
        ))}
      </div>

      <button onClick={handleApplyFilter} className="apply-filter-btn">
        Apply Filters
      </button>
    </div>
  );
};

export default SearchDropdown;
