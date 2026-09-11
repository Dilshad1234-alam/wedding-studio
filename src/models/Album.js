import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  material: { type: String },
  specs: { type: String },
  coverImage: { type: String },
}, { timestamps: true, collection: 'albums' });

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
