import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '../../components'
import { authService } from '../../appwrite/auth'

function EnterEmail() {
    const { register, handleSubmit, reset } = useForm()

    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const recoverPassword = async(data) => {
        try {
            setError("")
            reset({ email: "" })
            setIsSubmitting(true)
            const passwordRecovery = await authService.createRecovery(data.email)
            if(passwordRecovery){
                setEmailSent(true)
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <div className='min-h-[90vh] pt-16 '>
                <div className='flex flex-col w-1/4 m-auto px-5 py-10 justify-center items-center gap-6 bg-gray-100 rounded-xl'>
                    <h1 className='text-xl font-bold'>Recover your account</h1>


                    <form className='w-4/5' onSubmit={handleSubmit(recoverPassword)}>
                        <div className='text-center mb-1'>
                            {emailSent && <span className='text-md text-blue-400'>Password recovery link has been sent to your email address.</span>}
                            {error && <span className='text-md text-red-500'>{error}</span>}
                        </div>
                        <div className='flex flex-col gap-6 mb-6'>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email",
                                    {
                                        required: true, validate:
                                        {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        }
                                    })}
                            />


                        </div>
                        <Button type="submit" disabled={isSubmitting} text="Submit" className={isSubmitting ? 'w-full bg-gray-300 text-white' : 'w-full bg-[#0D99FF] text-white hover:bg-[#50acee]'} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnterEmail
