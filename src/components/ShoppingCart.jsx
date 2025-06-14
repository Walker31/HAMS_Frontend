import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const shopping = () => {

  const shopCart = [
  {
    title: "Vitamins",
    image: require("src\assets\Vitamins.jpg"),
  },
  {
    title: "Nutritional Drink",
    image: "https://via.placeholder.com/150?text=Nutritional+Drink",
  },
  {
    title: "Skin Care",
    image: "https://via.placeholder.com/150?text=Skin+Care",
  },
  {
    title: "Wellness",
    image: "https://via.placeholder.com/150?text=Wellness",
  },
  {
    title: "Sexual Wellness",
    image: "https://via.placeholder.com/150?text=Sexual+Wellness",
  },
  {
    title: "Homeopathy",
    image: "https://via.placeholder.com/150?text=Homeopathy",
  },
];

  
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          <span className="text-green-600 font-bold">Shop</span>{" "}
          <span className="text-blue-900">for Medicines & Wellness</span>{" "}
          <span className="inline-block text-blue-900 ml-1"></span>
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting...
        </p>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar"
        >
          {shopCart.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-40 sm:w-48 bg-white rounded-xl shadow-md text-center p-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-28 object-cover rounded-md mb-2"
              />
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#10217D] font-bold bg-white rounded-full p-3 shadow"
        >
          <ArrowForwardIosIcon />
        </button>
      </div>

      <div className="mt-4 text-left">
        <a
          href="#"
          className="text-blue-600 text-sm font-medium underline flex items-center gap-1"
        >
          View All <ArrowForwardIosIcon fontSize="small" />
        </a>
      </div>
    </div>
  );
};

export default shopping;
