import HomeCSS from "/public/styles/Home.module.css";
import NavBar from "./NavBar.jsx";
import { useGetAllTemplates } from "/src/hooks/user.js";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import man_with_laptop from '/public/assets/man_with_laptop.webp'
import succssfull_man from '/public/assets/close_man_resume.jpg'

export default function Home() {
  const [allTemps, setAllTemps] = useState();

  const {
    loading : useGetAllTemplatesLodaing,
    error : useGetAllTemplatesErrors,
    handleUseGetAllTemplates,
} = useGetAllTemplates();


  React.useEffect(function(){
    async function getAllTemplates() {
      const resultData = await handleUseGetAllTemplates()
      setAllTemps(resultData)
    }
    getAllTemplates()
  }, [])

  return (
    <div className={HomeCSS.page}>
      <NavBar />

      <div className="swiper-container">
          <Swiper
            slidesPerView={1}

            spaceBetween={30}
            pagination={{
              dynamicBullets: true,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
              { allTemps && allTemps.resultData.map((slide, index) => (
            <SwiperSlide key={slide._id} className={HomeCSS.swiper_slide}>
                <Link to={`/SHOW?id=${slide._id}`}> <span> template {index + 1} </span> </Link>
            </SwiperSlide>
          ))}
              </Swiper>
              <div className="swiper-pagination"></div>
      </div>
      
      <div className={HomeCSS.body}>
        <div className={HomeCSS.section}>Create professional resumes in minutes <br /> with our easy-to-use builder</div>
        <div className={HomeCSS.man_with_laptop_div}> <img src={man_with_laptop} alt="cant find image"></img> </div>
        <div className={HomeCSS.section}>Designed for job seekers of all levels.</div>
        <div className={HomeCSS.section}>Land more interviews with a tailored <br /> resume that highlights your skills.</div>
        <div className={HomeCSS.succssfull_man_div}> <img src={succssfull_man} alt="cant find image"></img> </div>
        <div className={HomeCSS.section}>Start building your resume now <br /> Explore our templates <br /> Learn more about our features</div>
        <div className={HomeCSS.last_section}>And remember <br /> Our easy-to-use resume builder <br /> helps you land your dream job.</div>
      </div>
    </div>
  );
}
