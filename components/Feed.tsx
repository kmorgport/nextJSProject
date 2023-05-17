'use client';

import { useState, useEffect } from 'react'
import { MouseEvent } from 'react';
import PromptCard from './PromptCard';

interface Post {
  _id: string;
  creator: string;
  prompt: string;
  tag: string;
}

type HandleTagClick = (event: MouseEvent<HTMLDivElement>) => void; 

interface PromptCardListProps {
  data: Post[];
  handleTagClick: HandleTagClick;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <div>{post.prompt}</div>
      ))}
    </div>
  )
}
const Feed = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ posts, setPosts ] = useState([]);
  const handleSearchChange = (e:any)=>{

  }

  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }
    fetchPosts()
  }, [])
  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed