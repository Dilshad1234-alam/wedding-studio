import mongoose from 'mongoose';

const CommercialTeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., DP, Gaffer, Tech
  city: { type: String },
  rate: { type: String },
  phone: { type: String },
  status: { type: String, enum: ['AVAILABLE', 'BOOKED', 'UNAVAILABLE'], default: 'AVAILABLE' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'commercialteammembers' });

export default mongoose.models.CommercialTeamMember || mongoose.model('CommercialTeamMember', CommercialTeamMemberSchema);
