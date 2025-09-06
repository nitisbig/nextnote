"use client";

import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { databases } from "../lib/appwrite";
import type { Models } from "appwrite";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  status: "saved" | "failed";
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await databases.listDocuments(databaseId, collectionId);
        const fetched: Note[] = res.documents.map((doc: Models.Document) => ({
          id: doc.$id,
          title: (doc.title as string) || "Untitled",
          preview: (doc.preview as string) || "",
          updatedAt: (doc.updatedAt as string) || "",
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
