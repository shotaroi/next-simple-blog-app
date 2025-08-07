"use client";

import PostForm from "./components/PostForm";
import { v4 as uuidv4 } from "uuid";
import { Post } from "./types/post";
import { useState, useEffect } from "react";
import PostItem from "./components/PostItem";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (title: string, content: string) => {
    const newPost: Post = { id: uuidv4(), title, content };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div>
      <h1>Blog Platform</h1>
      <PostForm onAdd={addPost} />
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
