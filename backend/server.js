const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
// Allow multiple dev origins via comma-separated env var, fallback to common dev ports
const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174';
const allowedOrigins = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);

// In production use a strict allowlist; in development allow any origin to simplify testing
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true
  }));
} else {
  app.use(cors({ origin: true, credentials: true }));
  // respond to preflight requests for all routes in dev
  app.options('*', cors({ origin: true, credentials: true }));
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multi-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.log('❌ MongoDB Error:', err));

// Routes - ADD THESE
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/cases', require('./routes/cases'));
app.use('/api/jobs', require('./routes/jobs'));

// Simple request logging to aid debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', pid: process.pid, time: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT} (pid=${process.pid})`);
});