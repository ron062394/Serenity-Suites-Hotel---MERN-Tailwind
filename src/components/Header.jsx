import {React, useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    const menuButton = menuButtonRef.current;
    const closeButton = closeButtonRef.current;


    const handleMenuButtonClick = () => {
      setMenuOpen(prevState => !prevState);
    }
  
    const handleCloseButtonClick = () => {
      setMenuOpen(false);
    }

    const hadleCLickOutside = (event) => {
      if (mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target) && !closeButton.contains(event.target)) {
        setMenuOpen(false);
      }
    }
  
    menuButton.addEventListener("click", handleMenuButtonClick);
    closeButton.addEventListener("click", handleCloseButtonClick);
    document.addEventListener("click", hadleCLickOutside);
    

    return () => {
      menuButton.removeEventListener("click", handleMenuButtonClick);
      closeButton.removeEventListener("click", handleCloseButtonClick);
      document.removeEventListener("click", hadleCLickOutside);
    };
  
  }, []);


  return (
    <header className='container mx-auto px-4'>
      <div className='mb-12'>
        <div className='flex items-center justify-between px-6 py-3.5'>
          <div>
            <Link to={'/'}>
              Logo here
            </Link> 
          </div>


          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700"
            aria-label='Open mobile menu'
            ref={menuButtonRef}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>


          {/* Mobile Menu (Fixed Position) */}
          <div 
            className={`fixed inset-y-0 bg-gray-300 left-0 top-0  w-4/5 max-w-xs z-50 lg:hidden transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} 
            id="mobile-menu"
            ref={mobileMenuRef}
          >

            {/* Container for Logo and Close Button */}
            <div className='flex flex-col h-full'>
              <div className='flex justify-between '>
                <div>
                  {/* Logo in Mobile Menu */}
                  <div>
                    <Link to="/">Logo here</Link>
                  </div>
                </div>
                {/* Close Menu Icon (X) */}
                <button 
                  aria-label='Close mobile menu'
                  ref={closeButtonRef}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <nav className='flex flex-col flex-grow px-6 pt-4 pb-6 justify-between'>
                {/* Navigation Menu List */}
                <ul className='flex flex-col flex-grow space-y-6'>
                  <li><Link className='text-lg font-bold hover:text-gray-500' to={'/'}>Home</Link></li>
                  <li><Link className='text-lg font-bold hover:text-gray-500' to={'/facilities'}>Facilities</Link></li>
                  <li><Link className='text-lg font-bold hover:text-gray-500' to={'/rooms'}>Rooms</Link></li>
                  <li><Link className='text-lg font-bold hover:text-gray-500' to={'/contact-us'}>Contact-us</Link></li>
                </ul>

                {/* Buttons at the Bottom of the Mobile View */}
                <div className='flex flex-col'>
                  <Link to={"/login"}>Log In</Link>
                  <Link to={"/register"}>Get Started</Link>
                </div>
              </nav>

            </div>
          </div>


          {/* Desktop Menu */}
          <nav className='hidden lg:flex flex-wrap items-center'>
            <ul className='flex items-center justify-center'>
              <li className='mr-9'><Link className='inline-block text-sm font-bold text-gray-700 hover:text-gray-400' to={"./"}>Home</Link></li>
              <li className='mr-9'><Link className='inline-block text-sm font-bold text-gray-700 hover:text-gray-400' to={"./facilities"}>Facilities</Link></li>
              <li className='mr-9'><Link className='inline-block text-sm font-bold text-gray-700 hover:text-gray-400' to={"./rooms"}>Rooms</Link></li>
              <li className='mr-9'><Link className='inline-block text-sm font-bold text-gray-700 hover:text-gray-400' to={"./contact-us"}>Contact-us</Link></li>
            </ul>
          </nav>


          {/* Action Buttons */}
          <div className='hidden lg:flex flex-wrap -m-2'>
            <div className='w-full sm:w-auto p-2'>
              <Link to="/login">Log In</Link>
            </div>
            <div className='w-full sm:w-auto p-2'>
              <Link to="/register">Get Started</Link>
            </div>
          </div>


      	</div>
      </div>
    </header>
  )
}

export default Header
