import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
  sectionType: { type: String, required: true, unique: true }, // e.g., 'landing', 'about', 'contact', 'settings'
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true, collection: 'sitecontent' });

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);
