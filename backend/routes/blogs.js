const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

module.exports = router;
