import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coupleName: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  narrative: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
