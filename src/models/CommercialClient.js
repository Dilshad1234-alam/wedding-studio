import mongoose from 'mongoose';

const CommercialClientSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  contactPerson: { type: String },
  email: { type: String },
  mobile: { type: String },
  projectType: { type: String }, // e.g., TVC, Brand Campaign, Corporate Profile
  shootDates: [{ type: Date }],
  location: { type: String },
  totalBudget: { type: Number },
  status: { type: String, enum: ['Lead', 'Pre-Production', 'Production', 'Post-Production', 'Completed'], default: 'Lead' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CommercialClient || mongoose.model('CommercialClient', CommercialClientSchema);
