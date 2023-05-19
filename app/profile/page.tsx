"use client"

import { useState, useEffect } from 'react';
import { Session } from "next-auth";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data)
    }
    if(userId)fetchPosts()
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = (post) => {

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