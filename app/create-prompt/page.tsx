'use client';

import { useState } from 'react'
import { Session } from "next-auth";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const userId = (session as unknown as ExtendedSession)?.user.id;
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
      prompt: '',
      tag: ''
    })

    const createPrompt = async (e:any) => {
      e.preventDefault()
      setSubmitting(true)
      try{
        const response = await fetch('api/prompt/new', 
        {
          method: 'POST',
          body: JSON.stringify({
            prompt: post. prompt,
            userId: userId,
            tag: post.tag
          })
        })
        if(response.ok){
          router.push('/')
        }
      }catch(error){

      } finally {
        setSubmitting(false)
      }
    }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
