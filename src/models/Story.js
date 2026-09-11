import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  couple: { type: String, required: true },
  tagline: { type: String },
  desc: { type: String },
  mainImage: { type: String },
  thumbnails: [{ type: String }],
}, { timestamps: true, collection: 'stories' });

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
