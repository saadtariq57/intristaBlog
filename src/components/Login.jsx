import React, { useEffect, useState } from 'react'
import Button from './Button'
import Input from './Input'
import eyeOpen from '../assets/eye-open.svg'
import eyeClose from '../assets/eye-close.svg'
import { useForm } from 'react-hook-form'
import { authService } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { setProfile } from '../store/profileSlice'
import { userProfileService } from '../appwrite/userProfile'

function Login() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const loginAccount = async(data) => {
        try {
            // const currentUser = await authService.getCurrentUser()
            // if(currentUser){
            //     await authService.logout()
            // }
            setIsSubmitting(true)
            setError("")
            const loginSession = await authService.login(data)
            if(loginSession){
                const userData = await authService.getCurrentUser()
                if(userData){
                    const EmailVerification = userData.emailVerification
                    if(EmailVerification){
                        const profileId = userData.prefs.profileId                    
                        const profileData = await userProfileService.getUserProfile(profileId)      
                        
                        dispatch(authLogin(userData))
                        dispatch(setProfile(profileData))
                        
                        navigate('/home', { replace: true })
                    } else {
                        await authService.logout()
                        setError("Email not verified!");
                        setSendVerification(true)
                    }
                }
            }
  
        } catch (error) {
            setError(error.message)
        }
        finally{
            setIsSubmitting(false)
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <div>
            <div className='min-h-[90vh] pt-32 lg:pt-0 flex justify-center lg:items-center'>
                <div className='flex flex-col w-5/6 md:w-1/2 lg:w-1/4 px-5 py-10 justify-center items-center h-fit gap-6 bg-gray-100 rounded-xl'>
                    <h1 className='text-2xl font-bold'>Log in</h1>
                    <p className="text-center text-base text-black/60">
                    Don't have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign Up</Link>
                </p>
                    
                    <form className='w-4/5' onSubmit={handleSubmit(loginAccount)}>
                    <div className='text-center mb-1'>
                        {error && <span className='text-md text-red-500'>{error}</span>}
                    </div>                        
                    <div className='flex flex-col gap-6 mb-6'>
                            <Input 
                                type="email" 
                                placeholder="Email" 
                                {...register("email", 
                                    { required: true, validate: 
                                        {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                        }
                                 })}
                            />
                            <div className="password relative">
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    {...register("password", {validate: true})}
                                />
                                <img src={showPassword ? eyeOpen : eyeClose} onClick={toggleShowPassword} className='absolute w-5 top-2 right-3 pt-[2px] cursor-pointer' />
                                <div className='mt-2 flex justify-end'>
                                    <Link to='/reset-password'>
                                        <div className='w-fit cursor-pointer hover:text-blue-600 hover:underline'>Forgot Password?</div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <Button type="submit" disabled={isSubmitting} text="Login" className={isSubmitting ? 'w-full bg-gray-300 text-white' : 'w-full bg-[#0D99FF] text-white hover:bg-[#50acee]'} />
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login
