import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['Lead Cinematographer', 'Candid Photographer', 'Traditional Photographer', 'Drone Pilot', 'Editor', 'Assistant'], 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['Available', 'On Shoot', 'Traveling', 'Off Duty'], 
    default: 'Available' 
  }
}, { timestamps: true });

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
