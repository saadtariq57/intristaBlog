import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { unsetProfile } from '../../store/profileSlice';
import { userProfileService } from '../../appwrite/userProfile';

function DropdownMenu({ name, email, userImageId }) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownBtnRef = useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen)

  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !dropdownBtnRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const logoutAccount = async () => {
    let confirmed = confirm('Are you sure you want to logout?');
    if(confirmed){
      await authService.logout().then(() => {
        dispatch(logout());
        dispatch(unsetProfile());
      });
      if (location.pathname == '/home') { 
        window.location.reload()
      }
      else {
        navigate('/home');
      }
    }
  };

  const profileData = useSelector(state => state.profile.profileData)
  
  return (
    <div className="relative inline-block text-left" >
      <button ref={dropdownBtnRef} onClick={toggleDropdown}>
        <img src={userProfileService.previewImage(userImageId)} className='object-cover rounded-full size-9 hover:outline hover:outline-4 hover:outline-[#EEEEEC]' />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 w-60 mt-1 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className='py-1'>
            <Link to={`/user/${profileData.$id}`}>
              <li onClick={() => setIsOpen(false)} className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100'>
                <img src={userProfileService.previewImage(userImageId)} className='object-cover rounded-full size-9 hover:outline hover:outline-4 hover:outline-[#EEEEEC]' />
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-700'>{name}</span>
                  <span className='text-sm font-semibold text-gray-700'>{email}</span>
                </div>
              </li>
            </Link>
            <li onClick={logoutAccount} className='block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer'>Logout</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu;
