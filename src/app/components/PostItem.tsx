import { Post } from "../types/post";
import Link from "next/link";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <div className="flex space-x-4 mt-2">
        <Link href={`/posts/${post.id}`}
      className="text-blue-500 hover:underline">View</Link>
      <Link href={`/posts/${post.id}/edit`} 
      className="text-green-500 hover:underline">Edit</Link>
      </div>
      
    </div>
  );
}
