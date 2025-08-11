# LiveDocs

**LiveDocs** is a real-time collaborative document editor that enables multiple users to edit the same document simultaneously. The document creator can control permissions, deciding whether others can collaborate or only view the document.

---

## 🚀 Features

- **Real-Time Collaboration**: Multiple users can work on a document at the same time.
- **Role-Based Permissions**: Document creator controls who can edit and who can view.
- **Rooms Support**: Separate workspaces for different documents.
- **Responsive UI**: Fully responsive and accessible design.
- **Error Tracking**: Integrated error monitoring and reporting.
- **Modern Rich-Text Editing**: Powered by Lexical for a smooth editing experience.

---

## 🛠 Tech Stack

### Frontend
- **Next.js** – React framework for fast and scalable web apps.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **shadcn/ui** – Beautifully designed and accessible UI components.
- **Lexical** – Extensible text editor framework for building rich-text editing experiences.

### Authentication & Authorization
- **Clerk** – User authentication, management, and access control.

### Realtime Collaboration
- **Liveblocks** – Real-time presence and data synchronization for collaborative apps.

### Monitoring & Error Handling
- **Sentry** – Tracks and reports errors in real time.

---

## 📂 Project Structure

```

LiveDocs/
├── components/     # UI components (shadcn/ui, custom components)
├── lib/            # Utility functions and configs
├── pages/          # Next.js pages and API routes
├── styles/         # Global Tailwind styles
├── prisma/         # Database schema (if applicable)
└── ...

````

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Clerk account
- Liveblocks API key
- Sentry DSN

### Installation
```bash
# Clone the repository
git clone https://github.com/mahmoud0p/LiveDocs.git

# Install dependencies
npm install

# Copy env example and configure variables
cp .env.example .env.local
````

### Running Locally

```bash
npm run dev
```

