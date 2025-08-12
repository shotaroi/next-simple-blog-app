"use client";

import PostForm from "./components/PostForm";
import { v4 as uuidv4 } from "uuid";
import { Post } from "./types/post";
import { useState, useEffect } from "react";
import PostItem from "./components/PostItem";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const addPost = (title: string, content: string) => {
    const newPost: Post = { id: uuidv4(), title, content };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog Platform</h1>
      <PostForm onAdd={addPost} />
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="border rounded px-2 py-1 mb-4 w-full"
      />
      <div className="">
        {filteredPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
