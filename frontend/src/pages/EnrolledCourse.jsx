import React  from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
     console.log(userData);
  return (
    <div className="min-h-screen w-full p-4 md:p-10 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <FaArrowLeftLong />
          <span className="text-sm font-medium">Back to Courses</span>
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          My Enrolled Courses
        </h1>

      {userData?.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          You haven’t enrolled in any course yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userData?.enrolledCourses?.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{course.category}</p>
                <p className="text-sm text-gray-700">{course.level}</p>
                <h1 className='px-[10px] text-center  py-[10px] border-2  bg-black border-black text-white  rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer mt-[10px] hover:bg-gray-600' onClick={()=>navigate(`/viewlecture/${course._id}`)}>Watch Now</h1>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}

export default EnrolledCourse
