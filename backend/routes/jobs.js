const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all open jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ open: true }).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

module.exports = router;
