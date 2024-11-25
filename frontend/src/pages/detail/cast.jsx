import React, { useEffect, useState } from "react";
import CastCard from "../../components/castCard/castCard";
import "./cast.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import đúng các component của swiper


const Cast = ({ credit }) => {
  const [cast, setCast] = useState([]);

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
          spaceBetween={10} // Khoảng cách giữa các thẻ card
          slidesPerView={4} // Hiển thị nhiều thẻ cùng lúc (4 thẻ)
          grabCursor={true} // Cho phép kéo thẻ
          loop={false} // Cho phép vòng lặp
          
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
