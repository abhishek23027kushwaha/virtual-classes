import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";

function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const {userData} = useSelector((state) => state.user)
  const selectedCourse = courseData?.find((course) => course._id === courseId);

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  const navigate = useNavigate()
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8">
     
      <div className="w-full lg:w-3/4 bg-white rounded-3xl shadow-xl overflow-hidden p-0 border border-gray-100">
        {/* Course Details Header */}
        <div className="p-6 md:p-8 bg-white border-b border-gray-100">
        {/* Course Details */}
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mb-4 text-gray-500 hover:text-black transition-colors"
            >
              <FaArrowLeftLong />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              {selectedCourse?.title}
            </h1>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider">
              {selectedCourse?.category}
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold uppercase tracking-wider">
              {selectedCourse?.level}
            </span>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="p-4 md:p-8">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-50">
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white opacity-40">
                <FaPlayCircle size={64} className="mb-4" />
                <p className="font-medium">Select a lecture to start watching</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-900">{selectedLecture?.lectureTitle}</h2>
          </div>
        </div>
      </div>

      {/* Right - All Lectures + Creator Info */}
      <div className="w-full lg:w-1/4 flex flex-col gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 h-fit max-h-[calc(100vh-8rem)] flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            Course Content
          </h2>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? 'bg-gray-200 border-gray-500'
                    : 'hover:bg-gray-50 border-gray-300'
                }`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h4>
                  
                </div>
                <FaPlayCircle className="text-black text-xl" />
              </button>
            ))
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* Creator Info */}
        {courseCreator && (
  <div className="mt-4 border-t pt-4">
    <h3 className="text-md font-semibold text-gray-700 mb-3">Instructor</h3>
    <div className="flex items-center gap-4">
      <img
        src={courseCreator.photoUrl || '/default-avatar.png'}
        alt="Instructor"
        className="w-14 h-14 rounded-full object-cover border"
      />
      <div>
        <h4 className="text-base font-medium text-gray-800">{courseCreator.name}</h4>
        <p className="text-sm text-gray-600">
          {courseCreator.description || 'No bio available.'}
        </p>
      </div>
    </div>
  </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default ViewLecture;
