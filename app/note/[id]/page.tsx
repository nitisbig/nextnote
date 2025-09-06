'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export default function NoteEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [content, setContent] = useState('');

  const handleSave = async () => {
    const note = {
      id: params.id === 'new' ? Date.now().toString() : params.id,
      title: content.split('\n')[0] || 'Untitled',
      preview: content.slice(0, 100),
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'saved' as 'saved' | 'failed',
    };

    try {
      if (params.id === 'new') {
        const docRef = await addDoc(collection(db, 'notes'), { content });
        note.id = docRef.id;
      } else {
        await setDoc(doc(db, 'notes', params.id), { content }, { merge: true });
      }
    } catch (err) {
      console.error('Error saving note', err);
      alert('Failed to save note');
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
