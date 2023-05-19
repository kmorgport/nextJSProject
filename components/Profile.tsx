import Prompt from "@models/prompt"
import PromptCard from "./PromptCard"

// interface IUser {
//   email: string, 
//   username: string,
//   image: string;
// }

interface IUser {
  id: string;
  email: string;
  username: string;
  image: string;
}
interface PostType {
  _id: number;
  post: string;
  prompt: string;
  creator: IUser;
  tag: string;
}

interface ProfileProps {
  name: string;
  data: PostType[];
  desc: string;
  handleEdit: (e: PostType) => void;
  handleTagClick: (e: string) => void;
  handleDelete: (e: PostType) => void;
}

const Profile: React.FC<ProfileProps> = ({name, desc, data, handleEdit, handleDelete, handleTagClick}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={()=> handleEdit && handleEdit(post)}
          handleDelete={()=> handleDelete && handleDelete(post)}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile