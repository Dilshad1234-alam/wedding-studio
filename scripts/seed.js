import mongoose from 'mongoose';
import WeddingClient from '../src/models/WeddingClient.js';
import WeddingTeam from '../src/models/WeddingTeam.js';
import CommercialTeam from '../src/models/CommercialTeam.js';
import Inquiry from '../src/models/Inquiry.js';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/wedding-studio";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding.");

    // Clear existing
    await WeddingClient.deleteMany({});
    await WeddingTeam.deleteMany({});
    await CommercialTeam.deleteMany({});
    await Inquiry.deleteMany({});
    
    // Seed Wedding Clients
    await WeddingClient.create([
      {
        coupleNames: 'Rishabh & Shivani',
        email: 'shivani@example.com',
        mobile: '+919876543210',
        eventDate: new Date('2024-11-15'),
        location: 'Patna, Bihar',
        packageSelected: 'Gold Wedding Package (3 Days)',
        totalAmount: 110000,
        amountPaid: 50000,
        status: 'Delivered',
        deliverablesStatus: { photos: true, cinematicVideo: true, teaser: true, albums: true }
      },
      {
        coupleNames: 'Ananya & Rohan',
        email: 'rohan@example.com',
        mobile: '+919876543211',
        eventDate: new Date('2025-01-20'),
        location: 'Jaipur, Rajasthan',
        packageSelected: 'Luxury Wedding Package (3 Days)',
        totalAmount: 150000,
        amountPaid: 20000,
        status: 'Pre-Wedding',
      }
    ]);
    
    // Seed Wedding Team
    const weddingTeamMembers = [];
    for(let i=1; i<=26; i++) {
       weddingTeamMembers.push({
         name: `Crew Member ${i}`,
         role: i === 1 ? 'Lead Photographer' : (i === 2 ? 'Lead Cinematographer' : 'Associate Shooter'),
         specialty: 'Wedding Photography',
         yearsOfExperience: 3 + (i % 5),
       });
    }
    await WeddingTeam.insertMany(weddingTeamMembers);

    // Seed Commercial Team
    await CommercialTeam.create([
      { name: 'Arjun Das', role: 'Creative Director', industryFocus: 'Corporate Ads' },
      { name: 'Sneha Patel', role: 'DOP', industryFocus: 'Product Shoots' },
    ]);

    // Seed Inquiries
    await Inquiry.create([
      {
        name: 'Kabir & Meera',
        mobile: '+918887776665',
        email: 'kabirmeera@example.com',
        selectedPackage: 'Standard Wedding Package (3 Days)',
        eventDate: new Date('2024-12-10'),
        location: 'Varanasi',
        message: 'Looking for natural, candid shots.',
        status: 'New'
      }
    ]);

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
}

seed();
