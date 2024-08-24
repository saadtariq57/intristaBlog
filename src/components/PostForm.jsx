import React, { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { RiImageAddFill } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { dbService } from '../appwrite/dbController';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditBtn from '../assets/EditBtn';

function PostForm({ post }) {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (post) {
      const image = dbService.previewImage(post.imageId)
      if (image) {
        setPostImage(image)
      }
      reset({
        title: post?.title || "",
        description: post?.description || "",
        status: post.status === true ? "Active" : "Inactive"
      })

      if (post.title) {
        setLoading(false);
      }
    }
    else {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }

  }, [post])


  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
  const profileData = useSelector(state => state.profile.profileData)

  const submitPost = async (data) => {
    data.status = data.status === "Active"; //Converting <Select/> (string) to boolean

    try {
      setError("")
      setIsSubmitting(true)

      //Edit post
      if (post) {
        //Getting preview for editing post
        const file = data.image[0] ? await dbService.uploadImage(data.image[0]) : null
        if (file) {
          await dbService.deleteImage(post.imageId)
        }
        const dbPost = await dbService.updatePost(post.$id,
          {
            title: data.title,
            description: data?.description || "",
            imageId: file ? file.$id : undefined,
            status: data.status
          })

        if (dbPost) {
          navigate(`/user/${profileData.$id}/post/${dbPost.$id}`, { replace: true })
        }
      }
      //Create new post
      else {
        if (!data.image || !data.image[0]) {
          console.error("Image is required to create a post.");
          return; // Stop the function if no image is uploaded
        }
        const file = data.image && await dbService.uploadImage(data.image[0])

        const dbPost = await dbService.createPost(data.title, data.description, data.status, file ? file.$id : undefined, userData.$id, profileData.$id)
        if (dbPost) {
          navigate(`/user/${profileData.$id}/post/${dbPost.$id}`, { replace: true })
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }

  }

  const [imagePreview, setImagePreview] = useState("")
  const [postImage, setPostImage] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (loading) {
    return (<div className='flex justify-center items-center min-h-[20vh]'>
      <div className='text-2xl font-semibold'>Loading...</div>
    </div>
    )
  }
  else
    return (
      <form onSubmit={handleSubmit(submitPost)}>
        <div className='flex flex-col lg:flex-row justify-center pb-10'>
          {/* Left Side */}
          <div className='lg:w-5/6 w-full mt-10 flex justify-center items-center'>

            <div className='bg-slate-200 mx-5 md:mx-28 lg:mx-0 w-full lg:w-1/2 h-[30vh] lg:h-full flex items-center justify-center rounded-3xl overflow-hidden'>
              {
                imagePreview ?
                  (<div className='flex flex-col items-center w-full h-full relative'>
                    <label htmlFor="file-upload" className='absolute top-4 right-3'><EditBtn /></label>
                    <img src={imagePreview} width="400" alt="image-preview" className='h-full w-full object-cover' />
                  </div>) :

                  post ? (<div className='flex flex-col items-center w-full h-full relative'>
                    <label htmlFor="file-upload" className='absolute top-4 right-3'><EditBtn /></label>
                    <img src={postImage} alt={post.title} className='h-full w-full object-cover' />
                  </div>) :

                    (<label htmlFor="file-upload" className='cursor-pointer flex flex-col items-center'>
                      <RiImageAddFill size={50} className='text-gray-500' />
                      <span className=''>Upload Image</span>
                    </label>)}
            </div>

            <input
              type="file"
              id="file-upload"
              accept='image/*'
              className='hidden'
              {...register("image", {
                required: !post,
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setImagePreview(imageUrl);
                  } else {
                    setImagePreview(""); // Clear preview if no file
                  }
                }
              })}
            />

          </div>


          {/* Right Side */}
          <div className='w-full mt-8'>
            <div className='mx-5 md:mx-28 lg:ml-16 lg:mr-0 flex flex-col gap-8 bg-gray-100 lg:w-2/3 p-5 rounded-xl'>
              <Input
                placeholder="Title"
                type="text"
                className='w-2/3 duration-200'
                {...register("title", { required: !post })}
              />
              <textarea
                name="description"
                placeholder="Description"
                className='h-[30vh] w-full p-3 rounded-lg bg-gray-200 outline-none focus:bg-gray-50 duration-200 resize-none'
                {...register("description", { required: false })}
              />
              <select
                className='px-3 py-2 rounded-lg bg-gray-200 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-1/2'
                {...register("status", { required: true })}>
                <option value="Active" >Active</option>
                <option value="Inactive" >Inactive</option>
              </select>
              <div className='text-center mb-1'>
                {error && <span className='text-md text-red-500'>{error}</span>}
              </div>
              <div className='flex justify-end'>
                <Button type="submit" disabled={isSubmitting} text={post ? "Save changes" : "Publish"} className={isSubmitting ? 'bg-gray-300 text-white' : ' bg-[#0D99FF] text-white hover:bg-[#50acee]'} />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
}

export default PostForm
