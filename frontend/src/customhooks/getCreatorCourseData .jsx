import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'
import { toast } from 'react-toastify'
import { serverUrl } from '../App'

const useGetCreatorCourseData = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true }
        )

        dispatch(setCreatorCourseData(result.data))
        console.log(result.data)

      } catch (error) {
        console.log(error)
        // Only toast if it's not a token issue (which might happen on login transition)
        // or if the user actually expects to be logged in and see their courses.
        if (error?.response?.status !== 400 && error?.response?.status !== 401) {
          toast.error(
            error?.response?.data?.message || "Something went wrong"
          )
        }
      }
    }

    if (userData && userData.role === 'educator') {
      getCreatorData()
    }
  }, [userData, dispatch])
}

export default useGetCreatorCourseData
