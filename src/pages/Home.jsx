import React from 'react'
import { Home as HomeComponent } from '../components'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <HomeComponent />
  )
}

export default Home
