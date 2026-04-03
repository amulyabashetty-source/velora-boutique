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
    <div className="py-16 px-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        Explore Collections
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {collections.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className="cursor-pointer group"
          >
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="h-[300px] w-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>

            <h2 className="text-xl font-semibold mt-4 text-center">
              {item.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;