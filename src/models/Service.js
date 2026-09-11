import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  badge: { type: String },
  regularPrice: { type: String },
  offerPrice: { type: String },
  savings: { type: String },
  schedule: [{ type: mongoose.Schema.Types.Mixed }],
  timeline: [{ type: mongoose.Schema.Types.Mixed }],
  deliverables: [{ type: String }],
  experience: [{ type: String }],
  whyChooseTitle: { type: String },
  whyChooseFeatures: [{ type: String }],
}, { timestamps: true, collection: 'services' });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
