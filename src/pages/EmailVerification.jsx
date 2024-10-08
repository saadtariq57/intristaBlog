import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authService } from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import { userProfileService } from '../appwrite/userProfile';
import { setProfile } from '../store/profileSlice';

function EmailVerification() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [verifying, setVerifying] = useState(true)

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const secret = urlParams.get('secret');

    authService.updateVerification(userId, secret)
        .then(() => {
            setTimeout(async() => {
                const userData = await authService.getCurrentUser()

                //Creating User Profile
                const profileData = await userProfileService.createUserProfile(userData.email, userData.name, userData.$id)
                if (profileData) {
                    //Adding userProfile id to account
                    const prefs = await authService.updatePrefs(profileData.$id)
                    if(prefs){
                        dispatch(authLogin(userData))
                        dispatch(setProfile(profileData))
                        navigate('/home', { replace: true })
                    }
                }
            }, 500);
        })
        .catch((error) => {
            setVerifying(false)
        })

    return verifying ? (
        <div className='text-2xl text-center mt-10'>Verifying Email...</div>
    ) : <div className='text-2xl text-center mt-10'>Verification failed!</div>
}

export default EmailVerification
