import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import banner6 from "../assets/banner6.png";
import banner7 from "../assets/banner7.png";
import banner8 from "../assets/banner8.png";

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const handleExplore = () => {
    navigate("/collections");
  };

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
      name: "Handbags",
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
    { img: banner1, path: "pattu-saree" },
    { img: banner2, path: "anarkalis" },
    { img: banner3, path: "kurtis" },
    { img: banner4, path: "lehengas" },
    { img: banner5, path: "saree" },
  ];

  const midBanners = [
    { img: banner6, path: "footwear" },
    { img: banner7, path: "handbag" },
    { img: banner8, path: "accessories" },
  ];

  const filter = (cat) => (products || []).filter((p) => p.category === cat);

  const getImage = (img) => {
    if (!img) return "/no-image.png";
    return img.startsWith("http")
  ? img
  : `${import.meta.env.VITE_API_URL}/${img}`;
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
        <div className="bg-black/40 p-8 rounded-lg max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Your Perfect Traditional Look
          </h1>
          <p className="text-gray-200 mb-6">
            Sarees, Lehengas, Kurtis & More — Styled Just For You
          </p>
          <button
            onClick={handleExplore}
            className="bg-[#347736] px-6 py-3 text-white rounded-lg hover:scale-105 transition"
          >
            Explore Collections
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto my-12 px-4">
        <div
          className="bg-white rounded-3xl shadow-lg border border-[#e8e3dc] 
  flex flex-col md:flex-row items-center justify-between p-8 gap-6 transition transform hover:-translate-y-1 hover:shadow-xl"
        >
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center md:text-left">
            <div className="w-16 h-1.5 bg-[#2f4f4f] mb-4 mx-auto md:mx-0 rounded-full"></div>

            <h2 className="text-2xl font-semibold text-[#2f4f4f] mb-3">
              ✨ Find Your Perfect Style
            </h2>

            <p className="text-gray-600 max-w-md mx-auto md:mx-0">
              Answer a few quick questions and discover outfits, accessories,
              and styles that match your occasion.
            </p>
          </div>

          {/* RIGHT BUTTON */}
          <div>
            <button
              onClick={() => navigate("/style-match")}
              className="bg-[#2f4f4f] text-white px-6 py-3 rounded-full 
        hover:bg-[#3d6363] transition transform hover:scale-105"
            >
              Try Style Match
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="py-16 px-12 bg-[#f3eee9]">
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
                className="w-full h-60 object-cover group-hover:scale-110 transition"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN BANNER */}
      <div className="px-12 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Special Offers</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop
        >
          {banners.map((b, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => navigate(`/category/${b.path}`)}
                className="cursor-pointer"
              >
                <img
                  src={b.img}
                  className="w-full h-[500px] object-cover rounded-xl hover:scale-105 transition"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CLOTHES */}
      <Section
        title="Trending Sarees"
        items={filter("sarees")}
        getImage={getImage}
      />
      <Section
        title="Popular Kurtis"
        items={filter("kurtis")}
        getImage={getImage}
      />
      <Section
        title="New Lehengas"
        items={filter("lehengas")}
        getImage={getImage}
      />

      {/*  NEW BANNERS  */}
      <div className="px-12 mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">New Collections</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop
        >
          {midBanners.map((b, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => navigate(`/category/${b.path}`)}
                className="cursor-pointer"
              >
                <img
                  src={b.img}
                  className="w-full h-[450px] object-contain bg-[#f8f5f2] rounded-xl hover:scale-105 transition"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* REMAINING PRODUCTS */}
      <Section
        title="Stylish Accessories"
        items={filter("accessories")}
        getImage={getImage}
      />
      <Section
        title="Trending Footwear"
        items={filter("footwear")}
        getImage={getImage}
      />
      <Section
        title="Elegant Handbags"
        items={filter("handbag")}
        getImage={getImage}
      />
    </>
  );
}

/* PRODUCT SECTION */
function Section({ title, items, getImage }) {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-12 mt-20 relative">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>

      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 w-9 h-9 rounded-full shadow"
      >
        ‹
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 w-9 h-9 rounded-full shadow"
      >
        ›
      </button>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar">
        {items.slice(0, 12).map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="min-w-[240px] bg-white border border-gray-200 rounded-lg p-3 cursor-pointer"
          >
            <img
              src={getImage(p.images?.[0] || p.image)}
              className="h-72 w-full object-cover rounded-md"
            />
            <h3 className="text-sm mt-3 line-clamp-2">{p.name}</h3>
            <p className="text-[#347736] font-semibold">₹ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
