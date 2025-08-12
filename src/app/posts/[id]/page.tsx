"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Post } from "../../types/post";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    const storedPosts = localStorage.getItem("posts");
    if (!storedPosts) return;
    const posts: Post[] = JSON.parse(storedPosts);
    const updatedPosts = posts.filter((p) => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    router.push("/");
  };

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      const foundPost = posts.find((p: Post) => p.id === id);
      setPost(foundPost || null);
    }
  }, [id]);

  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className="flex gap-2 mt-2">
        <button 
        onClick={() => router.push("/")}
        className="bg-gray-400 rounded px-2 py-1">
            Home
        </button>
        <button
          onClick={() => router.push(`/posts/${id}/edit`)}
          className="bg-green-500 rounded text-white px-2 py-1 hover:bg-green"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 rounded text-white px-2 py-1 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
