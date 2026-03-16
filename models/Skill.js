const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  level:    { type: Number, min: 0, max: 100, default: 80 },
  category: { type: String, enum: ['frontend', 'backend', 'database', 'tools', 'other'], default: 'frontend' },
  icon:     { type: String, default: '' },
  color:    { type: String, default: '#38bdf8' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
