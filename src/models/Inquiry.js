import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  service: {
    type: String,
  },
  date: {
    type: String,
  },
  location: {
    type: String,
  },
  budget: {
    type: String,
  },
  status: {
    type: String,
    enum: ['New Inquiry', 'Contacted', 'Deal Booked', 'Declined'],
    default: 'New Inquiry'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
