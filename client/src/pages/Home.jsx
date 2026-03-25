import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Home() {
  const navigate = useNavigate();

  // 🔥 FIXED BUTTON LOGIC
  const handleExplore = () => {
    if (window.location.pathname === "/collections") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/collections");
    }
  };

  const banners = [
    { id: 1, image: banner1, link: "/category/pattu-sarees" },
    { id: 2, image: banner2, link: "/category/anarkalis" },
    { id: 3, image: banner3, link: "/category/kurtis" },
    { id: 4, image: banner4, link: "/category/lehengas" },
    { id: 5, image: banner5, link: "/category/sarees" },
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[70vh] flex items-center justify-center text-center bg-cover"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/1200x/a5/a6/17/a5a6178d438a7cea6a6d3e3ce074d523.jpg)",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/40 p-8 rounded-lg max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Your Perfect Traditional Look
          </h1>

          <p className="text-lg text-gray-200 mb-6">
            Sarees, Lehengas, Kurtis & More — Styled Just For You
          </p>

          {/* ✅ UPDATED BUTTON */}
          <button
            onClick={handleExplore}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 hover:scale-105 transition"
          >
            Explore Collections
          </button>
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="py-16 px-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/category/sarees")}
            className="bg-white p-6 text-center rounded-lg cursor-pointer hover:bg-[#f5f1eb] transition shadow-sm"
          >
            Sarees
          </div>

          <div
            onClick={() => navigate("/category/lehengas")}
            className="bg-white p-6 text-center rounded-lg cursor-pointer hover:bg-[#f5f1eb] transition shadow-sm"
          >
            Lehengas
          </div>

          <div
            onClick={() => navigate("/category/kurtis")}
            className="bg-white p-6 text-center rounded-lg cursor-pointer hover:bg-[#f5f1eb] transition shadow-sm"
          >
            Kurtis
          </div>

          <div
            onClick={() => navigate("/category/anarkalis")}
            className="bg-white p-6 text-center rounded-lg cursor-pointer hover:bg-[#f5f1eb] transition shadow-sm"
          >
            Anarkalis
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="py-12 px-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          Special Offers
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.image}
                onClick={() => navigate(banner.link)}
                className="w-full h-[500px] object-cover rounded-lg cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Home;