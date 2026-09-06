import mongoose from 'mongoose';

const crewDispatchSchema = new mongoose.Schema({
  memberName: { 
    type: String, 
    required: true 
  },
  clientEvent: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: String, 
    required: true 
  },
  endDate: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Draft', 'Traveling', 'On Shoot', 'Production Completed', 'Dispatched', 'On Duty', 'Returned'], 
    default: 'Draft' 
  }
}, { timestamps: true });

const CrewDispatch = mongoose.models.CrewDispatch || mongoose.model('CrewDispatch', crewDispatchSchema);
export default CrewDispatch;
