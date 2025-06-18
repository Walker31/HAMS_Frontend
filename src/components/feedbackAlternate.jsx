import { useState } from "react";
import sampleFeedbacks from "../constants/feedback";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FeedbackAlternate=() =>{
    const feedbacks = sampleFeedbacks;
    const [current,setCurrent] = useState(0);
    const length = feedbacks.length;

    if(!Array.isArray(feedbacks) || length ===0) return null;

    const { photo,review,name } = feedbacks[current];

    const nextSlide = () => setCurrent(prev => (prev === length-1?0:prev+1));
    const prevSlide= () => setCurrent(prev => (prev===0 ? length-1 : prev-1));
    return <>
    <div className="max-w-7xl mx-auto">
        <h3 className=" text-2xl font-bold text-blue-900 p-4">
        Our  <span className="text-teal-600"> patients'</span> feedback about us
      </h3>
      <div className="bg-white">
        <div className="bg-[#e8eaf6] flex flex-row h-80">
          <div className="flex flex-1/3 mt-10 ml-10 z-50">
          <div className="rounded-2xl ">
            <div className="border-teal-600 pt-2 pl-2 border-t-2 border-l-2 rounded-2xl">
              <img
              src={photo}
              alt={name}
              className="object-cover m-1 w-80 h-60 sm:h-72 md:h-80 rounded-2xl"
            />
            </div>
            
          </div>
            
          </div>
          <div className=" flex-2/3 s:flex-1 p-8 rounded-lg m-auto flex items-center justify-center" >
            <p className="text-xl text-gray-700 leading-relaxed ">
               "{review} " 
            </p>
          </div>
        </div>
        <div className="flex flex-1/2 m-3 p-4">
          <div className="flex w-full justify-between items-center">
            {/* Name & Tag */}
            <div></div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 text-lg">{name}</p>
              <p className="text-sm text-gray-500">HAMSA Customer</p>
            </div>

            {/* Arrows */}
            <div className="flex flex-row gap-5 text-gray-600">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="hover:text-teal-600 transition-colors"
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="hover:text-teal-600 transition-colors"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default FeedbackAlternate;