import React from 'react'
import { Login as LoginComponent } from '../components'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function Login() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <LoginComponent />
  )
}

export default Login
