"use client";

import PostForm from "@/app/components/PostForm";
import { Post } from "../../../types/post";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const posts: Post[] = JSON.parse(storedPosts);
      const found = posts.find((p) => p.id === id);
      setPost(found || null);
    }
  }, [id]);

  const handleUpdate = (title: string, content: string) => {
    const storedPosts = localStorage.getItem("posts");
    if (!storedPosts) return;
    const posts: Post[] = JSON.parse(storedPosts);
    const updatedPosts = posts.map((p) =>
      p.id === id ? { ...p, title, content } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    router.push(`/posts/${id}`);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="border max-w-xl mx-auto p-4">
      <h1 className="border rounded text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm
        onUpdate={handleUpdate}
        initialTitle={post.title}
        initialContent={post.content}
      ></PostForm>
    </div>
  );
}
