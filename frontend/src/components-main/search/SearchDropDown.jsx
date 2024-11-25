import React from "react";
import "./Dropdown.css";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
const SearchDropdown = ({
  genres,
  selectedGenres,
  handleGenreSelect,
  selectedRatings,
  handleRatingSelect,
  CloseDropDown,
}) => {
  const ratingScore = [
    "Wonderful: 9+",
    "Very good: 8+",
    "Good: 7+",
    "Pleasant: 6+",
    "Average: 5+",
    "Bad: 4+",
    "Poor: 3+",
    "Very poor: 2+",
  ];
  return (
    <div className="drop-down">
      {/* close button */}
      <button className="close-btn-container" >
        <div> <AiFillCloseSquare className="close-btn" onClick={CloseDropDown}/> </div>
       
      </button>
      <div className ="filter-type">
      <h3>Genres</h3>
      <div className= "dropdown-line">
      </div>
      <p>*Pick a maximum of 3*</p>
      </div>
      <div className="genre-list">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`genre-tab ${
              selectedGenres.includes(genre) ? "selected" : ""
            } 
                        ${
                          selectedGenres.length >= 3 &&
                          !selectedGenres.includes(genre)
                            ? "faded"
                            : ""
                        }`}
            onClick={() => handleGenreSelect(genre)}
          >
            {/*tick when genre is choosen*/}
            {genre}
            {selectedGenres.includes(genre) && (
              <span className="tick-icon">
                <TiTick />
              </span>
            )}
          </div>
        ))}
      </div>
  <div className ="filter-type">  
      <h3>Rating score</h3>
      <div className= "dropdown-line">
      </div>
      <p>*Pick a maximum of 3*</p>
      </div>
      <div className="ratingScore-list">
        {ratingScore.map((rating) => (
          <div
            key={rating}
            className={`rating-tab ${
              selectedRatings.includes(parseFloat(rating.split(":")[1]))
                ? "selected"
                : ""
            } 
                        ${
                          selectedRatings.length >= 3 &&
                          !selectedRatings.includes(
                            parseFloat(rating.split(":")[1])
                          )
                            ? "faded"
                            : ""
                        }`}
            onClick={() => handleRatingSelect(rating)}
          >
            {rating}
            {selectedRatings.includes(parseFloat(rating.split(":")[1])) && (
              <span className="tick-icon">
                <TiTick />
              </span>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => {
    if (selectedRatings.length < 1 && selectedGenres.length < 1) {
      alert("Please select a filter");
    } else {
      CloseDropDown();
    }
  }}
  className="apply-filter-btn"
>
        Apply Filters
      </button>
    </div>
  );
};

export default SearchDropdown;
