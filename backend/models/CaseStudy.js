const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  service: String,
  client: String,
  challenge: String,
  solution: String,
  results: String,
  image: String,
  metrics: {
    improvement: String,
    roi: String,
    timeframe: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
