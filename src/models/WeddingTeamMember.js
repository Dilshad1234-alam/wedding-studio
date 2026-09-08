import mongoose from 'mongoose';

const WeddingTeamMemberSchema = new mongoose.Schema(
  {
    orderIndex: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    craftRole: {
      type: String,
      required: [true, 'Craft or role is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    whatsapp: {
      type: String,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    agreedRate: {
      type: String,
      default: '₹4,000 / Day',
    },
    availabilityStatus: {
      type: String,
      enum: ['AVAILABLE', 'BOOKED', 'ON_LEAVE'],
      default: 'AVAILABLE',
    },
  },
  {
    timestamps: true,
    collection: 'weddingteammembers',
  }
);

export const INITIAL_WEDDING_CREW = [
  { orderIndex: 1, name: "Vinod Kumar", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "9304743192", whatsapp: "9304743192", city: "Jehanabad", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 2, name: "Raja Da", craftRole: "CANDID PHOTOGRAPHER", phone: "9051024878", whatsapp: "9051024878", city: "Kolkata", agreedRate: "₹6,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 3, name: "Debu Mukherjee", craftRole: "LEAD CINEMATOGRAPHER", phone: "9093180897", whatsapp: "9093180897", city: "Kolkata", agreedRate: "₹8,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 4, name: "Vikas Kumar", craftRole: "DRONE PILOT", phone: "7870254008", whatsapp: "7870254008", city: "Jehanabad", agreedRate: "₹4,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 5, name: "Ganesh Kumar", craftRole: "DRONE PILOT", phone: "9341962640", whatsapp: "9341962640", city: "Jehanabad", agreedRate: "₹4,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 6, name: "Bittu Kumar", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "6205865658", whatsapp: "6205865658", city: "Patna", agreedRate: "₹3,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 7, name: "Sarvan Kumar", craftRole: "TRADITIONAL VIDEOGRAPHER & PHOTOGRAPHER", phone: "6206152800", whatsapp: "6206152800", city: "Patna", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 8, name: "Amar Kumar", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "8252546642", whatsapp: "8252546642", city: "Patna", agreedRate: "₹3,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 9, name: "Vikas Kumar (Video)", craftRole: "TRADITIONAL VIDEOGRAPHER", phone: "8541094731", whatsapp: "8541094731", city: "Jehanabad", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 10, name: "Krish Raj Gupta", craftRole: "TRADITIONAL VIDEOGRAPHER & PHOTOGRAPHER", phone: "9546818478", whatsapp: "9546818478", city: "Patna", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 11, name: "Rajesh Kumar", craftRole: "LEAD CINEMATOGRAPHER", phone: "9386263412", whatsapp: "9386263412", city: "Patna", agreedRate: "₹6,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 12, name: "Manu Kumar", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "9608549112", whatsapp: "9608549112", city: "Jehanabad", agreedRate: "₹3,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 13, name: "Pankaj Kumar", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "7258067341", whatsapp: "7258067341", city: "Patna City", agreedRate: "₹3,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 14, name: "Rohit", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "8271987782", whatsapp: "8271987782", city: "Jehanabad / Patna", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 15, name: "Rocky Kumar", craftRole: "DRONE PILOT", phone: "9304569728", whatsapp: "9304569728", city: "Nalanda / Patna", agreedRate: "₹5,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 16, name: "Indrajeet Kumar", craftRole: "DRONE PILOT", phone: "7296035011", whatsapp: "7296035011", city: "Ekangarsarai", agreedRate: "₹4,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 17, name: "Surya Kumar", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "8789103481", whatsapp: "8789103481", city: "Bhagalpur", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 18, name: "Sikandar", craftRole: "TRADITIONAL VIDEOGRAPHER & PHOTOGRAPHER", phone: "6203445149", whatsapp: "6203445149", city: "Kako, Jehanabad", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 19, name: "Abhijeet Kumar", craftRole: "LEAD CINEMATOGRAPHER", phone: "9534095619", whatsapp: "9534095619", city: "Patna City", agreedRate: "₹6,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 20, name: "Gaurav Kumar", craftRole: "LED BALL / LIGHTING SPECIALIST", phone: "9576769523", whatsapp: "9576769523", city: "Patna", agreedRate: "₹2,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 21, name: "Lucky Kumar", craftRole: "DRONE PILOT", phone: "7061128351", whatsapp: "7061128351", city: "Bihar", agreedRate: "₹4,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 22, name: "Ritik Saw Kolkata", craftRole: "LEAD CINEMATOGRAPHER", phone: "9875571312", whatsapp: "9875571312", city: "Kolkata", agreedRate: "₹8,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 23, name: "Sanoj", craftRole: "TRADITIONAL VIDEOGRAPHER", phone: "9955193095", whatsapp: "9955193095", city: "Rajgir & Patna", agreedRate: "₹4,000 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 24, name: "Pintu Kumar", craftRole: "ALL TYPES (PHOTO & CINEMA)", phone: "8651418067", whatsapp: "8651418067", city: "Rajgir & Patna", agreedRate: "₹4,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 25, name: "Vikash Kumar (All)", craftRole: "ALL TYPES (PHOTO & CINEMA)", phone: "6200236091", whatsapp: "6200236091", city: "Rajgir & Patna", agreedRate: "₹4,500 / Day", availabilityStatus: "AVAILABLE" },
  { orderIndex: 26, name: "Shashi Kr.", craftRole: "TRADITIONAL PHOTOGRAPHER", phone: "8409869500", whatsapp: "8409869500", city: "Rajgir", agreedRate: "₹3,500 / Day", availabilityStatus: "AVAILABLE" }
];

export default mongoose.models.WeddingTeamMember || mongoose.model('WeddingTeamMember', WeddingTeamMemberSchema);
