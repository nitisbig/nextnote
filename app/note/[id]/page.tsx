'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '../../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function NoteEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const logErrorToAnalytics = (error: unknown) => {
    // In production, send error details to an analytics service for debugging
    console.log('Analytics log:', error);
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      try {
        await signInWithPopup(auth, new GoogleAuthProvider());
      } catch (err) {
        console.error('Sign-in required to save note', err);
        alert('You must sign in to save notes');
        return;
      }
    }
    const id = params.id === 'new' ? Date.now().toString() : params.id;
    const note = {
      id,
      title: content.split('\n')[0] || 'Untitled',
      preview: content.slice(0, 100),
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'saved' as 'saved' | 'failed',
    };

    try {
      await setDoc(
        doc(db, 'notes', id),
        {
          content,
          title: note.title,
          preview: note.preview,
          updatedAt: note.updatedAt,
        },
        { merge: true }
      );
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
