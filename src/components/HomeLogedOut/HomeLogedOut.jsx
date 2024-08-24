import React, { useEffect } from 'react'
import cameraBg from '../../assets/camera3.jpg';
import rightArrow from '../../assets/right-arrow.svg';
import './HomeLogedOut.css'
import { useNavigate } from 'react-router-dom';


function HomeLogedOut() {
  const navigate = useNavigate()

  useEffect(() => {
    const h1Element = document.querySelector('.levitate');
    const buttonElement = document.querySelector('.fade-in');

    h1Element.addEventListener('animationend', () => {
      buttonElement.classList.add('visible');
    });
  }, []);

  return (
    <div className='relative md:max-h-[95vh] lg:overflow-y-hidden'>
  <img className='blur-sm w-full h-[93vh] md:h-[95vh] lg:h-full object-cover' src={cameraBg} alt="camera-bg" />
  <div className='absolute inset-0 flex flex-col justify-center items-center h-[95vh]'>
    <h1 style={{ fontFamily: "Sen" }} className='text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl w-[70%] text-center text-shadow levitate'>
      Welcome to your creative space—where every idea finds its voice and every story gets its stage
    </h1> 
    <button onClick={() => navigate('/signup')} className='flex justify-center items-center mt-8 text-white bg-blue-500 px-4 py-2 rounded fade-in hover:bg-[#58B3F6]'> 
      <span>Get Started</span> 
      <img src={rightArrow} className='invert ml-2' /> 
    </button>
  </div>
</div>


  )
}

export default HomeLogedOut
