import React from 'react'
import { SignUp as SignUpComponent } from '../components'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SignUp() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SignUpComponent />
  )
}

export default SignUp
