import { useState } from "react"
import Animation from "./components/Animation"
import { Loader, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "@/redux/slices/authSlice"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();
    const { isLoading } = useSelector((store) => store.auth)
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(forgotPassword(email))
            setSubmitted(true)
        } catch (error) {
            console.log(error)
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
                {submitted ? (
                    <div className="form flex flex-col gap-2 w-full h-[90vh] justify-center items-center">
                        <div className="w-full max-w-sm bg-white bg-opacity-40 flex flex-col gap-4 justify-center items-center h-[80%] rounded-xl p-6">
                            <h1 className="text-center text-[#47136b] text-2xl font-bold">Password Reset</h1>
                            <Mail className="w-12 h-12 text-[#47136b]" />
                            <p className="text-center text-black text-lg">
                                If an account exists for <span className="font-bold">{email}</span>, you will receive a password reset email.
                            </p>
                            <Link to="/" className="text-gray-320 text-xs decoration-none hover:underline self-end mt-2 font-semibold">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="form flex flex-col gap-2 w-full h-[90vh] justify-center">
                        <form className="w-full max-w-sm bg-white bg-opacity-40 flex flex-col gap-4 justify-center items-center h-[80%] rounded-xl p-6" onSubmit={handleSubmit}>
                            <h1 className="text-center text-[#47136b] text-2xl font-bold">Forgot Password</h1>

                            <div className="flex flex-col gap-2 mt-3 w-[90%]">
                                <div className="flex items-center border border-gray-600 bg-transparent backdrop-blur rounded-lg">
                                    <Mail className="w-6 h-6 text-[#47136b] ml-3" />
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

                            <button type="submit" disabled={isLoading} className="w-[90%] py-3 bg-[#47136b] text-white font-semibold rounded-lg hover:bg-purple-800 transition duration-300 text-transform uppercase letterspacing-[0.5px] cursor-pointer flex items-center justify-center">
                                {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Send Reset Link"}
                            </button>

                            <Link to="/" className="text-gray-320 text-xs decoration-none hover:underline self-end mt-2 font-semibold">
                                Back to Login
                            </Link>
                        </form>
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default ForgotPassword
