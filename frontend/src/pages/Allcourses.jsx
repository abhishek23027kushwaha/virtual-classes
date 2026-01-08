import React, { useEffect, useState } from 'react'
import Card from "../components/Card.jsx"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux'

function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [category, setCategory] = useState([])
  const [filterCourses, setFilterCourses] = useState([])

  const navigate = useNavigate()
  const { courseData } = useSelector(state => state.course)

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const applyFilter = () => {
    let courseCopy = [...courseData]

    if (category.length > 0) {
      courseCopy = courseCopy.filter(item =>
        category.includes(item.category)
      )
    }

    setFilterCourses(courseCopy)
  }

  useEffect(() => {
    setFilterCourses(courseData)
  }, [courseData])

  useEffect(() => {
    applyFilter()
  }, [category])

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="fixed top-[90px] left-4 z-50 md:hidden bg-black text-white px-4 py-2 rounded-lg shadow"
      >
        {isSidebarVisible ? "Close Filters" : "Open Filters"}
      </button>

      <div className="flex pt-[120px]">

        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-auto w-[260px] bg-black text-white p-5 
          transform transition-transform duration-300 z-40
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaArrowLeftLong
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h2 className="text-lg font-semibold">Filter Courses</h2>
          </div>

          <button
            onClick={() => navigate("/searchwithai")}
            className="w-full mb-6 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-3 py-2 rounded-lg"
          >
            Search with AI
            <img src={ai} className="w-6 h-6 rounded-full" alt="" />
          </button>

          <div className="space-y-3 text-sm">
            {[
              "App Development",
              "AI/ML",
              "AI Tools",
              "Data Science",
              "Data Analytics",
              "Ethical Hacking",
              "UI UX Designing",
              "Web Development",
              "Others",
            ].map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-3 cursor-pointer hover:text-gray-300"
              >
                <input
                  type="checkbox"
                  value={item}
                  onChange={toggleCategory}
                  className="w-4 h-4 accent-white"
                />
                {item}
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 pb-10">
          {filterCourses?.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No courses found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCourses.map((item, index) => (
                <Card
                  key={index}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  price={item.price}
                  category={item.category}
                  id={item._id}
                  reviews={item.reviews}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AllCourses
