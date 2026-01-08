import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const {userData} = useSelector(store=>store.user)
  const {creatorCourseData} = useSelector(store=>store.course);
  console.log(creatorCourseData);
  // const courseProressData = creatorCourseData.map(((course)=>{
  //     name:course.title?.slice(0,10) + "..."
  //     lectures:course.lectures?.length || 0

  // })) || []
  
  //   const EnrollData = creatorCourseData.map(((course)=>{
  //     name:course.title?.slice(0,10) + "..."
  //     enrolled:course.enrolledStudents?.length || 0

  // })) || []
  // ✅ Dummy User Data (backend removed)
  // const userData = {
  //   name: "Educator",
  //   description: "Start creating amazing courses for your students!",
  //   photoUrl: img,
  // };

  // // ✅ Dummy Course Data (backend removed)
  // const creatorCourseData = [
  //   {
  //     title: "React Mastery",
  //     lectures: Array(25),
  //     enrolledStudents: Array(120),
  //     price: 499,
  //   },
  //   {
  //     title: "Node Backend",
  //     lectures: Array(18),
  //     enrolledStudents: Array(80),
  //     price: 699,
  //   },
  //   {
  //     title: "MongoDB",
  //     lectures: Array(12),
  //     enrolledStudents: Array(50),
  //     price: 399,
  //   },
  // ];

  // 📊 Charts Data
  const courseProgressData = creatorCourseData.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length,
  }));

  const enrollData = creatorCourseData.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents.length,
  }));

  // 💰 Total Earnings
  const totalEarnings = creatorCourseData.reduce((sum, course) => {
    return sum + course.price * course.enrolledStudents.length;
  }, 0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Back Button */}
      <FaArrowLeftLong
        className="w-[22px] h-[22px] absolute top-[10%] left-[10%] cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">

        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.photoUrl}
            alt="Educator"
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
          />

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData.name} 👋
            </h1>

            <h2 className="text-xl font-semibold text-gray-800">
              Total Earning :
              <span className="font-light text-gray-900">
                ₹{totalEarnings.toLocaleString()}
              </span>
            </h2>

            <p className="text-gray-600 text-sm">
              {userData.description}
            </p>

            <button
              onClick={() => navigate("/courses")}
              className="px-4 py-2 border-2 bg-black border-black text-white rounded-lg text-sm cursor-pointer"
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Course Progress (Lectures)
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData }>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Student Enrollment
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
