import axios from "axios"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"

function EditProfile() {
  const { userData } = useSelector((state) => state.user)
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const [name, setName] = useState(userData?.name || "")
  const [description, setDescription] = useState(userData?.description || "")
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  
     const updateProfile = async () => {
     const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("photoUrl",photo);

          console.log(formData)
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + "/api/user/updateprofile" ,formData , {withCredentials:true} )
        console.log(result.data)
        dispatch(setUserData(result.data))
        navigate("/")
        setLoading(false)
      
        toast.success("Profile Update Successfully")
        

        
      } catch (error) {
        console.log(error)
        toast.error("Profile Update Error")
        setLoading(false)
      }
      
     }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className="absolute top-5 left-5 w-5 h-5 cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Avatar */}
          <div className="flex justify-center">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                className="w-24 h-24 rounded-full object-cover border"
                alt=""
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* File */}
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Full Name"
          />

          {/* Email */}
          <input
            type="email"
            readOnly
            value={userData?.email}
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />

          {/* Description */}
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="About you"
          />

          <button
            disabled={loading}
            onClick={updateProfile}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
