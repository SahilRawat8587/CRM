import React from 'react'
import './components/Login.css'

const Login = () => {
  return (
    <div>
        <div className="fixed w-screen h-screen top-0 left-0 bg-[#A82EFF] overflow-hidden">
      <ul className="asolute w-full h-full z-0">
        {[...Array(30)].map((_, index) => (
          <li
            key={index}
            className="absolute list-none bg-white/20 rounded-xl animate-floating"
            style={{
              left: `${Math.random() * 90}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              bottom: `-${Math.random() * 150}px`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          ></li>
        ))}
      </ul>
      <div className=" absolute w-full h-full z-10 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col md:flex-row w-[80vw] h-[90vh] bg-transparent justify-center items-center gap-4">
            <div className="welcome-container flex flex-col gap-1 w-full">
                <h2 className=" text-left text-3xl font-bold text-white ">WELCOME TO</h2>
                <h1 className="text-center text-8xl font-bold text-[#47136b]">MARKETING</h1>
                <h2 className="text-right text-7xl font-bold text-white">EXL</h2>
            </div>
            <div className="form flex flex-col gap-2 w-full h-[90vh] justify-center"><form className="w-full max-w-sm bg-white bg-opacity-40 flex flex-col gap-4 justify-center items-center h-[80%] rounded-xl" action="">
            <h1 className="text-center text-[#47136b] text-2xl font-bold">Login</h1>

            <div className="flex flex-col gap-2 mt-3 w-[90%]">
                {/* <label htmlFor="email" className="font-semibold"> Email </label> */}
                <input 
                    type="email" 
                    required
                    placeholder="Enter your email"
                    className=" px-4 py-3 border border-gray-600 bg-transparent backdrop-blur text-black m-[8px 0] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-current"
                    
                />
            </div>
            <select
              id="packages"
              name="packages"
              className="w-[90%] px-4 text-black py-3 border border-gray-600 m-[8px 0] bg-transparent backdrop-blur rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
            >
              <option value="" disabled selected className="text-[#47136b] bg-purple-500 ">
                --- Role ---
              </option>
              <option value="Admin" className='text-white  bg-[#111]  p-1'>Admin</option>
              <option value="Manager" className='text-white  bg-[#111]   p-1'>Manager</option>
              <option value="Employee" className='text-white  bg-[#111]   p-1'>Employee</option>
            </select>
            <div className=" flex flex-col gap-2 w-[90%]">
                {/* <label htmlFor="password" className="font-semibold"> Password </label> */}
                <input 
                    type="password" 
                    required
                    placeholder="Enter your password"
                    className=" px-4 py-3 border border-gray-600 m-[8px 0] bg-transparent backdrop-blur text-black rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-current"
                  
                />
                <a className='text-gray-320 text-xs decoration-none hover:underline self-end' href="#">Forgot Your Password?</a>
            </div>

            <button type="submit" className="w-[80%] py-3 bg-[#47136b] text-white font-semibold rounded-lg hover:bg-purple-800 transition duration-300 text-transform uppercase letterspacing-[0.5px] cursor-pointer">
                Login
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
