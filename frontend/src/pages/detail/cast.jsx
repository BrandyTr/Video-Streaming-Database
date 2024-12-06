import React, { useEffect, useState } from "react";
import CastCard from "../../components/castCard/castCard";
import "./cast.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import đúng các component của swiper

const Cast = ({ credit }) => {
  const [cast, setCast] = useState([]);
  const slidesPerView = cast.length > 6 ? 6 : 3;

  useEffect(() => {
    if (credit && credit.casts) {
      setCast(credit.casts);
    }
  }, [credit]);

  return (
    <div className="cast-container">
      <h1>Casts</h1>
      <div className="Casts">
        <Swiper
          spaceBetween={30}
          slidesPerView={slidesPerView} // Set the number of slides per view
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {cast.length > 0 ? (
            cast.map((member, index) => (
              <SwiperSlide key={index}>
                <CastCard
                  name={member.name}
                  profile_path={member.profile_path}
                />
              </SwiperSlide>
            ))
          ) : (
            <p>No cast available</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Cast;
