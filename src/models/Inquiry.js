import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  selectedPackage: { type: String },
  eventDate: { type: Date },
  location: { type: String },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Booked', 'Archived'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
