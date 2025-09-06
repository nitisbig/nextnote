'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NoteEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Save note logic goes here
    router.push('/');
  };

  const handleDelete = () => {
    // Delete note logic goes here
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note in markdown..."
        className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
