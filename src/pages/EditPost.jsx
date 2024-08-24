import React, { useEffect, useState } from 'react'
import { PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { dbService } from '../appwrite/dbController'

function EditPost() {
    const navigate = useNavigate()
    const { postId } = useParams()
    
    const [post, setPost] = useState(null)

    useEffect(() => {
        if(postId){
            dbService.getPost(postId).then((post) => {
                if(post){
                    setPost(post)               
                }
            })
        }
        else{
            // navigate('/home')
        }
      
    }, [postId, navigate])
    

  return (
    <PostForm post={post} />
  )
}

export default EditPost
