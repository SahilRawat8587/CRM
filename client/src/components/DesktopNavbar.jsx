import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { BellIcon, HomeIcon, Settings, UserIcon } from 'lucide-react'
import { useSelector } from 'react-redux';

const DesktopNavbar = () => {
    const { user } = useSelector((store) => store.auth);
  return (
    <div className="hidden md:flex items-center space-x-4">
      

      {/* <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button> */}

      {user ? (
        <>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href='/settings'
            >
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">Settings</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          
          
        </>
      ) : (
        
          <Button variant="default">Sign In</Button>
        
      )}
    </div>
  )
}

export default DesktopNavbar
