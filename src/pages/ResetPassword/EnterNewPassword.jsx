import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '../../components'
import { authService } from '../../appwrite/auth'

function EnterNewPassword() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    const resetPassword = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        const newPasswordSet = await authService.updateRecovery(userId, secret, data.password)
        if(newPasswordSet){
            console.log("Password changed successfully: ", newPasswordSet);
            navigate('/login', { replace: true })
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <div className='min-h-[90vh] pt-16 '>
                <div className='flex flex-col w-1/4 m-auto px-5 py-10 justify-center items-center gap-6 bg-gray-100 rounded-xl'>
                    <h1 className='text-xl font-bold'>Enter new password</h1>

                    <form className='w-4/5' onSubmit={handleSubmit(resetPassword)}>
                        <div className='text-center mb-1'>
                            {error && <span className='text-md text-red-500'>{error}</span>}
                        </div>
                        <div className='flex flex-col gap-6 mb-6'>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="New password"
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


                        </div>
                        <Button type="submit" disabled={isSubmitting} text="Submit" className={isSubmitting ? 'w-full bg-gray-300 text-white' : 'w-full bg-[#0D99FF] text-white hover:bg-[#50acee]'} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnterNewPassword
