import React, { useEffect, useState } from 'react'
import { Input } from '../components'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { MdModeEditOutline } from "react-icons/md";
import { authService } from '../appwrite/auth'
import { userProfileService } from '../appwrite/userProfile'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { setProfile as setProfileInStore } from '../store/profileSlice'


function EditProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { profileId } = useParams()
    const [profile, setProfile] = useState(null)

    const { register, reset, handleSubmit } = useForm()

    useEffect(() => {
        if (profileId) {
            userProfileService.getUserProfile(profileId).then(profileRes => {
                if (profileRes) {
                    setProfile(profileRes)
                }
            })
        }
    }, [profileId])

    useEffect(() => {
        if (profile) {
            reset({
                fullName: profile?.fullName || ""
            })
        }
    }, [profile])


    const editProfile = async (data) => {
        try {
            setError(false)
            setIsSubmitting(true)
            const profileImage = data.image ? await userProfileService.createProfileImage(data.image[0]) : null
            if (profileImage) {
                await userProfileService.deleteProfileImage(profile?.userImageId)
            }
    
            const accountUpdate = await authService.updateAccountName(data.fullName)
            const profileUpdate = await userProfileService.updateUserProfile(profile.$id, { fullName: data.fullName, userImageId: profileImage?.$id || undefined })
            if (accountUpdate && profileUpdate) {
                dispatch(authLogin(accountUpdate))
                dispatch(setProfileInStore(profileUpdate))
    
                navigate(`/user/${profile.$id}`, { replace: true })
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const [newImage, setNewImage] = useState(null)

    return profile ? (
        <div className='md:w-1/3 m-auto lg:bg-gray-100 rounded-3xl p-5 pt-10'>
            <form onSubmit={handleSubmit(editProfile)} className='flex flex-col items-center gap-10'>
                <div>
                    {newImage ?
                        <div className='relative group rounded-full overflow-hidden'>
                            <label className='lg:hidden absolute group-hover:block w-full h-full cursor-pointer' htmlFor="file-upload" >
                                <div className='w-full h-full bg-black bg-opacity-50 relative'>
                                    <MdModeEditOutline className='absolute top-[43%] left-[43%] text-gray-200 text-4xl' />
                                </div>
                            </label>
                            <img src={newImage} alt="" className='size-60 rounded-full object-cover' />
                        </div>
                        :
                        <div className='relative group rounded-full overflow-hidden'>
                            <label className='lg:hidden absolute group-hover:block w-full h-full cursor-pointer' htmlFor="file-upload" >
                                <div className='w-full h-full bg-black bg-opacity-50 relative'>
                                    <MdModeEditOutline className='absolute top-[43%] left-[43%] text-gray-200 text-4xl' />
                                </div>
                            </label>
                            <img src={userProfileService.previewImage(profile.userImageId)} alt="" className='size-60 rounded-full object-cover' />
                        </div>

                    }
                    <input
                        type="file"
                        id='file-upload'
                        className='hidden'
                        {...register("image", {
                            onChange: (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const imageUrl = URL.createObjectURL(file)
                                    setNewImage(imageUrl)
                                }
                            }
                        })}
                    />
                </div>
                <Input placeholder="Full Name" {...register("fullName", { required: true })} />
                <div className='flex gap-3'>
                    <Button type="submit" text="Update" disabled={isSubmitting} className={isSubmitting ? 'bg-gray-300 text-white' : ' bg-[#0D99FF] text-white hover:bg-[#50acee]'} />
                    <Button text="Cancel" onClick={() => navigate(`/user/${profile.$id}`)} className={"bg-[#D9D9D9] text-black hover:bg-gray-200"} />
                </div>
            </form>
        </div>
    ) : null
}

export default EditProfile
