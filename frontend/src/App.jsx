import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AllCourses from "./pages/Allcourses.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import ViewLecture from "./pages/ViewLecture.jsx";
import SearchWithAi from "./pages/SearchWithAi.jsx";
import EnrolledCourse from "./pages/EnrolledCourse.jsx";

// admin pages
import Dashboard from "./pages/Admin/DashBoard.jsx";
import Courses from "./pages/Admin/Courses.jsx";
import CreateCourse from "./pages/Admin/CreateCourse.jsx";
import AddCourses from "./pages/Admin/AddCourses.jsx";
import CreateLecture from "./pages/Admin/CreateLecture.jsx";
import EditLecture from "./pages/Admin/EditLecture.jsx";

// hooks
import getCurrentUser from "./customhooks/getCurrentUser.jsx"
import getCreatorCourseData from "./customhooks/getCreatorCourseData .jsx";
import useGetCourseData from "./customhooks/useGetCourseData.jsx";

const App = () => {
  const { userData } = useSelector((state) => state.user);

  // custom hooks
  getCurrentUser();
  getCreatorCourseData();
  useGetCourseData();

  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* user protected */}
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signup" />}
      />
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to="/signup" />}
      />
      <Route
        path="/allcourses"
        element={userData ? <AllCourses /> : <Navigate to="/signup" />}
      />
      <Route
        path="/viewcourse/:courseId"
        element={userData ? <ViewCourse /> : <Navigate to="/signup" />}
      />
      <Route
        path="/viewlecture/:courseId"
        element={userData ? <ViewLecture /> : <Navigate to="/signup" />}
      />
      <Route
        path="/enrolledcourses"
        element={userData ? <EnrolledCourse /> : <Navigate to="/signup" />}
      />
      <Route
        path="/searchwithai"
        element={userData ? <SearchWithAi /> : <Navigate to="/signup" />}
      />

      {/* educator protected */}
      <Route
        path="/dashboard"
        element={
          userData?.role === "educator" ? (
            <Dashboard />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/courses"
        element={
          userData?.role === "educator" ? (
            <Courses />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/createcourses"
        element={
          userData?.role === "educator" ? (
            <CreateCourse />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/addcourses/:courseId"
        element={
          userData?.role === "educator" ? (
            <AddCourses />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/createlecture/:courseId"
        element={
          userData?.role === "educator" ? (
            <CreateLecture />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/editlecture/:courseId/:lectureId"
        element={
          userData?.role === "educator" ? (
            <EditLecture />
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
    </Routes>
  );
};

export default App;
