import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  // ✅ FILTER PRODUCTS
  const sarees = products.filter((p) => p.category === "sarees");
  const kurtis = products.filter((p) => p.category === "kurtis");
  const lehengas = products.filter((p) => p.category === "lehengas");

  const getImage = (img) => {
    if (!img) return "/no-image.png";
    return img.startsWith("http")
      ? img
      : `http://localhost:5000/${img}`;
  };

  return (
    <>
      {/* HERO */}
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

          <button
            onClick={handleExplore}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 hover:scale-105 transition"
          >
            Explore Collections
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="py-16 px-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["pattu-sarees", "lehengas", "kurtis", "anarkalis", "sarees"].map(
            (cat) => (
              <div
                key={cat}
                onClick={() => navigate(`/category/${cat}`)}
                className="bg-white p-6 text-center rounded-lg cursor-pointer hover:bg-[#f5f1eb] transition shadow-sm"
              >
                {cat}
              </div>
            )
          )}
        </div>
      </div>

      {/* BANNER */}
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

      {/* 🔥 AJIO STYLE SECTIONS */}
      <Section title="Trending Sarees" items={sarees} getImage={getImage} />
      <Section title="Popular Kurtis" items={kurtis} getImage={getImage} />
      <Section title="New Lehengas" items={lehengas} getImage={getImage} />
    </>
  );
}

/* 🔥 BIG CARD + ARROW SECTION */
function Section({ title, items, getImage }) {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-12 mt-16 relative">
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>

      {/* LEFT */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 
                   bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
      >
        ‹
      </button>

      {/* RIGHT */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 
                   bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
      >
        ›
      </button>

      {/* PRODUCTS */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {items.slice(0, 10).map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="min-w-[260px] cursor-pointer group"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={getImage(p.images?.[0] || p.image)}
                className="h-72 w-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <h3 className="text-base mt-3 line-clamp-2">
              {p.name}
            </h3>

            <p className="text-pink-600 font-semibold text-lg">
              ₹ {p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;