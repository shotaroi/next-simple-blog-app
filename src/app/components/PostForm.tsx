'use client'

import { useState } from 'react';

interface PostformProps {
    onAdd: (title: string, content: string) => void;
}

export default function PostForm({onAdd}: PostformProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        onAdd(title, content);
        setTitle("");
        setContent("");
        }

    return (
            <form 
            onSubmit={handleSubmit}
            className="border rounded space-y-2 mb-4">
                <input 
                type="text" 
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded w-full px-2 py-1"/>
                <textarea 
                placeholder='Content (Markdown supported)'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border rounded w-full px-2 py-1"></textarea>
                <button 
                type='submit'
                className="bg-blue-500 rounded text-white px-3 py-1 hover:bg-blue-600">Add Post</button>
            </form>
    )
}