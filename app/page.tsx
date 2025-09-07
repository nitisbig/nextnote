"use client";

import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { databases, databaseId, collectionId } from "../lib/appwrite";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  status: "saved" | "failed";
  content?: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const hasAppwriteConfig =
        process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT &&
        databaseId &&
        collectionId;

      try {
        if (hasAppwriteConfig) {
          const result = await databases.listDocuments(databaseId, collectionId);
          const fetched: Note[] = result.documents.map((doc) => ({
            id: doc.$id,
            title: (doc.title as string) || "Untitled",
            preview: (doc.preview as string) || "",
            updatedAt: (doc.updatedAt as string) || "",
            status: "saved",
            content: (doc.content as string) || "",
          }));
          setNotes(fetched);
          localStorage.setItem("notes", JSON.stringify(fetched));
        } else {
          const stored = localStorage.getItem("notes");
          if (stored) {
            setNotes(JSON.parse(stored));
          }
        }
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
