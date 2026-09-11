import mongoose from 'mongoose';

const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  couple: { type: String },
  venue: { type: String },
  runtime: { type: String },
  videoUrl: { type: String, required: true },
  posterUrl: { type: String },
  description: { type: String },
}, { timestamps: true, collection: 'films' });

export default mongoose.models.Film || mongoose.model('Film', FilmSchema);
