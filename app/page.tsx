"use client";

import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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
    const fetchNotes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "notes"));
        const fetched: Note[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: (doc.data().title as string) || "Untitled",
          preview: (doc.data().preview as string) || "",
          updatedAt: (doc.data().updatedAt as string) || "",
          status: "saved",
        }));
        setNotes(fetched);
        localStorage.setItem("notes", JSON.stringify(fetched));
      } catch (err) {
        console.error("Failed to fetch notes", err);
        const stored = localStorage.getItem("notes");
        if (stored) {
          setNotes(JSON.parse(stored));
        }
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
