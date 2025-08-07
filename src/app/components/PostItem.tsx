import { Post } from "../types/post";
import Link from "next/link";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <Link href={`/posts/${post.id}`}
      className="text-blue-500 hover:text-blue-600">Read More</Link>
    </div>
  );
}
