import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

interface PostType {
  prompt: string;
  tag: string;
}

interface FormProps {
  type: string;
  post: PostType;
  setPost: Dispatch<SetStateAction<PostType>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({type, post, setPost, submitting, handleSubmit,}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span>{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share prompts with AI
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold test-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e)=>{setPost({ ...post,prompt:e.target.value })}}
            placeholder="Write prompt here"
            required
            className="form_textarea"
          >
          </textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold test-base text-gray-700">
            Tag{' '}
            <span className="font-normal">(#product, #webidea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e)=>{setPost({ ...post, tag:e.target.value })}}
            placeholder="#tag"
            required
            className="form_input"
          >
          </input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting? `${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form