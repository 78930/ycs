const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: String,
  location: String,
  type: String,
  description: String,
  requirements: [String],
  responsibilities: [String],
  salary: String,
  postedAt: { type: Date, default: Date.now },
  open: { type: Boolean, default: true }
});

module.exports = mongoose.model('Job', jobSchema);
