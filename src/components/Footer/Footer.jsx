import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <>
            <hr/>
            <footer className='w-full flex flex-col md:flex-row gap-8 md:justify-around items-center h-[25vh] md:h-fit mb-20 md:mb-7 mt-8 '>
                <div className='flex flex-col items-center'>
                    <h1 className='text-[#0D99FF] font-bold text-[30px] cursor-default'>intrista</h1>
                    <h3 style={{fontFamily: "Caveat"}} className='text-2xl cursor-default'>your everyday blog!</h3>
                </div>

                <div className='flex gap-16 items-center'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-gray-500 cursor-default'>Support</span>
                        <ul className='font-medium flex flex-col gap-1'>
                            <li className='cursor-pointer w-fit'>Help</li>
                            <li className='cursor-pointer w-fit'>Customer Support</li>
                            <li className='cursor-pointer w-fit'>Contact Us</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-gray-500 cursor-default'>Legals</span>
                        <ul className='font-medium flex flex-col gap-1'>
                            <li className='cursor-pointer w-fit'>Terms & Conditions</li>
                            <li className='cursor-pointer w-fit'>Privacy Policy</li>
                            <li className='cursor-pointer w-fit'>Licensing</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
