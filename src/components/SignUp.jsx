import React, { useRef, useState } from 'react'
import Button from './Button'
import Input from './Input'
import { useForm } from "react-hook-form"
import { authService } from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { userProfileService } from '../appwrite/userProfile.js'
import { setProfile } from '../store/profileSlice.js'


function SignUp() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()

    const [error, setError] = useState("")
    const [emailSent, setEmailSent] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const createAccount = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                setError("Passwords do not match")
                return
            }
            setIsSubmitting(true)
            setError("")

            //Creating new account
            const userData = await authService.createAccount(data)
            if (userData) {
                //Logging in
                await authService.login({email: data.email, password: data.password})
                
                //Email Verification
                const emailVerification = await authService.verifyEmail()
                if(emailVerification){
                    setEmailSent(true)
                    reset({
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    })
                }
            }
            

        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)

    }


    const [isSubmitting, setIsSubmitting] = useState(false)


    return (
        <div className='min-h-[90vh] pt-10 md:pt-32 lg:pt-0 flex justify-center lg:items-center
        '>
            <div className='flex flex-col lg:justify-center items-center w-5/6 md:w-1/2 lg:w-1/4 md:px-5 h-fit py-10  gap-6 bg-gray-100 rounded-xl'>
                <h1 className='text-2xl font-bold'>Sign up</h1>
                <p className="text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Log In</Link>
                </p>

                <form onSubmit={handleSubmit(createAccount)} className='w-full flex flex-col items-center gap-8'>
                    <div className='text-center mb-1'>
                        {emailSent && <span className='text-md text-blue-400'>Verification link has been sent to your email address.</span>}
                        {error && <span className='text-md text-red-500'>{error}</span>}
                    </div>
                    <div className='flex flex-col gap-6 w-4/5'>
                        <Input
                            type="text"
                            placeholder="Full Name"
                            {...register("fullName", { required: true })}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email",
                                {
                                    required: true, validate:
                                    {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...register("confirmPassword", { required: true }
                            )}
                        />
                        <div onClick={toggleShowPassword} className='cursor-pointer flex items-center gap-1'>
                            <input type="checkbox" checked={showPassword} onChange={toggleShowPassword} className='cursor-pointer' />
                            <label onClick={toggleShowPassword} className='cursor-pointer'>Show Password</label>
                        </div>
                        <Button type="submit" text="Create Account" disabled={isSubmitting} className={isSubmitting ? 'w-full bg-gray-300 text-white' : 'w-full bg-[#0D99FF] text-white hover:bg-[#50acee]'} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
