const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Get all links
router.get('/', async (req, res) => {
  try {
    console.log('Fetching links...');
    const links = await Promise.race([
      Link.find().sort({ order: 1 }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 5000)
      )
    ]);
    console.log('Links fetched successfully:', links.length);
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ 
      message: error.message,
      details: 'Error occurred while fetching links from database'
    });
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
    console.log('Creating new link:', link);
    const newLink = await Promise.race([
      link.save(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 5000)
      )
    ]);
    console.log('Link created successfully:', newLink);
    res.status(201).json(newLink);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(400).json({ 
      message: error.message,
      details: 'Error occurred while creating new link'
    });
  }
});

// Update a link
router.patch('/:id', async (req, res) => {
  try {
    console.log('Updating link:', req.params.id);
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    if (req.body.title) link.title = req.body.title;
    if (req.body.url) link.url = req.body.url;
    if (req.body.order !== undefined) link.order = req.body.order;
    if (req.body.isActive !== undefined) link.isActive = req.body.isActive;
    
    const updatedLink = await Promise.race([
      link.save(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 5000)
      )
    ]);
    console.log('Link updated successfully:', updatedLink);
    res.json(updatedLink);
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(400).json({ 
      message: error.message,
      details: 'Error occurred while updating link'
    });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting link:', req.params.id);
    await Promise.race([
      Link.findByIdAndDelete(req.params.id),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 5000)
      )
    ]);
    console.log('Link deleted successfully');
    res.json({ message: 'Link deleted' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ 
      message: error.message,
      details: 'Error occurred while deleting link'
    });
  }
});

module.exports = router; 
