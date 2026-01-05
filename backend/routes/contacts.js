const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Basic auth for admin routes (GET /api/contacts)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password';

function requireBasicAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base64Creds = auth.split(' ')[1] || '';
  const [user, pass] = Buffer.from(base64Creds, 'base64').toString().split(':');
  if (user === ADMIN_USER && pass === ADMIN_PASS) return next();

  res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
  return res.status(401).json({ error: 'Unauthorized' });
}

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
router.get('/', requireBasicAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
