const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Get all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find().sort({ order: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new link
router.post('/', async (req, res) => {
  const link = new Link({
    title: req.body.title,
    url: req.body.url,
    order: req.body.order || 0,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true
  });

  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a link
router.patch('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (req.body.title) link.title = req.body.title;
    if (req.body.url) link.url = req.body.url;
    if (req.body.order !== undefined) link.order = req.body.order;
    if (req.body.isActive !== undefined) link.isActive = req.body.isActive;
    
    const updatedLink = await link.save();
    res.json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
