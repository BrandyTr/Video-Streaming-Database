import React, { useEffect, useState } from "react";
import CastCard from "../../components/castCard/castCard"; // Corrected import path
import "./cast.css";
import "swiper/css";
import { Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Cast = ({ credit }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (credit && credit.casts) {
      setCast(credit.casts);
    }
  }, [credit]);

  console.log("Cast:", cast);

  return (
    <div className="frame">
      <h1>Casts</h1>
      <div className="Casts">
        <Swiper
          spaceBetween={20}
          slidesPerView={8}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          virtual
          modules={[Virtual]}
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
