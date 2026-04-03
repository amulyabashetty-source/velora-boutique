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

  // ✅ CATEGORY DATA (UPDATED)
  const categories = [
    {
      name: "Pattu Sarees",
      path: "pattu-sarees",
      img: "https://i.pinimg.com/1200x/6f/7f/c2/6f7fc2f96ad683990530b8cd520f263a.jpg",
    },
    {
      name: "Lehengas",
      path: "lehengas",
      img: "https://i.pinimg.com/736x/f0/c1/34/f0c13469cbde90ca0862bcd62267976c.jpg",
    },
    {
      name: "Kurtis",
      path: "kurtis",
      img: "https://i.pinimg.com/1200x/37/4e/2f/374e2fbb73a6025956bc6e8fae43bbf8.jpg",
    },
    {
      name: "Anarkalis",
      path: "anarkalis",
      img: "https://i.pinimg.com/1200x/8c/de/8c/8cde8c372b6b676cbda30ecc7c07e394.jpg",
    },
    {
      name: "Sarees",
      path: "sarees",
      img: "https://i.pinimg.com/736x/c1/0f/3a/c10f3aad7a4d128c2245b21a56775a72.jpg",
    },
    {
      name: "Accessories",
      path: "accessories",
      img: "https://i.pinimg.com/1200x/5a/6a/c8/5a6ac8ddcc0c68aafb91017cf2bbbb63.jpg",
    },
     {
      name: "HandBag",
      path: "handbag",
      img: "https://i.pinimg.com/1200x/25/d8/72/25d872e4e29e57f2f82e1784b6e9cab6.jpg",
    },
    {
      name: "Footwear",
      path: "footwear",
      img: "https://i.pinimg.com/736x/e1/5a/df/e15adf5db088887dfc66a363129e3530.jpg",
    },
  ];

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

          {/* ✅ FIXED BUTTON COLOR */}
          <button
            onClick={handleExplore}
            className="bg-[#347736] text-white px-6 py-3 rounded-lg hover:bg-[#2e6330] hover:scale-105 transition"
          >
            Explore Collections
          </button>
        </div>
      </div>

      {/* 🔥 CATEGORY SECTION (UPGRADED) */}
      <div className="py-16 px-12 bg-[#f8f5f2]">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.path}
              onClick={() => navigate(`/category/${cat.path}`)}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
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

      {/* PRODUCT SECTIONS */}
      <Section title="Trending Sarees" items={sarees} getImage={getImage} />
      <Section title="Popular Kurtis" items={kurtis} getImage={getImage} />
      <Section title="New Lehengas" items={lehengas} getImage={getImage} />
    </>
  );
}

/* 🔥 PRODUCT SLIDER SECTION */
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

      <button
        onClick={() => scroll("left")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 
                   bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
      >
        ‹
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 
                   bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
      >
        ›
      </button>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {items.slice(0, 10).map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="min-w-[280px] cursor-pointer group"
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

            <p className="text-[#347736] font-semibold text-lg">
              ₹ {p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;