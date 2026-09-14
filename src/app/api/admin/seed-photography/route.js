import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
  await mongoose.connect(MONGODB_URI);
}

const PhotographySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  category: { type: String },
  imageUrl: { type: String, required: true },
}, { timestamps: true, collection: 'photography' });

const Photography = mongoose.models.Photography || mongoose.model('Photography', PhotographySchema);

const rawPhotography = [
  {
    title: "Royal Rajputana Vows",
    category: "Wedding",
    location: "JAIPUR PALACE",
    imageUrl: "[https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Monsoon Garland Celebration",
    category: "Haldi & Sangeet",
    location: "PATNA GREENS",
    imageUrl: "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Heirloom Bridal Jewelry",
    category: "Wedding",
    location: "HERITAGE COURTYARD",
    imageUrl: "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Golden Hour Whispers",
    category: "Pre-Wedding",
    location: "VARANASI GHATS",
    imageUrl: "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Marigold Symphony",
    category: "Haldi & Sangeet",
    location: "SHANGRI-LA PALACE",
    imageUrl: "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Midnight Sangeet Beats",
    category: "Haldi & Sangeet",
    location: "HOTEL MAURYA",
    imageUrl: "[https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Timeless Traditions",
    category: "Wedding",
    location: "UDAIPUR FORT",
    imageUrl: "[https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Ethereal Moments",
    category: "Pre-Wedding",
    location: "TAJ LAKE PALACE",
    imageUrl: "[https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Serene Mountain Vows",
    category: "Pre-Wedding",
    location: "DARJEELING MIST",
    imageUrl: "[https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80)"
  },
  {
    title: "Grand Reception Gala",
    category: "Wedding",
    location: "BENGALURU PALACE",
    imageUrl: "[https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=800&q=80)"
  }
];

const extractUrl = (mdLink) => {
  const match = mdLink.match(/\((.*?)\)/);
  return match ? match[1] : mdLink;
};

export async function GET() {
  try {
    await ensureDb();

    const photographyToInsert = rawPhotography.map(item => ({
      title: item.title,
      category: item.category,
      location: item.location,
      imageUrl: extractUrl(item.imageUrl)
    }));

    for (const item of photographyToInsert) {
      await Photography.findOneAndUpdate(
        { title: item.title },
        { $set: item },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      count: photographyToInsert.length,
      message: "Successfully seeded photography portfolio!"
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
