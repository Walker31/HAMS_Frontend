import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VitaminImg from "../assets/Vitamins.jpg"
import NutritonalDrink from "../assets/Nutritonal Drink.jpg";
import Skincare from "../assets/Skin Care.jpg";
import Wellness from "../assets/Wellness.jpg";
import Sexual from "../assets/sexualwellness.jpg";
import home from "../assets/home.jpg";
import pets from "../assets/pets.jpg";


const shopping = () => {

  const shopCart = [
  {
    title: "Vitamins",
    image: VitaminImg,
  },
  {
    title: "Nutritional Drink",
    image: NutritonalDrink,
  },
  {
    title: "Skin Care",
    image: Skincare,
  },
  {
    title: "Wellness",
    image: Wellness,
  },
  {
    title: "Sexual Wellness",
    image: Sexual,
  },
  {
    title: "Home",
    image: home,
  },
  {
    title: "Pet",
    image: pets,
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
      
    </div>
  );
};

export default shopping;
