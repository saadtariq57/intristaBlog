import React, { useState, useEffect } from 'react'
import Button from '../Button'
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';


function Navbar() {
  const authStatus = useSelector(state => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const profileData = useSelector(state => state.profile.profileData)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Disable scroll on the body when the menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up when component unmounts
    };
  }, [isMenuOpen]);

  const location = useLocation()
  const navItems = [
    {
      name: "Home",
      link: "/home",
      active: true
    },
    {
      name: "About",
      link: "/about",
      active: true
    },
    {
      name: "Login",
      link: "/login",
      active: !authStatus,
      loginBtn: true
    },
    {
      name: "Sign up",
      link: "/signup",
      active: !authStatus,
      signupBtn: true
    }
  ]



  return (
    <nav className='sticky top-0 bg-white flex justify-between items-center py-3 z-50'>

      <Link to={'/home'}>
        <h1 className='hidden md:block logo text-[#0D99FF] font-bold text-[30px] ml-10 cursor-pointer'>intrista</h1>
      </Link>

      <div className={`w-full md:hidden flex  ${authStatus ? 'justify-between' : ''} items-center`}>
        <button onClick={() => setIsMenuOpen(true)} className="focus:outline-none px-3">
          <svg className="w-8 h-8 text-[#0D99FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </button>

        <Link to={'/home'}>
          <h1 className={`logo text-[#0D99FF] font-bold text-[30px] cursor-pointer ${!authStatus && 'absolute left-1/2 top-[6px] transform -translate-x-1/2'}`}>intrista</h1>
        </Link>

        {authStatus && <div className='mr-4'><DropdownMenu name={userData?.name} email={userData?.email} userImageId={profileData?.userImageId} /></div>}
      </div>

      {/* Overlay with Blur Effect */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      {/* Slider Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <div className='flex justify-end p-4'>
          <button onClick={() => setIsMenuOpen(false)} className="focus:outline-none">
            <svg className="w-8 h-8 text-[#0D99FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <ul className='flex flex-col gap-4 p-6'>
          {navItems.map(item => item.active ?
            <Link to={item.link} key={item.name} onClick={() => setIsMenuOpen(false)}>
              <li className="py-3 border-b">
                <span className="text-gray-700 font-semibold cursor-pointer">{item.name}</span>
              </li>
            </Link> : null
          )}
        </ul>
      </div>

      {/* Default menu for medium and larger screens */}
      <div className='hidden md:flex gap-3'>
        <ul className='flex gap-2 mr-3'>
          {navItems.map(item => item.active ?
            <Link to={item.link} key={item.name}>
              <li>
                <Button
                  text={item.name}
                  className={`${location.pathname === item.link ? "text-[#0D99FF]" : ""} 
                  ${item.loginBtn ? "bg-[#0D99FF] text-white hover:bg-[#58B3F6]" : item.signupBtn ? "bg-[#D9D9D9] text-black hover:bg-gray-200" : "font-semibold hover:underline cursor-pointer"}`} />
              </li>
            </Link> : null
          )}
        </ul>
        {authStatus && <div className='mr-4'><DropdownMenu name={userData?.name} email={userData?.email} userImageId={profileData?.userImageId} /></div>}
      </div>
    </nav>
  )
}

export default Navbar
