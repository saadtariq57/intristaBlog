import React, { useEffect, useState } from 'react'
import './PostCard.css'
import { dbService } from '../../appwrite/dbController'
import { useLocation, Link } from 'react-router-dom';

import { userProfileService } from '../../appwrite/userProfile';

function PostCard({
    profileId,
    id,
    imageId,
    title,
    description
}) {

    const location = useLocation()
    const [profile, setProfile] = useState(null)
    
    useEffect(() => {
        if(profileId){
            userProfileService.getUserProfile(profileId).then(profileRes => {
                if(profileRes){
                    setProfile(profileRes)

                }}
            )
        }
    }, [profileId])

    return profile ? (
        <Link to={`/user/${profileId}/post/${id}`}>
            <div className='post-card break-inside-avoid mb-8 md:mb-4 bg-gray-100 rounded-lg shadow-md overflow-hidden levitate'>
                <img src={dbService.previewImage(imageId)} alt={title} className='cursor-pointer' />
                <h3 className='text-lg font-semibold my-2 mx-3 cursor-pointer'>{title}</h3>
                <p className='text-gray-400 ml-3 mb-1 max-h-[11vh] line-clamp-3'>{description}</p>
                {location.pathname.includes('/home') ?
                    <div className='flex gap-1 items-center mx-3 my-2'>
                        <img src={userProfileService.previewImage(profile.userImageId)} className='rounded-full size-6 ' />
                        <span className='cursor-pointer text-sm font-medium text-gray-500'>{profile?.fullName}</span>
                    </div> : undefined
                }
            </div>
        </Link>
    ) : null
}

export default PostCard
