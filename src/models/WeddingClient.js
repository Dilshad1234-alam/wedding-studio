import mongoose from 'mongoose';

const DayScheduleSchema = new mongoose.Schema({
  dayNo: { type: Number, required: true },
  date: { type: String, required: true },
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  tradPhoto: { type: String, default: '—' },
  tradVideo: { type: String, default: '—' },
  candidPhoto: { type: String, default: '—' },
  cinematic: { type: String, default: '—' },
  dronePilot: { type: String, default: '—' },
  craneOperator: { type: String, default: '—' },
  callTime: { type: String, default: '10:00 AM' },
  reportingTime: { type: String, default: '10:00 AM' },
  assistant: { type: String, default: '—' },
});

const WeddingClientSchema = new mongoose.Schema(
  {
    serialNo: {
      type: Number,
      required: true,
      unique: true,
    },
    bookingYear: {
      type: Number,
      default: 2026,
      required: true,
    },
    bookingMonth: {
      type: String,
      required: true,
    },
    contractFee: {
      type: String,
      default: '₹0',
    },
    shootStatus: {
      type: String,
      enum: ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'DELIVERED'],
      default: 'SCHEDULED',
    },
    clientName: {
      type: String,
      required: [true, 'Client/Couple name is required'],
      trim: true,
    },
    clientPhone: {
      type: String,
      default: '',
    },
    primaryDestination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    schedule: [DayScheduleSchema],
    notes: {
      type: String,
      default: '',
    },
    pdfUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'weddingclients',
  }
);

