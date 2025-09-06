# NextNote

Modern note-taking frontend built with Next.js 14 (App Router) and Tailwind CSS.

## Features
- Responsive sidebar with navigation links (Notes, Favorites, Trash)
- Top navbar with search bar and profile placeholder
- Notes dashboard displaying note cards
- Floating "+" action button to create notes
- Markdown-enabled note editor page with save/delete
- Light and dark themes with a toggle

## Environment Variables

Create a `.env.local` file (or copy from `.env.example`) and provide the following variables for Appwrite:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_API_KEY=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
