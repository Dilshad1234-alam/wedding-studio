import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  status: { type: String, enum: ['NEW', 'CONTACTED', 'CONVERTED', 'LOST'], default: 'NEW' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'leads' });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
