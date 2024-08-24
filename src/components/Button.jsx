import React from 'react'

function Button({type, text, className, ...props}) {
    
  return (
    <button type={type} {...props} className={`px-3 py-1.5 rounded-md font-semibold ${className}`}>
        {text}
    </button>
  )
}

export default Button
