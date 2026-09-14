import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect using MONGODB_URI directly
const MONGODB_URI = process.env.MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
  await mongoose.connect(MONGODB_URI);
}

// Fallback to existing or compile Story model
const StorySchema = new mongoose.Schema({
  couple: { type: String, required: true },
  tagline: { type: String },
  desc: { type: String },
  mainImage: { type: String },
  thumbnails: [{ type: String }],
}, { timestamps: true, collection: 'stories' });

const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

const rawStories = [
  {
    coupleName: "Abhishek & Ruchi",
    tagline: "ANANYA & KABIR • JAIPUR",
    description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever.",
    coverImage: "[https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Nitika & Abhinav",
    tagline: "ROYAL HERITAGE • PATNA, BIHAR",
    description: "A breathtaking destination celebration set against historical backdrops. Every traditional ritual and candid smile was preserved in cinematic splendor.",
    coverImage: "[https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Rahul & Priya",
    tagline: "PALACE SOIREE • UDAIPUR",
    description: "Royal architecture meeting modern romance. The evening pheras under a starlit sky created pure magic for the camera lenses.",
    coverImage: "[https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Rohan & Ananya",
    tagline: "GARDEN VOWS • VARANASI",
    description: "Intimate moments by the Ganges, filled with soulful music, deep emotional vows, and an intimate gathering of close family.",
    coverImage: "[https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Kabir & Meera",
    tagline: "BEACHSIDE ROMANCE • GOA",
    description: "A breezy sunset wedding by the sea. Barefoot walks on the sand and golden hour portraits that captured pure, unscripted bliss.",
    coverImage: "[https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Vikram & Shreya",
    tagline: "GRAND RESORT • DELHI NCR",
    description: "High-energy sangeet nights followed by a grand traditional ceremony. Every flash of color and joyful tear was documented seamlessly.",
    coverImage: "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Karan & Pooja",
    tagline: "HERITAGE HAVELI • JODHPUR",
    description: "Vibrant turbans, royal jewelry, and majestic fort views. An authentic Rajasthani wedding celebration captured with true cinematic flair.",
    coverImage: "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Siddharth & Neha",
    tagline: "MODERN CHIC • MUMBAI",
    description: "A stylish urban wedding featuring minimalist decor, emotional cocktail speeches, and high-fashion editorial portraits.",
    coverImage: "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Aditya & Ritu",
    tagline: "MOUNTAIN RETREAT • DARJEELING",
    description: "Wrapped in mist and mountain beauty, this pre-wedding and intimate ceremony captured raw nature paired with heartfelt romance.",
    coverImage: "[https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1546188997-c596e1a44c3b?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80)"
    ]
  },
  {
    coupleName: "Varun & Sneha",
    tagline: "ROYAL PALACE • BENGALURU",
    description: "A grand celebration filled with majestic floral arrangements, traditional rituals, and a stunning reception filled with unforgettable dance performances.",
    coverImage: "[https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85](https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85)",
    thumbnails: [
      "[https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1545232979-fbf9e2c556fe?auto=format&fit=crop&w=800&q=80)",
      "[https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80)"
    ]
  }
];

const extractUrl = (mdLink) => {
  const match = mdLink.match(/\((.*?)\)/);
  return match ? match[1] : mdLink;
};

export async function GET() {
  try {
    await ensureDb();

    const storiesToInsert = rawStories.map(s => ({
      couple: s.coupleName,
      tagline: s.tagline,
      desc: s.description,
      mainImage: extractUrl(s.coverImage),
      thumbnails: s.thumbnails.map(extractUrl)
    }));

    for (const story of storiesToInsert) {
      await Story.findOneAndUpdate(
        { couple: story.couple },
        { $set: story },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      count: storiesToInsert.length,
      message: "Successfully seeded stories!"
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
