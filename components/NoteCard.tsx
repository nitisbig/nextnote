'use client';

import Link from 'next/link';
import { useState, TouchEvent } from 'react';

interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  status: 'saved' | 'failed';
}

export default function NoteCard({ id, title, preview, updatedAt, status }: NoteCardProps) {
  const [startX, setStartX] = useState<number | null>(null);
  const [showActions, setShowActions] = useState(false);

  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX === null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -60) {
      setShowActions(true);
    } else if (diff > 60) {
      setShowActions(false);
    }
    setStartX(null);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-end gap-2 pr-2 bg-gray-100 dark:bg-gray-700 transition-transform ${
          showActions ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button className="w-11 h-11 rounded-md bg-yellow-500 text-white" aria-label="Favorite">
          ⭐
        </button>
        <button className="w-11 h-11 rounded-md bg-green-600 text-white" aria-label="Archive">
          📦
        </button>
        <button className="w-11 h-11 rounded-md bg-red-600 text-white" aria-label="Delete">
          🗑️
        </button>
      </div>
      <Link
        href={`/note/${id}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-transform ${
          showActions ? '-translate-x-32' : ''
        }`}
      >
        <h3 className="font-semibold mb-1 text-base md:text-lg">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 overflow-hidden text-ellipsis">
          {preview}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{updatedAt}</span>
          <span
            className={`text-lg ${status === 'saved' ? 'text-blue-500' : 'text-red-500'}`}
          >
            ✓
          </span>
        </div>
      </Link>
    </div>
  );
}

