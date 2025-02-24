import { useState } from "react"
import Animation from "./components/Animation"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Eye, EyeOff, Loader, Lock } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { resetPassword } from "@/redux/slices/authSlice"

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const { error, isLoading, message } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        try {
            await dispatch(resetPassword({ token, password }));
            toast.success("Password reset successful")
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            toast.error(error.message || "Failed to reset password")
        }
    }
    return (
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
                    <form className="w-full max-w-sm bg-white bg-opacity-40 flex flex-col gap-4 justify-center items-center h-[80%] rounded-xl p-6" onSubmit={handleSubmit}>
                        <h1 className="text-center text-[#47136b] text-2xl font-bold">Reset Password</h1>
                        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                        {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}
                        <div className="flex flex-col gap-2 mt-3 w-[90%]">
                            <div className="flex items-center border border-gray-600 bg-transparent backdrop-blur rounded-lg relative">
                                <Lock className="w-6 h-6 text-[#47136b] ml-3" />
                                <input
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                placeholder="Enter new password"
                                className="flex-1 px-4 py-3 bg-transparent text-black rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-transparent placeholder-current"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {isPasswordVisible ? <Eye className="w-6 h-6 text-[#47136b]" /> : <EyeOff className="w-6 h-6 text-[#47136b]" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-3 w-[90%]">
                            <div className="flex items-center border border-gray-600 bg-transparent backdrop-blur rounded-lg relative">
                                <Lock className="w-6 h-6 text-[#47136b] ml-3" />
                                <input
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                placeholder="Confirm new password"
                                className="flex-1 px-4 py-3 bg-transparent text-black rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-transparent placeholder-current"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {isPasswordVisible ? <Eye className="w-6 h-6 text-[#47136b]" /> : <EyeOff className="w-6 h-6 text-[#47136b]" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-[90%] py-3 bg-[#47136b] text-white font-semibold rounded-lg hover:bg-purple-800 transition duration-300 text-transform uppercase letterspacing-[0.5px] cursor-pointer flex items-center justify-center">
                            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Reset Password"}
                        </button>

                        <Link to="/login" className="text-gray-320 text-xs decoration-none hover:underline self-end mt-2 font-semibold">
                            Back to Login
                        </Link>
                    </form>
                </div>
            
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
