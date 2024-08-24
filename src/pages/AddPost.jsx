import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PostForm } from "../components"

function AddPost() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <PostForm />
  )
}

export default AddPost
