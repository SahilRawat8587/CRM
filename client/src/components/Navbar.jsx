import { Link } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  return (
    <nav className="sticky top-0   w-full border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">


      <div className="max-w-8xl mx-auto pr-6">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center h-full w-64  pl-4 ">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              <img
                src="../../public/Images/logo marketing EXL.png"
                alt="Marketing Logo"
                className="h-8"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <DesktopNavbar />

            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
