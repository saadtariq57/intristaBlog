import React from 'react'
import { Post as PostComponent } from '../components'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Post() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <PostComponent />
  )
}

export default Post
