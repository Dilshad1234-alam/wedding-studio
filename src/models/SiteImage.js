import mongoose from 'mongoose';

const siteImageSchema = new mongoose.Schema({
  sectionKey: { 
    type: String, 
    required: true, 
    unique: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  label: { 
    type: String 
  },
  page: { 
    type: String, 
    default: 'home' 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const SiteImage = mongoose.models.SiteImage || mongoose.model('SiteImage', siteImageSchema);
export default SiteImage;
