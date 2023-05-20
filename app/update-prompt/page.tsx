'use client';

import { useEffect, useState } from 'react'
import { Session } from "next-auth";
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [submitting, setSubmitting] = useState(false)

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId])
    const [post, setPost] = useState({
      prompt: '',
      tag: ''
    })

    const updatePrompt = async (e:any) => {
      e.preventDefault()
      setSubmitting(true)

      if(!promptId) return alert("Missing Prompt ID")
      try{
        const response = await fetch(`api/prompt/${promptId}`, 
        {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post. prompt,
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
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt