import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import './components/Login.css'
import Animation from "./components/Animation"
import { useDispatch, useSelector } from "react-redux"
import { login } from "@/redux/slices/authSlice"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const { isLoading, error } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // await login(email, password)
            await dispatch(login({ email, password }))
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <div className="fixed w-screen h-screen top-0 left-0 bg-[#A82EFF] overflow-hidden">
                <Animation />
                <div className="absolute w-full h-full z-10 top-0 left-0 flex justify-center items-center">
                    <div className="flex flex-col md:flex-row w-[80vw] h-[90vh] bg-transparent justify-center items-center gap-4">
                        <div className="welcome-container flex flex-col gap-1 w-full">
                            <h2 className="text-left text-3xl font-bold text-white">WELCOME TO</h2>
                            <h1 className="text-center text-8xl font-bold text-[#47136b]">MARKETING</h1>
                            <h2 className="text-right text-7xl font-bold text-white">EXL</h2>
                        </div>
                        <div className="form flex flex-col gap-2 w-full h-[90vh] justify-center">
                            <form className="w-full max-w-sm bg-white bg-opacity-40 flex flex-col gap-4 justify-center items-center h-[80%] rounded-xl" onSubmit={handleSubmit}>
                                <h1 className="text-center text-[#47136b] text-2xl font-bold">Login</h1>

                                <div className="flex flex-col gap-2 mt-3 w-[90%]">
                                    <div className="flex items-center border border-gray-600 bg-transparent backdrop-blur rounded-lg">
                                        <Mail className='w-6 h-6 text-[#47136b] ml-3' />
                                        <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 bg-transparent text-black rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-transparent placeholder-current"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 w-[90%]">
                                    <div className="flex items-center border border-gray-600 bg-transparent backdrop-blur rounded-lg relative">
                                        <Lock className='w-6 h-6 text-[#47136b] ml-3' />
                                        <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        required
                                        placeholder="Enter your password"
                                        className="flex-1 px-4 py-3 bg-transparent text-black rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-transparent placeholder-current"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {isPasswordVisible ? <EyeOff className='w-6 h-6 text-[#47136b]' /> : <Eye className='w-6 h-6 text-[#47136b]' />}
                                        </button>
                                    </div>
                                    <Link to="/forgot-password" className='text-gray-320 text-xs decoration-none hover:underline self-end font-semibold' href="#">Forgot Password?</Link>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <button type="submit" disabled={isLoading} className="w-[80%] py-3 bg-[#47136b] text-white font-semibold rounded-lg hover:bg-purple-800 transition duration-300 text-transform uppercase letterspacing-[0.5px] cursor-pointer flex items-center justify-center">
                                    {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Login"}
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
