import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { serverUrl } from '../App.jsx'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/utils/firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { motion } from 'framer-motion'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) return toast.error("Please fill all fields")
        
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })
            dispatch(setUserData(result.data))
            toast.success("Account created successfully!")
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    const firebaseGoogleAuth = async () => {
        setGoogleLoading(true)
        try {
            const response = await signInWithPopup(auth, provider)
            const { displayName, email, photoURL } = response.user
            
            const result = await axios.post(serverUrl + "/api/auth/googlesignup", { 
                name: displayName, 
                email, 
                role,
                photoUrl: photoURL 
            }, { withCredentials: true })
            
            dispatch(setUserData(result.data))
            toast.success("Welcome aboard!")
            navigate("/")
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Google registration failed")
        } finally {
            setGoogleLoading(false)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 font-[Outfit]'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row'
            >
                {/* Left Side - Form */}
                <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
                    <div className='mb-6'>
                        <motion.h1 
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                        >
                            Get Started
                        </motion.h1>
                        <p className='text-gray-500 mt-2'>Join our community of learners and educators</p>
                    </div>

                    <form onSubmit={handleSignUp} className='space-y-4'>
                        <div className='space-y-1'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Full Name</label>
                            <input 
                                type="text" 
                                className='w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none bg-gray-50'
                                placeholder='John Doe'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Email Address</label>
                            <input 
                                type="email" 
                                className='w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none bg-gray-50'
                                placeholder='name@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='space-y-1 relative'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Password</label>
                            <div className='relative'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className='w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none bg-gray-50'
                                    placeholder='••••••••'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600'
                                >
                                    {showPassword ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className='py-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1 block mb-2'>I want to join as a:</label>
                            <div className='flex gap-4'>
                                <button 
                                    type="button"
                                    onClick={() => setRole("student")}
                                    className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all ${role === 'student' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-500 hover:border-purple-200'}`}
                                >
                                    Student
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setRole("educator")}
                                    className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all ${role === 'educator' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500 hover:border-indigo-200'}`}
                                >
                                    Educator
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading || googleLoading}
                            className='w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center'
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "Create Account"}
                        </button>
                    </form>

                    <div className='my-6 flex items-center gap-4'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='text-gray-400 text-sm font-medium'>OR</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    <button 
                        onClick={firebaseGoogleAuth}
                        disabled={loading || googleLoading}
                        className='w-full py-3 border-2 border-gray-100 rounded-xl flex items-center justify-center gap-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98]'
                    >
                        {googleLoading ? <ClipLoader size={20} color='#4F46E5' /> : <><FcGoogle size={24} /> Sign up with Google</>}
                    </button>

                    <p className='text-center mt-6 text-gray-600 text-sm'>
                        Already have an account? 
                        <span 
                            onClick={() => navigate("/login")}
                            className='ml-1 text-purple-600 font-bold cursor-pointer hover:underline underline-offset-4'
                        >
                            Log In
                        </span>
                    </p>
                </div>

                {/* Right Side - Branding/Decoration */}
                <div className='hidden md:flex md:w-1/2 bg-gradient-to-tr from-purple-600 to-indigo-700 p-12 text-white flex-col justify-between relative overflow-hidden'>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='relative z-10'
                    >
                        <div className='bg-white/10 w-20 h-20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-xl'>
                            <img src={logo} className='w-14 h-14 object-contain rounded-lg' alt="Logo" />
                        </div>
                        <h2 className='text-4xl font-bold leading-tight'>Unlock Your <br /> Full Potential</h2>
                        <p className='mt-4 text-indigo-100 text-lg'>Access high-quality courses and learn at your own pace from anywhere.</p>
                    </motion.div>

                    <div className='relative z-10 space-y-6'>
                        <div className='space-y-4'>
                            {[
                                "Expert-led video courses",
                                "Interactive assignments",
                                "Lifetime access to content"
                            ].map((text, i) => (
                                <div key={i} className='flex items-center gap-3'>
                                    <div className='w-5 h-5 rounded-full bg-green-400 flex items-center justify-center'>
                                        <svg className="w-3 h-3 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span className='font-medium text-purple-50'>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className='absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
                    <div className='absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl'></div>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp

