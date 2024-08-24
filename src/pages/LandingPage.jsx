import React from 'react'
import { HomeLogedOut } from '../components'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function LandingPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <HomeLogedOut />
  )
}

export default LandingPage
