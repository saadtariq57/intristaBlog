import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { dbService } from '../../appwrite/dbController'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    dbService.getAllPosts().then(posts => setPosts(posts.documents))
  }, [])


  if (posts) {

    return (
      <div className='w-3/4 m-auto mb-10'>
        <h1 className='text-2xl pt-5 pb-3 pl-2'>What's new</h1>
        <div className='h-[0.5px] w-full bg-[#E6E6E6]'></div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 md:gap-4 mt-6">
          {posts?.map(post => (
            <div key={post.$id}>
              <PostCard profileId={post.profileId} id={post.$id} imageId={post.imageId} title={post.title} description={post.description} creatorName={post.creatorName}/>
            </div>
          )
          )}

        </div>
      </div>
    )
  }
  else if (posts.length === 0) {
    <div className='flex justify-center items-center min-h-[20vh]'>
      <div className='text-2xl font-semibold'>No posts to display</div>
    </div>
  }
}

export default Home
