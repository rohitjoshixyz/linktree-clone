const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5002',
    'http://localhost:3000',
    'https://linktree-clone-nu-beryl.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/linktree-clone', {
  dbName: 'linktree-clone'  // Explicitly set the database name
})
  .then(() => console.log('MongoDB Connected to linktree-clone database'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const linksRouter = require('./routes/links');
app.use('/api/links', linksRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Linktree Clone API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
