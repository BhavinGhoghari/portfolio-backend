const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  longDesc:    { type: String, default: '' },
  tags:        [{ type: String }],
  imageUrl:    { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
  featured:    { type: Boolean, default: false },
  status:      { type: String, enum: ['live', 'wip', 'archived'], default: 'live' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
