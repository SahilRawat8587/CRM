import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Authpages/Login"
import ForgotPassword from "./pages/Authpages/ForgotPassword"
import ResetPassword from "./pages/Authpages/ResetPassword"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./redux/slices/authSlice"
import LoadingSpinner from "./components/LoadingSpinner"
import Dashboard from "./pages/Dashboard/Dashboard"

// Redirect unauthenticated user to login page
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth)

  if (!isAuthenticated && !user) {
    return <Navigate to="/" replace/>
  }

  return children;
}

// Redirect authenticated user to dashboard
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth)

  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />
  }

  return children;
}

function App() {

  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((store) => store.auth)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if ( isCheckingAuth ) return <LoadingSpinner />

  return (
    <>
      <Routes>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
         <Route 
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
