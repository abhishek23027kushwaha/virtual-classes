import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseData?.length) {
      setPopularCourses(courseData.slice(0, 6));
    }
  }, [courseData]);

  return (
    <div className="w-full flex flex-col items-center py-12 relative">
      
      {/* Heading */}
      <h1 className="md:text-[45px] text-[28px] font-semibold text-center">
        Our Popular Courses
      </h1>

      <p className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-6 mb-10 px-4 text-gray-500">
        Explore top-rated courses designed to boost your skills, enhance careers,
        and unlock opportunities in tech, AI, business, and beyond.
      </p>

      {/* Cards Grid */}
      <div className="w-full max-w-[1400px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-6">
        {popularCourses.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            category={item.category}
            reviews={item.reviews}
          />
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/allcourses")}
        className="mt-14 px-6 py-3 bg-black text-white rounded-lg text-[17px] 
                   flex items-center gap-2 hover:bg-gray-800 transition"
      >
        View all Courses
        <SiViaplay className="w-6 h-6 fill-white" />
      </button>

    </div>
  );
}

export default Cardspage;
