# mBank - Banking System

A modern banking system built with React, Node.js, and NeDB.

## Overview

This project aims to be a complete banking system with:
- User authentication (login/register)
- Account management
- Transaction processing
- File management
- Dashboard with statistics
- Multi-language support (English/Persian)
- RTL/LTR support

## Tech Stack

### Frontend
- React 18
- React Router v6
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js / Express
- NeDB (file-based database, no MongoDB required)
- JWT Authentication
- bcryptjs for password hashing

## Project Structure

```
mbank/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # Page components
│   │   ├── components/  # Reusable components
│   │   ├── auth.jsx     # Auth context
│   │   ├── i18n.jsx     # Internationalization
│   │   └── api.js       # API client
│   └── ...
└── server/          # Express backend
    ├── src/
    │   ├── routes/      # API routes
    │   ├── models/      # Data models
    │   ├── middleware/  # Auth middleware
    │   └── db.js        # Database connection
    └── ...
```

## Features (Planned/In Progress)

- [x] User authentication (JWT)
- [x] Multi-language support (EN/FA)
- [x] RTL/LTR layout support
- [x] Dashboard with statistics
- [x] Records management
- [x] File upload/download
- [x] Transaction tracking
- [ ] Account statements
- [ ] Central account statements
- [ ] Financial calendar
- [ ] Broker proxy account management

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Development

```bash
# Start frontend (from client/)
npm run dev

# Start backend (from server/)
npm run dev
```

## License

MIT