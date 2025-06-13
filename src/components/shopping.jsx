import React from 'react';
import Slider from 'react-slick';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';

const categories = [
  {
    title: 'Vitamins',
    image: 'https://via.placeholder.com/150?text=Vitamins',
  },
  {
    title: 'Nutritional Drink',
    image: 'https://via.placeholder.com/150?text=Nutritional+Drink',
  },
  {
    title: 'Skin Care',
    image: 'https://via.placeholder.com/150?text=Skin+Care',
  },
  {
    title: 'Wellness',
    image: 'https://via.placeholder.com/150?text=Wellness',
  },
  {
    title: 'Sexual Wellness',
    image: 'https://via.placeholder.com/150?text=Sexual+Wellness',
  },
  {
    title: 'Homeopathy',
    image: 'https://via.placeholder.com/150?text=Homeopathy',
  },
];

export default function ShopCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          <span className="text-green-600 font-bold">Shop</span>{' '}
          <span className="text-blue-900">for Medicines & Wellness</span>{' '}
          <FaShoppingCart className="inline-block text-blue-900 ml-1" />
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting...
        </p>
      </div>

      <Slider {...settings}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className="px-2 text-center"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="rounded-md w-full h-28 object-cover shadow-md mb-2"
            />
            <p className="text-sm font-medium text-gray-800">{cat.title}</p>
          </div>
        ))}
      </Slider>

      <div className="text-left mt-4 pl-2">
        <a href="#" className="text-blue-600 text-sm font-medium underline flex items-center gap-1">
          View All <FaArrowRight />
        </a>
      </div>
    </div>
  );
}


import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TopDoc = () => {
  const doctors = sampleDoctors;
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="header flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-900">
          Top Rated <span className="doc-highlight text-cyan-700">Doctors</span>{" "}
          Near You
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="doc-list flex space-x-6 overflow-x-auto pb-2 -mx-4 px-2 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {doctors.map((d, idx) => (
            <div
              key={idx}
              className="doc-card flex-shrink-0 w-45  bg-white rounded-xl shadow-lg p-2 text-center"
            >
              <img
                src={d.photo}
                alt="doc-photo"
                className="doc-img w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="doc-info space-y-1">
                <div className="doc-name font-semibold text-gray-800">
                  {d.name}
                </div>
                <div className="doc-spec text-xs text-gray-500">
                  {d.specialization}, {d.location}
                </div>
              </div>
              <button
                onClick={() => alert(`Consulting ${d.name}`)}
                className="mt-4 w-full border border-solid border-[#10217D] text-[#10217D] text-sm font-medium py-2  hover:bg-indigo-50 hover:translate-0.5"
              >
                Consult Now
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2  text-[#10217D] font-bold bg-white rounded-full p-3 shadow"
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};


