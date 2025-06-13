import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import sampleFeedback from "../constants/feedback";



const Feedback = () => {
  const feedbacks = sampleFeedback;
  const [current, setCurrent] = useState(0);
  const length = feedbacks.length;

  if (!Array.isArray(feedbacks) || length === 0) return null;

  const { photo, review, name } = feedbacks[current];

  const nextSlide = () => setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent(prev => (prev === 0 ? length - 1 : prev - 1));

  return (
    <section className="max-w-7xl  mr-10 py-12 px-4">
      <h3 className="text-2xl font-bold text-blue-900 p-4">
        Our  <span className="text-teal-600"> patients</span> feedback about us
      </h3>

      <div className=" flex flex-col bg-[#e8eaf6]  rounded-lg h-80" >
        <div className="flex flex-col md:flex-row items-start">
          {/* Image Container */}
          <div className="m-17 md:w-80 h-80 border-2 border-teal-400 rounded-lg  flex-shrink-0">
            <img
              src={photo}
              alt={name}
              className="photo object-cover m-2 w-full h-full rounded-lg"
            />
          </div>

          {/* Review Container */}
          <div className="s:flex-1 p-8 rounded-lg  mt-20 mr-30  ml-30 flex items-center justify-center" >
            <p className="text-xl text-gray-700 leading-relaxed ">
               "{review}"
            </p>
          </div>
        </div>

        {/* Name and Customer Info Container - Below the image */}
        <div className="  flex items-center justify-between ">
          <div>
            <p className="ml-150 font-semibold text-gray-900 text-lg">{name}</p>
            <p className="ml-150 text-sm text-gray-500">HAMSA Customer</p>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <button onClick={prevSlide} aria-label="Previous slide" className="hover:text-teal-600 transition-colors">
              <FaArrowLeft size={20} />
            </button>
            <button onClick={nextSlide} aria-label="Next slide" className="hover:text-teal-600 transition-colors">
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Feedback;