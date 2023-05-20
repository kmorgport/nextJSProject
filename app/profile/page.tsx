"use client"

import { useState, useEffect } from 'react';
import { Session } from "next-auth";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

const Profilepage = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const userId = (session as unknown as ExtendedSession)?.user.id;
  const [ posts, setPosts ] = useState([])
  console.log(userId)
  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data)
    }
    if(userId)fetchPosts()
  }, [userId])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        })

        const filteredPosts = posts.filter(p=> p._id !== post._id)
        setPosts(filteredPosts)
        
      }catch(error){

      }
    }
  }

  const handleTagClick = () => {

  }

  return (
    <Profile
      name="My"
      desc="Welcome to my personal page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  )
}

export default Profilepage