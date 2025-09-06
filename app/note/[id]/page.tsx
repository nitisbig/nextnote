'use client';

import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { databases, databaseId, collectionId } from '../../../lib/appwrite';
import { ID } from 'appwrite';

export default function NoteEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const logErrorToAnalytics = (error: unknown) => {
    // In production, send error details to an analytics service for debugging
    console.log('Analytics log:', error);
  };

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = params.id === 'new' ? ID.unique() : params.id;
    const note = {
      id,
      title: content.split('\n')[0] || 'Untitled',
      preview: content.slice(0, 100),
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'saved' as 'saved' | 'failed',
    };

    try {
      if (params.id === 'new') {
        await databases.createDocument(databaseId, collectionId, id, {
          content,
          title: note.title,
          preview: note.preview,
          updatedAt: note.updatedAt,
        });
      } else {
        await databases.updateDocument(databaseId, collectionId, id, {
          content,
          title: note.title,
          preview: note.preview,
          updatedAt: note.updatedAt,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Error saving note', err);
      logErrorToAnalytics(err);
      alert(`Failed to save note: ${message}`);
      note.status = 'failed';
    }

    const stored = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = [...stored.filter((n: any) => n.id !== note.id), note];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
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
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
