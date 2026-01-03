const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Submit contact form
router.post('/send', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, service } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      subject,
      message,
      service
    });

    await newContact.save();

    // TODO: Send email notification
    console.log('New contact submission:', newContact);

    res.status(201).json({ message: 'Contact saved successfully', contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
