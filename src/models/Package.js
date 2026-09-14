import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  badge: { type: String },
  savings: { type: String },
  regularPrice: { type: String },
  offerPrice: { type: String },
  schedule: [{
    day: String,
    crew: [String]
  }],
  timeline: [{
    step: String
  }],
  deliverables: [String],
  experience: [String],
  whyChooseTitle: { type: String },
  whyChooseFeatures: [String]
}, { timestamps: true, collection: 'packages' });

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
