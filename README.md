# Linktree Clone

A modern clone of Linktree built with React, Node.js, and MongoDB. This application allows users to create and manage their personal link collection, similar to Linktree.

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB (with MongoDB Atlas)
- RESTful API

## Features

- Create, read, update, and delete links
- Order links in a specific sequence
- Enable/disable links
- Responsive design
- Modern UI/UX

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (for database)

## Project Structure

```
linktree-clone/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── App.js
│       └── App.css
└── server/                # Node.js backend
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── .env              # Environment variables
    └── index.js          # Server entry point
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd linktree-clone
```

2. Set up the backend:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
```

4. Start the backend server:
```bash
npm run dev
```

5. Set up the frontend:
```bash
cd ../client
npm install
```

6. Start the frontend development server:
```bash
npm start
```

## API Endpoints

### Links API

- `GET /api/links` - Get all links
- `POST /api/links` - Create a new link
  ```json
  {
    "title": "My Website",
    "url": "https://example.com",
    "order": 1,
    "isActive": true
  }
  ```
- `PATCH /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link

## Development Status

### Completed
- ✅ Backend server setup
- ✅ MongoDB integration
- ✅ Basic API endpoints
- ✅ Basic frontend structure

### In Progress
- 🔄 Frontend-Backend integration
- 🔄 UI Components development

### Planned
- ⏳ User authentication
- ⏳ Link analytics
- ⏳ Custom themes
- ⏳ Social media integration
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 

