import React from 'react'
import { MdModeEditOutline } from "react-icons/md";

function EditBtn() {
  return (
    <div className='bg-gray-300 hover:bg-gray-400 opacity-80 w-fit p-1.5 rounded-full cursor-pointer'>
        <MdModeEditOutline className='text-gray-700 text-2xl'/>
    </div>
  )
}

export default EditBtn
