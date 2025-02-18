import { Routes, Route } from "react-router-dom"
import Login from "./pages/AuthPages/Login"
import ForgetPassword from "./pages/AuthPages/ForgetPassword"
import { ToastContainer } from "react-toastify"
import ResetPassword from "./pages/AuthPages/ResetPassword"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={ <ForgetPassword/> } />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
