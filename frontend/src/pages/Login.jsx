import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { serverUrl } from '../App.jsx'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/utils/firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { motion, AnimatePresence } from 'framer-motion'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [googleUserData, setGoogleUserData] = useState(null)
    const [role, setRole] = useState("student")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) return toast.error("Please fill all fields")
        
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
            dispatch(setUserData(result.data))
            toast.success("Welcome back!")
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    const firebaseGoogleAuth = async () => {
        setGoogleLoading(true)
        try {
            const response = await signInWithPopup(auth, provider)
            const { displayName, email, photoURL } = response.user
            
            // Try logging in first
            try {
                const result = await axios.post(serverUrl + "/api/auth/googlesignup", { 
                    name: displayName, 
                    email, 
                    photoUrl: photoURL 
                }, { withCredentials: true })
                
                dispatch(setUserData(result.data))
                toast.success("Login Successful")
                navigate("/")
            } catch (error) {
                // If role is required (new user), show role selection
                if (error.response?.status === 400 && error.response.data.message.includes("Role is required")) {
                    setGoogleUserData({ name: displayName, email, photoUrl: photoURL })
                    setShowRoleModal(true)
                } else {
                    toast.error(error.response?.data?.message || "Google Login failed")
                }
            }
        } catch (error) {
            console.error(error)
            toast.error("Google Authentication cancelled")
        } finally {
            setGoogleLoading(false)
        }
    }

    const handleGoogleSignUpWithRole = async () => {
        if (!googleUserData) return
        setGoogleLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/googlesignup", { 
                ...googleUserData, 
                role 
            }, { withCredentials: true })
            
            dispatch(setUserData(result.data))
            toast.success(`Account created as ${role}!`)
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
        } finally {
            setGoogleLoading(false)
            setShowRoleModal(false)
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
                    <div className='mb-8'>
                        <motion.h1 
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                        >
                            Welcome Back
                        </motion.h1>
                        <p className='text-gray-500 mt-2'>Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleLogin} className='space-y-5'>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Email Address</label>
                            <input 
                                type="email" 
                                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none bg-gray-50'
                                placeholder='name@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='space-y-2 relative'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Password</label>
                            <div className='relative'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none bg-gray-50'
                                    placeholder='••••••••'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors'
                                >
                                    {showPassword ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <span 
                                onClick={() => navigate("/forgotpassword")}
                                className='text-sm text-purple-600 hover:text-purple-800 cursor-pointer font-medium transition-colors'
                            >
                                Forgot password?
                            </span>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading || googleLoading}
                            className='w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
                        </button>
                    </form>

                    <div className='my-8 flex items-center gap-4'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='text-gray-400 text-sm font-medium'>OR</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    <button 
                        onClick={firebaseGoogleAuth}
                        disabled={loading || googleLoading}
                        className='w-full py-3 border-2 border-gray-100 rounded-xl flex items-center justify-center gap-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98]'
                    >
                        {googleLoading ? <ClipLoader size={20} color='#4F46E5' /> : <><FcGoogle size={24} /> Continue with Google</>}
                    </button>

                    <p className='text-center mt-8 text-gray-600'>
                        Don't have an account? 
                        <span 
                            onClick={() => navigate("/signup")}
                            className='ml-1 text-purple-600 font-bold cursor-pointer hover:underline underline-offset-4'
                        >
                            Create one
                        </span>
                    </p>
                </div>

                {/* Right Side - Branding/Decoration */}
                <div className='hidden md:flex md:w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-700 p-12 text-white flex-col justify-between relative overflow-hidden'>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='relative z-10'
                    >
                        <div className='bg-white/10 w-20 h-20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-xl'>
                            <img src={logo} className='w-14 h-14 object-contain rounded-lg' alt="Logo" />
                        </div>
                        <h2 className='text-4xl font-bold leading-tight'>Master New Skills <br /> With Expert Tutors</h2>
                        <p className='mt-4 text-indigo-100 text-lg'>Join thousands of students and start your learning journey today.</p>
                    </motion.div>

                    <div className='relative z-10'>
                        <div className='flex items-center gap-4'>
                            <div className='flex -space-x-3'>
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className='w-10 h-10 rounded-full border-2 border-indigo-400 bg-indigo-300 flex items-center justify-center text-xs font-bold'>U{i}</div>
                                ))}
                            </div>
                            <p className='text-sm text-indigo-100 font-medium'>Joined by 10k+ students</p>
                        </div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className='absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
                    <div className='absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl'></div>
                </div>
            </motion.div>

            {/* Role Selection Modal for Google Sign Up */}
            <AnimatePresence>
                {showRoleModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className='bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100'
                        >
                            <h3 className='text-2xl font-bold text-gray-800 text-center'>Choose Your Role</h3>
                            <p className='text-gray-500 text-center mt-2 mb-8'>To complete your registration, please select how you'll use the platform.</p>
                            
                            <div className='space-y-4'>
                                <button 
                                    onClick={() => setRole("student")}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${role === 'student' ? 'border-purple-600 bg-purple-50' : 'border-gray-100 hover:border-purple-200'}`}
                                >
                                    <div className='text-left'>
                                        <p className='font-bold text-gray-800'>Student</p>
                                        <p className='text-xs text-gray-500'>I want to learn skills</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${role === 'student' ? 'border-purple-600 bg-purple-600' : 'border-gray-200'}`}>
                                        {role === 'student' && <div className='w-2 h-2 bg-white rounded-full' />}
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setRole("educator")}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${role === 'educator' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                                >
                                    <div className='text-left'>
                                        <p className='font-bold text-gray-800'>Educator</p>
                                        <p className='text-xs text-gray-500'>I want to teach courses</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${role === 'educator' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-200'}`}>
                                        {role === 'educator' && <div className='w-2 h-2 bg-white rounded-full' />}
                                    </div>
                                </button>
                            </div>

                            <button 
                                onClick={handleGoogleSignUpWithRole}
                                disabled={googleLoading}
                                className='w-full mt-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center'
                            >
                                {googleLoading ? <ClipLoader size={20} color='white' /> : "Complete Registration"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Login
