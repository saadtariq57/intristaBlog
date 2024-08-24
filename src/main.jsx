import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { persistor, store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import Protected from './components/Protected.jsx'
import {About, AddPost, EditPost, EditProfile, EmailVerification, EnterEmail, EnterNewPassword, Home, LandingPage, Login, Post, Profile, SignUp} from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={
        <Protected authentication={false} homeLoggedOut={true}>
          <LandingPage /> 
        </Protected>
         } />

      <Route path='/signup' element={ 
        <Protected authentication={false}>
          <SignUp /> 
        </Protected>
        } />

      <Route path='/verification' element={ 
        // <Protected authentication={false}>
          <EmailVerification /> 
        // </Protected>
        } />

      <Route path='/login' element={ 
        <Protected authentication={false}>
          <Login /> 
        </Protected>
        } />

      <Route path='/reset-password' element={ 
        // <Protected authentication={false}>
          <EnterEmail /> 
        // </Protected>
        } />

      <Route path='/new-password' element={ 
        // <Protected authentication={false}>
          <EnterNewPassword /> 
        // </Protected>
        } />

      <Route path='/home' element={
        <Protected authentication={false}>
          <Home /> 
        </Protected>
         } />

      <Route path='/about' element={
          <About />
        } />

      <Route path='/user/:profileId' element={ 
        <Protected authentication={true}>
          <Profile /> 
        </Protected>
        } />

      <Route path='/edit-profile/:profileId' element={ 
        <Protected authentication={true}>
          <EditProfile /> 
        </Protected>
        } />

      <Route path='/user/:profileId/post/:postId' element={
          <Post /> 
        } />

      <Route path='/add-post' element={ 
        <Protected authentication={true}>
          <AddPost /> 
        </Protected>
        } />

      <Route path='/edit-post/:postId' element={ 
        <Protected authentication={true}>
          <EditPost /> 
        </Protected>
        } />

    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
  // </StrictMode>
)