// Verified Operational Wedding Client Roster
export const INITIAL_WEDDING_CLIENTS = [
  {
    serialNo: 1,
    bookingYear: 2026,
    bookingMonth: 'APR',
    clientName: 'PRIYA KUMARI',
    primaryDestination: 'Sitamarhi / Begusarai / Patna',
    contractFee: '₹3,50,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '22 Apr 2026', eventName: 'Bride Rituals', location: 'Sitamarhi Home', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: 'Sanoj', callTime: '10:00 AM' },
      { dayNo: 2, date: '23 Apr 2026', eventName: 'Haldi Shoot', location: 'Sitamarhi Venue', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '11:00 AM' },
      { dayNo: 3, date: '25 Apr 2026', eventName: 'Groom Rituals', location: 'Begusarai', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '04:00 PM' },
      { dayNo: 4, date: '26 Apr 2026', eventName: 'Wedding Day', location: 'Hajipur, Patna', tradPhoto: 'Rohit', tradVideo: 'Aman', candidPhoto: 'Sanjeet', cinematic: 'Ritik Saw Kolkata', dronePilot: 'Manikant (Monu)', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 2,
    bookingYear: 2026,
    bookingMonth: 'MAY',
    clientName: 'RAVI RANJAN',
    primaryDestination: 'Kankarbagh / Kumhrar / Patna',
    contractFee: '₹3,20,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '04 May 2026', eventName: 'Sangeet Night', location: 'Hotel Anand Sagar, Kankarbagh', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '05:00 PM' },
      { dayNo: 2, date: '05 May 2026', eventName: 'Haldi & Mehndi', location: 'Kumhrar Home', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '10:00 AM' },
      { dayNo: 3, date: '06 May 2026', eventName: 'Madwa Ceremony', location: 'Kumhrar Venue', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '11:00 AM' },
      { dayNo: 4, date: '07 May 2026', eventName: 'Grand Wedding Ceremony', location: 'Bhagwat Banquet Hall', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: 'Sanjeet', cinematic: 'Suraj', dronePilot: 'Manikant (Monu)', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 3,
    bookingYear: 2026,
    bookingMonth: 'MAY',
    clientName: 'ABHINAV KRISHNA',
    primaryDestination: 'Bihar Sharif',
    contractFee: '₹1,80,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '08 May 2026', eventName: 'Haldi Kutai', location: 'Bihar Sharif Residence', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '10:00 AM' },
      { dayNo: 2, date: '09 May 2026', eventName: 'Tilak Ceremony', location: 'Royal Palace Bihar Sharif', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '04:00 PM' },
      { dayNo: 3, date: '10 May 2026', eventName: 'Matkor & Puja', location: 'Bihar Sharif', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '09:00 AM' }
    ]
  },
  {
    serialNo: 4,
    bookingYear: 2026,
    bookingMonth: 'JUN',
    clientName: 'NIKITA KUMARI',
    primaryDestination: 'Begusarai / Barh / Patna',
    contractFee: '₹2,90,000',
    shootStatus: 'CONFIRMED',
    schedule: [
      { dayNo: 1, date: '27 Apr 2026', eventName: 'Engagement Ceremony', location: 'Begusarai Club', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: 'Sanjeet', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' },
      { dayNo: 2, date: '22 Jun 2026', eventName: 'Haldi Celebration', location: 'Barh Guest House', tradPhoto: 'Rohit', tradVideo: 'Pintu Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '10:00 AM' },
      { dayNo: 3, date: '24 Jun 2026', eventName: 'Wedding Day Reception', location: 'Bailey Road, Patna', tradPhoto: 'Rohit', tradVideo: 'Pintu Kumar', candidPhoto: 'Sanjeet', cinematic: 'Ritik Saw Kolkata', dronePilot: 'Manikant (Monu)', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 5,
    bookingYear: 2026,
    bookingMonth: 'JUN',
    clientName: 'ROHIT KUMAR',
    primaryDestination: 'Rajgir',
    contractFee: '₹1,20,000',
    shootStatus: 'CONFIRMED',
    schedule: [
      { dayNo: 1, date: '24 Jun 2026', eventName: 'Pre-Wedding & Wedding Day', location: 'Rajgir Heritage Resort', tradPhoto: 'Vinod Kumar', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '02:00 PM' }
    ]
  },
  {
    serialNo: 6,
    bookingYear: 2026,
    bookingMonth: 'NOV',
    clientName: 'SURAJ SINHA',
    primaryDestination: 'Bhusaula Danapur',
    contractFee: '₹85,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '21 Nov 2026', eventName: 'Wedding Day Event', location: 'Danapur Lawns', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: 'Manikant (Monu)', callTime: '05:00 PM' }
    ]
  },
  {
    serialNo: 7,
    bookingYear: 2026,
    bookingMonth: 'NOV',
    clientName: 'SHYAMLI SHARMA',
    primaryDestination: 'Sherghati',
    contractFee: '₹1,50,000',
    shootStatus: 'CONFIRMED',
    schedule: [
      { dayNo: 1, date: '23 Nov 2026', eventName: 'Bride Rituals & Mehndi', location: 'Sherghati Heritage', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '01:00 PM' },
      { dayNo: 2, date: '24 Nov 2026', eventName: 'Wedding Day Celebration', location: 'Sherghati Hall', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: 'Manikant (Monu)', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 8,
    bookingYear: 2026,
    bookingMonth: 'NOV',
    clientName: 'KINSHUK SHANKAR',
    primaryDestination: 'Munger Club',
    contractFee: '₹1,60,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '24 Nov 2026', eventName: 'Haldi Gathering', location: 'Munger Club', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '11:00 AM' },
      { dayNo: 2, date: '25 Nov 2026', eventName: 'Wedding Day', location: 'Munger Club Main Lawn', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 9,
    bookingYear: 2026,
    bookingMonth: 'NOV',
    clientName: 'ANKIT KUMAR',
    primaryDestination: 'Patna to Siwan',
    contractFee: '₹75,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '29 Nov 2026', eventName: 'Tilak Ceremony', location: 'Siwan Town Hall', tradPhoto: 'Rohit', tradVideo: '—', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '04:00 PM' }
    ]
  },
  {
    serialNo: 10,
    bookingYear: 2026,
    bookingMonth: 'DEC',
    clientName: 'APARNA',
    primaryDestination: 'Patliputra & Dakbunglow, Patna',
    contractFee: '₹2,40,000',
    shootStatus: 'CONFIRMED',
    schedule: [
      { dayNo: 1, date: '01 Dec 2026', eventName: 'Groom Rituals', location: 'Patliputra Colony Home', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '11:00 AM' },
      { dayNo: 2, date: '02 Dec 2026', eventName: 'Grand Wedding Day', location: 'Dakbunglow Hotel', tradPhoto: 'Rohit', tradVideo: 'Sanoj', candidPhoto: 'Sanjeet', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 11,
    bookingYear: 2026,
    bookingMonth: 'DEC',
    clientName: 'AMAR KUMAR VIVEK',
    primaryDestination: 'Begusarai',
    contractFee: '₹1,30,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '01 Dec 2026', eventName: 'Pre-Wedding Rituals', location: 'Begusarai City', tradPhoto: 'Sikandar', tradVideo: 'Sikandar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '10:00 AM' },
      { dayNo: 2, date: '02 Dec 2026', eventName: 'Wedding Ceremony', location: 'Begusarai Palace', tradPhoto: 'Sikandar', tradVideo: 'Sikandar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 12,
    bookingYear: 2026,
    bookingMonth: 'DEC',
    clientName: 'ANKIT & SNEHA',
    primaryDestination: 'Bhagalpur Palace',
    contractFee: '₹3,80,000',
    shootStatus: 'CONFIRMED',
    schedule: [
      { dayNo: 1, date: '02 Dec 2026', eventName: 'Welcome Dinner', location: 'Bhagalpur Palace Courtyard', tradPhoto: 'Sikandar', tradVideo: 'Sikandar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' },
      { dayNo: 2, date: '03 Dec 2026', eventName: 'Haldi & Sangeet', location: 'Bhagalpur Palace Gardens', tradPhoto: 'Sikandar', tradVideo: 'Sikandar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '11:00 AM' },
      { dayNo: 3, date: '04 Dec 2026', eventName: 'Sacred Wedding Day', location: 'Bhagalpur Palace Mandap', tradPhoto: 'Sikandar', tradVideo: 'Sikandar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 13,
    bookingYear: 2026,
    bookingMonth: 'NOV',
    clientName: 'GUDDU KUMAR',
    primaryDestination: 'Ekangarsarai',
    contractFee: '₹1,10,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '18 Nov 2026', eventName: 'Rituals Day 1', location: 'Ekangarsarai', tradPhoto: 'Vinod Kumar', tradVideo: 'Vinod Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '10:00 AM' },
      { dayNo: 2, date: '19 Nov 2026', eventName: 'Haldi Day 2', location: 'Ekangarsarai', tradPhoto: 'Vinod Kumar', tradVideo: 'Vinod Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '11:00 AM' },
      { dayNo: 3, date: '20 Nov 2026', eventName: 'Wedding Day', location: 'Ekangarsarai Hall', tradPhoto: 'Vinod Kumar', tradVideo: 'Vinod Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' }
    ]
  },
  {
    serialNo: 14,
    bookingYear: 2026,
    bookingMonth: 'NOV',
    clientName: 'ANURADHA RANI',
    primaryDestination: 'Ekangarsarai',
    contractFee: '₹1,10,000',
    shootStatus: 'SCHEDULED',
    schedule: [
      { dayNo: 1, date: '19 Nov 2026', eventName: 'Haldi Ceremony', location: 'Ekangarsarai Residence', tradPhoto: 'Vinod Kumar', tradVideo: 'Vinod Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '10:00 AM' },
      { dayNo: 2, date: '20 Nov 2026', eventName: 'Mehndi Evening', location: 'Ekangarsarai Lawn', tradPhoto: 'Vinod Kumar', tradVideo: 'Vinod Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '05:00 PM' },
      { dayNo: 3, date: '21 Nov 2026', eventName: 'Wedding Ceremony', location: 'Ekangarsarai Venue', tradPhoto: 'Vinod Kumar', tradVideo: 'Vinod Kumar', candidPhoto: '—', cinematic: '—', dronePilot: '—', callTime: '06:00 PM' }
    ]
  }
];

const WeddingClient = mongoose.models.WeddingClient || mongoose.model('WeddingClient', WeddingClientSchema);

export default WeddingClient;
