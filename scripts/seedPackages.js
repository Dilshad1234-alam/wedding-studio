const mongoose = require('mongoose');

// We are assuming standard Mongoose URI, you might need to load dotenv if it's external
// require('dotenv').config({ path: '.env.local' }); // Uncomment if you have .env.local

// Because this is a standalone script, we define the schema here or require it from the app.
// It's safer to just require it if we use standard imports, but Next.js models often use ES modules.
// Let's define it directly here to make it a standalone seed script, or just import it if babel/node supports it.
// To be safe with raw Node, we define the schema inline for the seed script.

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wedding_studio"; // Adjust as needed

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  badge: { type: String },
  savings: { type: String },
  regularPrice: { type: String },
  offerPrice: { type: String },
  schedule: [{
    day: String,
    crew: [String]
  }],
  timeline: [{
    step: String
  }],
  deliverables: [String],
  experience: [String],
  whyChooseTitle: { type: String },
  whyChooseFeatures: [String]
}, { timestamps: true, collection: 'packages' });

const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

const packagesData = [
  {
    title: "STANDARD WEDDING PACKAGE (3 DAYS)",
    subtitle: "3 DAYS EVENT COVERAGE QUOTATION",
    badge: "SPECIAL OFFER PACKAGE",
    savings: "SAVE ₹18,000",
    regularPrice: "₹78,000",
    offerPrice: "₹60,000/-",
    schedule: [
      { day: "Day 1 – Event Coverage", crew: ["1 Traditional Photographer", "1 Traditional Videographer"] },
      { day: "Day 2 – Event Coverage", crew: ["1 Traditional Photographer", "1 Traditional Videographer"] },
      { day: "Day 3 – Wedding Day", crew: ["1 Traditional Photographer", "1 Traditional Videographer", "1 Candid Photographer", "1 Drone Pilot"] }
    ],
    timeline: [],
    deliverables: [
      "1 E-Invitation Video",
      "2 Cinematic Reels",
      "1 Teaser",
      "1 Full-Length Wedding Video",
      "100+ Edited HD Photos",
      "Social Media Ready Photos (Instagram, WhatsApp)",
      "30 Sheets Album",
      "64 GB Premium Pen Drive",
      "All High-Resolution Edited Photos",
      "Complete Raw Photos & Videos"
    ],
    experience: [
      "Professional Coverage & Complete Event Documentation",
      "Professional Drone Coverage on Wedding Day",
      "High-Quality Digital & Pen Drive Delivery"
    ],
    whyChooseTitle: "WHY CHOOSE LENSLOOM?",
    whyChooseFeatures: [
      "Complete Event Coverage",
      "Fast Turnaround",
      "Creative Storytelling",
      "Social Media Optimized",
      "Professional Drone Shots",
      "Premium 30 Sheets Album"
    ]
  },
  {
    title: "SILVER WEDDING PACKAGE (3 DAYS)",
    subtitle: "3 DAYS EVENT COVERAGE QUOTATION",
    badge: "BEST VALUE PACKAGE",
    savings: "SAVE ₹24,000",
    regularPrice: "₹1,04,000",
    offerPrice: "₹80,000/-",
    schedule: [
      { day: "Day 1 – Event Coverage", crew: ["1 Traditional Photographer", "1 Traditional Videographer"] },
      { day: "Day 2 – Event Coverage", crew: ["1 Traditional Photographer", "1 Traditional Videographer"] },
      { day: "Day 3 – Wedding Day", crew: ["1 Traditional Photographer", "1 Traditional Videographer", "1 Cinematographer", "1 Drone Pilot"] }
    ],
    timeline: [],
    deliverables: [
      "1 E-Invitation Video",
      "4 Cinematic Reels",
      "1 Cinematic Teaser",
      "1 Full-Length Wedding Video",
      "100+ Professionally Edited HD Photos",
      "Social Media Ready Photos (Instagram, WhatsApp, Facebook)",
      "30 Sheets Premium Album",
      "1 x 128 GB Premium Pen Drive",
      "All High-Resolution Edited Photos",
      "Complete Raw Photos & Videos"
    ],
    experience: [
      "Professional Cinematic Coverage & Color Grading",
      "Enhanced Photo Retouching & Better Content Planning",
      "High-Quality Final Presentation"
    ],
    whyChooseTitle: "WHY CHOOSE LENSLOOM?",
    whyChooseFeatures: [
      "4K Cinematic Production",
      "Fast Turnaround",
      "Cinematic Storytelling",
      "Social Media Optimized",
      "Professional Color Grading",
      "Complete 3-Day Coverage"
    ]
  },
  {
    title: "GOLD WEDDING PACKAGE (3 DAYS)",
    subtitle: "3 DAYS EVENT COVERAGE QUOTATION",
    badge: "RECOMMENDED PACKAGE",
    savings: "SAVE ₹33,000",
    regularPrice: "₹1,43,000",
    offerPrice: "₹1,10,000/-",
    schedule: [
      { day: "Day 1 – Event Coverage", crew: ["1 Traditional Photographer", "1 Traditional Videographer"] },
      { day: "Day 2 – Event Coverage", crew: ["1 Traditional Photographer", "1 Candid Photographer", "1 Cinematographer"] },
      { day: "Day 3 – Wedding Day", crew: ["1 Traditional Photographer | 1 Traditional Videographer", "1 Candid Photographer | 1 Cinematographer", "1 Drone Pilot"] }
    ],
    timeline: [
      { step: "Preview Photos: Within 24 Hours" },
      { step: "First Cinematic Video: Within 24–48 Hours" },
      { step: "Social Media Ready Photos: Within 2–3 Working Days" },
      { step: "Priority Editing: Faster Content Delivery" }
    ],
    deliverables: [
      "1 E-Invitation Video",
      "7 Cinematic Reels & 1 Cinematic Teaser",
      "1 Full-Length Cinematic Wedding Film",
      "150+ Professionally Edited HD Photos",
      "Social Media Ready Photos (Instagram, WhatsApp, Facebook)",
      "1 x 40 Sheets Premium Album",
      "1 Wedding Magazine – \"Your Wedding Story\"",
      "1 Mini Album & 1 Table Calendar",
      "1 x 128 GB Premium Pen Drive",
      "All High-Resolution Edited Photos",
      "Complete RAW Photos & Videos"
    ],
    experience: [
      "Full Cinematic Wedding Coverage & Professional Cinematography",
      "Advanced Color Grading & Premium Photo Retouching",
      "Creative Wedding Storytelling & Premium Album Designing"
    ],
    whyChooseTitle: "WHY CHOOSE LENSLOOM?",
    whyChooseFeatures: [
      "Full Cinematic Quality",
      "Priority Turnaround",
      "Creative Storytelling",
      "Social Media Optimized",
      "Advanced Color Grading",
      "Premium Magazine & Album"
    ]
  },
  {
    title: "LUXURY WEDDING PACKAGE (3 DAYS)",
    subtitle: "3 DAYS EVENT COVERAGE QUOTATION",
    badge: "LUXURY EXPERIENCE",
    savings: "SAVE ₹45,000",
    regularPrice: "₹1,95,000",
    offerPrice: "₹1,50,000/-",
    schedule: [
      { day: "Day 1 – Event Coverage", crew: ["1 Traditional Photographer", "1 Candid Photographer", "1 Cinematographer"] },
      { day: "Day 2 – Event Coverage", crew: ["1 Traditional Photographer", "1 Candid Photographer", "1 Cinematographer"] },
      { day: "Day 3 – Wedding Day", crew: ["1 Traditional Photographer | 1 Trad. Videographer", "1 Candid Photographer | 1 Cinematographer", "1 Professional Drone Pilot"] }
    ],
    timeline: [
      { step: "Preview Photos: Within 24 Hours" },
      { step: "First Cinematic Video: Within 24–48 Hours" },
      { step: "Social Media Photos: Within 24–48 Hours" },
      { step: "Final Edited Deliverables: Within 20–30 Working Days" },
      { step: "Album Delivery: Within 30–45 Working Days" }
    ],
    deliverables: [
      "1 E-Invitation Video",
      "12 Cinematic Reels & 1 Premium Cinematic Teaser",
      "1 Full-Length Cinematic Wedding Film",
      "250+ Professionally Edited HD Photos",
      "Social Media Ready Photos (Instagram, WhatsApp, Facebook)",
      "50 Sheets Double Decker Premium Album",
      "1 Luxury Wedding Magazine – \"Your Wedding Story\"",
      "Premium Mini Album & Table Calendar",
      "1 Premium 20×30 Portrait Frame",
      "1 x 128 GB Premium Pen Drive",
      "All High-Resolution Edited Photos & Complete Raw Data"
    ],
    experience: [
      "Full Cinematic Experience & Advanced Cinematography",
      "Professional 4K Production & Advanced Color Grading",
      "Advanced Skin Retouching & Luxury Album Designing",
      "Premium Storytelling, Drone Coverage & Priority Fast Track"
    ],
    whyChooseTitle: "WHY CHOOSE LENSLOOM LUXURY?",
    whyChooseFeatures: [
      "Maximum Coverage",
      "Priority Delivery",
      "4K Production",
      "50-Sheet Double Decker",
      "Magazine & 20x30 Frame",
      "Full Cinematic Experience"
    ]
  }
];

async function seedPackages() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    console.log("Clearing existing packages...");
    await Package.deleteMany({});
    console.log("Existing packages cleared.");

    console.log("Seeding new packages...");
    await Package.insertMany(packagesData);
    console.log("Successfully seeded 4 packages!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding packages:", error);
    process.exit(1);
  }
}

seedPackages();
