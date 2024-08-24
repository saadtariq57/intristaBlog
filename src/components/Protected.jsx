import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true, homeLoggedOut = false }) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
        

    useEffect(() => {
        if(!authStatus && homeLoggedOut){
            navigate('/')
        }
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/home')
        }

    }, [authentication, navigate, authStatus])

    return <div>{children}</div>
}

export default Protected
