require('dotenv').config();
const express = require('express');
const cors = require('cors');
const basicAuth = require('basic-auth');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic authentication middleware
const auth = (req, res, next) => {
  const user = basicAuth(req);
  if (!user || user.name !== process.env.MCP_USERNAME || user.pass !== process.env.MCP_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm="MCP Server"');
    return res.status(401).send('Authentication required');
  }
  next();
};

// SSE endpoint for real-time communication
app.get('/mcp/events', auth, (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial connection message
  res.write('event: connect\ndata: Connected to MCP Server\n\n');

  // Send a ping every 30 seconds to keep the connection alive
  const pingInterval = setInterval(() => {
    res.write('event: ping\ndata: ping\n\n');
  }, 30000);

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(pingInterval);
  });
});

// Routes
app.post('/mcp/create-link', auth, async (req, res) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const response = await axios.post(`${process.env.LINKTREE_API_URL}/api/links`, {
      title,
      url
    });

    res.json({
      success: true,
      message: 'Link created successfully',
      data: response.data
    });
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create link',
      error: error.message
    });
  }
});

app.delete('/mcp/delete-link/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${process.env.LINKTREE_API_URL}/api/links/${id}`);

    res.json({
      success: true,
      message: 'Link deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete link',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/mcp/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
}); 
