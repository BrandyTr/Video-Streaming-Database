import React, { useEffect, useState } from "react";
import { CastCard } from "../../commonPaths"; // Adjust the import path as needed
import "./cast.css";
import "swiper/css";
import { Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
        {/* Swiper for cast */}
        <Swiper
          spaceBetween={20}
          slidesPerView={8}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          virtual // Enable virtual slides
          modules={[Virtual]} // Add the Virtual module
        >
          {cast.map((member, index) => (
            <SwiperSlide key={index}>
              <CastCard
                key={index}
                name={member.name}
                profile_path={member.profile_path}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Cast;
