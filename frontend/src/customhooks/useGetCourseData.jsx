import axios from "axios";
import { serverUrl } from "../App.js";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice.js";
import { useEffect } from "react";

const useGetCourseData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPublishedCourses = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getpublishedcourses`,
          { withCredentials: true }
        );
         console.log(result.data);
        dispatch(setCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    getAllPublishedCourses();
  }, [dispatch]);
};

export default useGetCourseData;
