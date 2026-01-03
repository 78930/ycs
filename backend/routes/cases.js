const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');

// Get all case studies
router.get('/', async (req, res) => {
  try {
    const cases = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// Get case studies by service
router.get('/service/:service', async (req, res) => {
  try {
    const cases = await CaseStudy.find({ service: req.params.service });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

module.exports = router;
