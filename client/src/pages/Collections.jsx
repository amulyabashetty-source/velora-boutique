import { useNavigate } from "react-router-dom";

function Collections() {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Kurtis",
      image:
        "https://i.pinimg.com/564x/5d/7f/5a/5d7f5a5b0d5c9a45f4c3f0c6a0e0b6e2.jpg",
      link: "/category/kurtis",
    },
    {
      title: "Anarkalis",
      image:
        "https://i.pinimg.com/564x/2e/9f/91/2e9f91c8b8c1d5c6b7e4d5c1f3c2e8b2.jpg",
      link: "/category/anarkalis",
    },
    {
      title: "Daily Wear",
      image:
        "https://i.pinimg.com/564x/9c/6d/9a/9c6d9a5c5e4f3c2b1a0e9d8c7b6a5f4.jpg",
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