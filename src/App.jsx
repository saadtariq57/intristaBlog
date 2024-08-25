import { useEffect, useState } from "react"
import { Navbar, Footer} from "./components"
import { Outlet } from "react-router-dom"
import { authService } from "./appwrite/auth"
import { useDispatch } from "react-redux"
import { login, logout } from "./store/authSlice"
import { userProfileService } from "./appwrite/userProfile"
import { setProfile, unsetProfile } from "./store/profileSlice"

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser().then(userData => {
      if(userData.emailVerification){
        userProfileService.getUserProfile(userData.prefs.profileId).then(userProfile => {
          dispatch(login(userData)) 
          dispatch(setProfile(userProfile))
        })
        
      }
      else{
        dispatch(logout())
        dispatch(unsetProfile())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if(loading){
    <div className="text-2xl">Loading...</div>
  }
  else
    return (
    

        <>
        <Navbar />
        <main className="w-full min-h-[90vh]">
        <Outlet />
        </main>
        <Footer />
        </>
      )
}

export default App
