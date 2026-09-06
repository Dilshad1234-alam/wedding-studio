import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Traditional Photographer' },
    phone: { type: String, required: true },
    city: { type: String, default: '' },
    instagram: { type: String, default: '' },
    gear: { type: String, default: 'Sony A7IV' },
    status: { type: String, enum: ['Available', 'On Shoot'], default: 'Available' },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
