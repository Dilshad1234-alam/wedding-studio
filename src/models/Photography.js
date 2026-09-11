import mongoose from 'mongoose';

const PhotographySchema = new mongoose.Schema({
  title: { type: String, required: true },
  venue: { type: String },
  category: { type: String },
  imageUrl: { type: String, required: true },
}, { timestamps: true, collection: 'photography' });

export default mongoose.models.Photography || mongoose.model('Photography', PhotographySchema);
