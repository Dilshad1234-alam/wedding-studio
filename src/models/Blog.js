import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  readTime: { type: String },
  date: { type: String },
  img: { type: String },
}, { timestamps: true, collection: 'blogs' });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
