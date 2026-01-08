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
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        )
      }
    }

    if (userData) {
      getCreatorData()
    }
  }, [userData, dispatch])
}

export default useGetCreatorCourseData
