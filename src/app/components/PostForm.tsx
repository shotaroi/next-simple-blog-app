"use client";

import { useState } from "react";

interface PostformProps {
  onAdd?: (title: string, content: string) => void;
  onUpdate?: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
}

export default function PostForm({ onAdd, onUpdate, initialTitle = "", initialContent = "" }: PostformProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (onAdd) {
      onAdd(title, content);
      setTitle("");
      setContent("");
    }
    if (onUpdate) onUpdate(title, content);
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-2 mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded w-full px-2 py-1"
      />
      <textarea
        placeholder="Content (Markdown supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded w-full px-2 py-1"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 rounded text-white px-3 py-1 hover:bg-blue-600"
      >
        {onAdd ? "Add Post" : "Update"}
      </button>
    </form>
  );
}
