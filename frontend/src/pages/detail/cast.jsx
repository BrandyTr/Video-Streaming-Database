import React, { useEffect, useState } from "react";
import { CastCard } from "../../commonPaths"; // Adjust the import path as needed
import "./cast.css";
const Cast = ({ credit }) => {
  //useEffect n useState to get array of cast from credit
  const [cast, setCast] = useState([]);
  useEffect(() => {
    if (credit && credit.casts) {
      setCast(credit.casts);
    }
  }, [credit]);
  //Set cast to an array of cast name in the constant "credit"
  console.log("Cast:", cast);

  return (
    <div className="frame">
      <h1>Cast</h1>
      <div className="Casts">
        {cast.map((member, index) => (
          <CastCard
            key={index}
            name={member.name}
            profile_path={member.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

export default Cast;
