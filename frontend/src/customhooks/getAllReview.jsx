import { serverUrl } from '@/App'
import { setAllReview } from '@/redux/reviewSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllReview = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllReview = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/review/allReview`,
        )
        dispatch(setAllReview(res.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllReview()
  }, [dispatch])
}

export default useGetAllReview
