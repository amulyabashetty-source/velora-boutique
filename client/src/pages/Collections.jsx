import { useNavigate } from "react-router-dom";

function Collections() {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Kurtis",
      image:
        "https://i.pinimg.com/736x/d2/76/08/d27608edea6ae478b6215dba87c14b9b.jpg",
      link: "/category/kurtis",
    },
    {
      title: "Anarkalis",
      image:
        "https://i.pinimg.com/1200x/09/21/d5/0921d598b9d481ea02be0c2258a73f0a.jpg",
      link: "/category/anarkalis",
    },
    {
      title: "Daily Wear",
      image:
        "https://i.pinimg.com/736x/b8/ad/92/b8ad9275082209d9a07a362bf28b0cd8.jpg",
      link: "/category/daily-wear",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-12 bg-[#f9f7f4]">
      
      <h1 className="text-4xl font-bold text-center mb-12">
        Explore Collections
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {collections.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className="cursor-pointer group"
          >

            {/* IMAGE CARD */}
            <div className="relative overflow-hidden rounded-xl shadow-md">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[350px] object-cover object-top transition duration-500 group-hover:scale-110"
              />

              {/* OVERLAY EFFECT */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

            </div>

            {/* TITLE */}
            <h2 className="text-xl font-semibold mt-4 text-center tracking-wide">
              {item.title}
            </h2>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Collections;