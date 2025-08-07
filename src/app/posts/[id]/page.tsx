"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Post } from "../../types/post";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

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
    </div>
  );
}
