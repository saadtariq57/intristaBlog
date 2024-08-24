import React from 'react'

const Input = React.forwardRef( function Input({
    placeholder,
    type,
    className,
    ...props
}, ref) {
  return (
    <div>
      <input 
        type={type} 
        placeholder={placeholder} 
        ref={ref} 
        {...props} 
        className={`bg-gray-200 focus:bg-gray-50 outline-none px-3 py-2 rounded-lg w-full ${className}`} />
    </div>
  )
})

export default Input
