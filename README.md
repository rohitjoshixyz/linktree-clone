# Linktree Clone

A minimalist Linktree clone built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to create and manage their personal link-sharing page.

## Live Demo
- Frontend: [https://linktree-clone-nu-beryl.vercel.app](https://linktree-clone-nu-beryl.vercel.app)
- Backend API: [https://linktree-clone-cuiu.onrender.com](https://linktree-clone-cuiu.onrender.com)

## Features
- 🎨 Modern UI with Tailwind CSS
- 🔗 Create, read, update, and delete links
- 📱 Fully responsive design
- ⚡ Fast loading times
- 🌐 Separate frontend and backend deployments
- 🔄 Real-time updates

## Tech Stack
- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - Deployed on Vercel

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Deployed on Render

## Local Development

### Backend Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB URI:
```
MONGODB_URI=your_mongodb_uri
```

4. Start the development server:
```bash
npm start
```
The server will run on port 5002.

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.development` file for local development:
```
REACT_APP_API_URL=http://localhost:5002
```

4. Start the development server:
```bash
npm start
```

## API Endpoints

### Links
- `GET /api/links` - Get all links
- `POST /api/links` - Create a new link
- `PATCH /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Add environment variable:
   - `REACT_APP_API_URL=https://linktree-clone-cuiu.onrender.com`

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set the root directory to `server`
3. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`

## Project Structure
```
linktree-clone/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
├── server/               # Express backend
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
└── README.md
```

## Future Improvements
- [ ] User authentication
- [ ] Custom themes
- [ ] Analytics
- [ ] Social media preview cards
- [ ] Custom domains

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 

