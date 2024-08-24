import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { dbService } from '../appwrite/dbController'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import avatarPng from '../assets/avatar.png'
import { userProfileService } from '../appwrite/userProfile';



function Post() {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const { profileId } = useParams()
    const [profile, setProfile] = useState(null)
    useEffect(() => {
        if(profileId){
            userProfileService.getUserProfile(profileId).then(profileRes => {
                if(profileRes){
                    setProfile(profileRes)
                }
            })
        }
    }, [profileId])
    
    
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    useEffect(() => {
        if (postId) {
            dbService.getPost(postId).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        }
        else {
            navigate('/home')
        }

    }, [navigate, postId])

    const isAuthor = post?.userId === userData?.$id
    





    const deletePost = async (postId) => {
        const confirmed = confirm("Do you want to delete this post?")
        if (confirmed) {

            const imgId = post.imageId
            const response = await dbService.deletePost(postId, imgId)
            if (response) {
                navigate('/home')
            }
        }
    }

    return (profile && post) ? (
        <div className='min-h-[95vh] pt-16 lg:pt-10 mb-10'>

            <div className='flex flex-col lg:flex-row w-5/6 md:w-2/3 min-h-[65vh] max-h-[100vh] m-auto rounded-3xl overflow-hidden shadow-xl'>
                <img src={dbService.previewImage(post.imageId)} alt="image" className='lg:w-1/2 object-cover max-h-[85vh] ' />

                <div className='w-full overflow-hidden'>
                    {isAuthor &&
                        <div className="mt-3 mr-4 flex justify-end gap-3">
                            <button onClick={() => navigate(`/edit-post/${post.$id}`)}><EditIcon className='text-2xl transition-transform hover:scale-110' /></button>
                            <button onClick={() => deletePost(post.$id)}><DeleteIcon className='text-2xl transition-transform hover:scale-110' /></button>
                        </div>
                    }
                    <h1 className='text-2xl font-semibold mt-2 ml-6 mb-4'>{post.title || "Title"}</h1>
                    <p className='mx-8 mb-8 max-h-[25vh] md:min-h-[10vh] lg:min-h-[45vh] overflow-auto'>{post.description}</p>

                    <div className='flex flex-col justify-end items-end '>
                        <Link to={`/user/${profileId}`}>
                        <div className='cursor-pointer flex gap-2 items-center bg-gray-200 rounded-full text-center pl-2 pr-3 py-2 mr-6 mb-6'>
                                <img src={userProfileService.previewImage(profile.userImageId)} className='w-10 h-10 object-cover rounded-full transition-transform hover:scale-110' />
                                <span>{profile.fullName}</span>
                        </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    ) : <div className='flex justify-center items-center min-h-[20vh]'>
        <div className='text-2xl font-semibold'>Loading...</div>
    </div>
}

export default Post
