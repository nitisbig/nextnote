"use client";

import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  status: "saved" | "failed";
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
