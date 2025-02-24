import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/AuthPages/Login"
import ForgetPassword from "./pages/AuthPages/ForgetPassword"
import { ToastContainer } from "react-toastify"
import ResetPassword from "./pages/AuthPages/ResetPassword"
import Dashboard from "./pages/Dashboard/Dashboard"
import { useDispatch } from "react-redux"
import axios from "axios"
import { BASE_URL } from "./utils/constant"
import { useEffect } from "react"

import { addUser } from "./redux/slices/userSlice"
import Navbar from "./components/Navbar"

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const viewUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true })
      // console.log(response.data.user)
      dispatch(addUser({
        user: response.data.user
      }))
      navigate('/dashboard')
    } catch (error) {
      // console.log(error)
      if (error.response.data.message === 'No Token, Access Denied') {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    viewUser()
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={ <ForgetPassword/> } />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
