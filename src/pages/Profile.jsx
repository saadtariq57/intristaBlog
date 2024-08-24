import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { PostCard } from '../components'
import { useSelector } from 'react-redux'
import { dbService } from '../appwrite/dbController';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfileService } from '../appwrite/userProfile';

function Profile() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const profileData = useSelector(state => state.profile.profileData)

    //Setting profile
    const { profileId } = useParams()
    const [profile, setProfile] = useState(null)
    useEffect(() => {
        userProfileService.getUserProfile(profileId).then(profileRes => {
            if (profileRes) {
                setProfile(profileRes)
            }

        })
    }, [profileId])
    
    //Checking if the user is Author
    const [isAuthor, setIsAuthor] = useState(false)
    useEffect(() => {
        if(userData?.prefs.profileId === profile?.$id){
            setIsAuthor(true)
        }
        else{
            setIsAuthor(false)
        }
      
    }, [userData, profile])


    //Setting the posts of this profile
    const [posts, setPosts] = useState([])
    useEffect(() => {
        dbService.getMyPosts(profileId).then(posts => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [profileId])


    return profile ? (
        <div className='w-3/4 m-auto mb-10'>
            <div className='flex flex-col items-center gap-5 m-2 mb-8'>
                <img src={userProfileService.previewImage(profile.userImageId)} alt="" className='size-32 rounded-full object-cover' />
                <div className='flex flex-col gap-1 items-center'>
                    <h1 className='text-xl md:text-3xl text-center font-semibold'>{profile.fullName}</h1>
                    <h3 className='text-gray-500'>@{profile.username}</h3>
                </div>
                {isAuthor && <Button text="Edit Profile" onClick={() => navigate(`/edit-profile/${profileData.$id}`)} className="bg-[#D9D9D9] text-black hover:bg-gray-200" />}
            </div>
            <div className='flex justify-between m-2 mt-4'>
                <h1 className='text-2xl font-semibold'>{isAuthor ? "My Posts" : "Posts"}</h1>
                {isAuthor && <Button text="Add Post" onClick={() => navigate('/add-post')} className='bg-[#0D99FF] text-white' />}
            </div>
            <div className='h-[0.5px] w-full bg-[#E6E6E6]'></div>

            {posts.length === 0 ? 
            <div className='flex justify-center items-center min-h-[20vh]'>
                <div className='text-xl font-semibold'>No posts to display</div>
            </div> :
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 md:gap-4 mt-6">
                    {posts?.map(post => (
                        <div key={post.$id}>
                            <PostCard profileId={profile.$id} id={post.$id} imageId={post.imageId} title={post.title} description={post.description} />
                        </div>
                    )
                    )}
                </div>
            }
        </div>
    ) : null
}

export default Profile
