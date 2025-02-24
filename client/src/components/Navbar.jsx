import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full bg-black backdrop-blur-lg z-50 transition-opacity duration-300 py-2">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center md:px-4 px-0">
                        <Link
                            to="/dashboard"
                            className="text-xl font-bold text-primary font-poppins tracking-wider"
                        >
                            {/* <img src="/images/logo.png" alt="" /> */}
                            logo
                        </Link>
                    </div>

                    {/* <DesktopNavbar /> */}
                    {/* <Button className="hidden md:block">Get Started</Button> */}
                    {/* <MobileNavbar /> */}
                </div>
            </div>
        </nav>
  )
}

export default Navbar
