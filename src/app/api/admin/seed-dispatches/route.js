import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
  await mongoose.connect(MONGODB_URI);
}

const DispatchSchema = new mongoose.Schema({
  clientEvent: { type: String, required: true },
  clientName: { type: String, default: '' },
  memberName: { type: String, default: 'Unassigned' },
  destination: { type: String, default: 'Patna' },
  dates: { type: String, default: '' },
  status: { type: String, default: 'scheduled' },
}, { timestamps: true });

const Dispatch = mongoose.models.Dispatch || mongoose.model('Dispatch', DispatchSchema);

const clientDispatches = [
  // 1. Priya Kumari
  {
    clientEvent: "Priya Kumari - Rituals (Bride)",
    clientName: "Priya Kumari",
    memberName: "Rohit, Sanoj",
    destination: "Sitamarhi Home",
    dates: "22 Apr",
    status: "completed"
  },
  {
    clientEvent: "Priya Kumari - Haldi Shoot",
    clientName: "Priya Kumari",
    memberName: "Rohit, Sanoj",
    destination: "Sitamarhi Home",
    dates: "23 Apr",
    status: "completed"
  },
  {
    clientEvent: "Priya Kumari - Rituals (Groom)",
    clientName: "Priya Kumari",
    memberName: "Rohit, Sanoj",
    destination: "Begusarai Home",
    dates: "25 Apr",
    status: "completed"
  },
  {
    clientEvent: "Priya Kumari - Grand Wedding",
    clientName: "Priya Kumari",
    memberName: "Rohit, Aman, Sanjeet, Ritik Saw Kolkata, Manikant (Monu)",
    destination: "Hajipur, Patna",
    dates: "26 Apr",
    status: "completed"
  },

  // 2. Ravi Ranjan
  {
    clientEvent: "Ravi Ranjan - Sangit",
    clientName: "Ravi Ranjan",
    memberName: "Rohit, Sanoj",
    destination: "Hotel Anand Sagar, Kankarbagh",
    dates: "4th May",
    status: "completed"
  },
  {
    clientEvent: "Ravi Ranjan - Haldi, Mehndi",
    clientName: "Ravi Ranjan",
    memberName: "Rohit, Sanoj",
    destination: "Biscomaun Colony, Kumhrar",
    dates: "5th May",
    status: "completed"
  },
  {
    clientEvent: "Ravi Ranjan - Madwa",
    clientName: "Ravi Ranjan",
    memberName: "Rohit, Sanoj",
    destination: "Biscomaun Colony, Kumhrar",
    dates: "6th May",
    status: "completed"
  },
  {
    clientEvent: "Ravi Ranjan - Wedding",
    clientName: "Ravi Ranjan",
    memberName: "Rohit, Sanoj, Sanjeet, Suraj, Manikant (Monu), Banty",
    destination: "Bhagwat Banquet Hall",
    dates: "7th May",
    status: "completed"
  },

  // 3. Abhinav Krishna
  {
    clientEvent: "Abhinav Krishna - Haldi (Kutai)",
    clientName: "Abhinav Krishna",
    memberName: "Rohit, Sanoj",
    destination: "Bihar Sharif",
    dates: "8th May",
    status: "completed"
  },
  {
    clientEvent: "Abhinav Krishna - Tilak",
    clientName: "Abhinav Krishna",
    memberName: "Rohit, Sanoj",
    destination: "Bihar Sharif",
    dates: "9th May",
    status: "completed"
  },
  {
    clientEvent: "Abhinav Krishna - Puja & Matkor",
    clientName: "Abhinav Krishna",
    memberName: "Rohit, Sanoj",
    destination: "Bihar Sharif",
    dates: "10th May",
    status: "completed"
  },
  {
    clientEvent: "Abhinav Krishna - Mehandi & Mandap",
    clientName: "Abhinav Krishna",
    memberName: "Rohit, Sanoj",
    destination: "Bihar Sharif",
    dates: "11th May",
    status: "completed"
  },
  {
    clientEvent: "Abhinav Krishna - Wedding",
    clientName: "Abhinav Krishna",
    memberName: "Rohit, Sanoj, Sanjeet, Suraj, Manikant (Monu)",
    destination: "Bihar Sharif",
    dates: "12th May",
    status: "completed"
  },

  // 4. Nikita Kumari
  {
    clientEvent: "Nikita Kumari - Engagements",
    clientName: "Nikita Kumari",
    memberName: "Rohit, Sanjeet, Ritik Saw",
    destination: "Begusarai",
    dates: "27th Apr",
    status: "completed"
  },
  {
    clientEvent: "Nikita Kumari - Tilak",
    clientName: "Nikita Kumari",
    memberName: "Suraj, Priyanshu, Rohit",
    destination: "Barh",
    dates: "21st June",
    status: "completed"
  },
  {
    clientEvent: "Nikita Kumari - Haldi",
    clientName: "Nikita Kumari",
    memberName: "Rohit, Priyanshu",
    destination: "Barh",
    dates: "22nd June",
    status: "completed"
  },
  {
    clientEvent: "Nikita Kumari - Mehndi",
    clientName: "Nikita Kumari",
    memberName: "Suraj, Priyanshu, Rohit",
    destination: "Barh",
    dates: "23rd June",
    status: "completed"
  },
  {
    clientEvent: "Nikita Kumari - Wedding",
    clientName: "Nikita Kumari",
    memberName: "Rohit, Pintu, Sanjeet, Suraj, Monu, Banty",
    destination: "Patna Bailey Road",
    dates: "24th June",
    status: "completed"
  },

  // 5 & 6. Freelance & Rohit Kumar
  {
    clientEvent: "Freelance - Engagement",
    clientName: "Freelance",
    memberName: "Sanoj, Suraj, Banty",
    destination: "Gaya",
    dates: "22nd June",
    status: "completed"
  },
  {
    clientEvent: "Rohit Kumar - Engagement, Pre-Wed & Wedding",
    clientName: "Rohit Kumar",
    memberName: "Vinod, Sanoj, Banty",
    destination: "Rajgir",
    dates: "24th June",
    status: "completed"
  },
  {
    clientEvent: "Freelance - Engagement Nawada",
    clientName: "Freelance",
    memberName: "Priyanshu",
    destination: "Nawada",
    dates: "24th June",
    status: "completed"
  },
  {
    clientEvent: "Birthday Shoot - Punpun",
    clientName: "Client Punpun",
    memberName: "Rohit, Sanoj, Suraj, Priyanshu",
    destination: "Punpun",
    dates: "3rd July",
    status: "completed"
  },

  // 9. Aparna
  {
    clientEvent: "Aparna - Rituals (Bride)",
    clientName: "Aparna",
    memberName: "Aman, Sanoj, Mithlesh",
    destination: "Kankarbagh",
    dates: "1st Dec",
    status: "scheduled"
  },
  {
    clientEvent: "Aparna - Rituals (Groom)",
    clientName: "Aparna",
    memberName: "Rohit, Shubam Jeh",
    destination: "Patliputra",
    dates: "1st Dec",
    status: "scheduled"
  },
  {
    clientEvent: "Aparna - Wedding",
    clientName: "Aparna",
    memberName: "Aman, Sanoj, Sanjeet, Suraj, Aditya, Mithlesh",
    destination: "Dakbunglow, Patna",
    dates: "2nd Dec",
    status: "scheduled"
  },

  // 10. Kinshuk Shankar
  {
    clientEvent: "Kinshuk Shankar - Haldi, Mehndi",
    clientName: "Kinshuk Shankar",
    memberName: "Aman, Sanoj, Mithlesh",
    destination: "Munger",
    dates: "24th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Kinshuk Shankar - Wedding",
    clientName: "Kinshuk Shankar",
    memberName: "Aman, Shubam Jeh, Sanoj, Aditya, Lucky, Mithlesh",
    destination: "Munger Club",
    dates: "25th Nov",
    status: "scheduled"
  },

  // 11. Shyamli Sharma
  {
    clientEvent: "Shyamli Sharma - Rituals (Bride)",
    clientName: "Shyamli Sharma",
    memberName: "Rohit, Sanoj",
    destination: "Sherghati",
    dates: "23rd Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Shyamli Sharma - Wedding",
    clientName: "Shyamli Sharma",
    memberName: "Rohit, Sanoj, Monu, Banty",
    destination: "Sherghati",
    dates: "24th Nov",
    status: "scheduled"
  },

  // 12. Ankit Kumar
  {
    clientEvent: "Ankit Kumar - Tilak",
    clientName: "Ankit Kumar",
    memberName: "Rohit, Shubam",
    destination: "Patna to Siwan",
    dates: "29th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Ankit Kumar - Haldi, Mehndi, Sangit",
    clientName: "Ankit Kumar",
    memberName: "Suraj",
    destination: "Bailey Road (Hotel Vibrant)",
    dates: "1st Dec",
    status: "scheduled"
  },
  {
    clientEvent: "Ankit Kumar - Wedding",
    clientName: "Ankit Kumar",
    memberName: "Rohit, Shubam, Priyanshu, Monu",
    destination: "Bailey Road (Hotel Vibrant)",
    dates: "2nd Dec",
    status: "scheduled"
  },

  // 13. Guddu Kumar
  {
    clientEvent: "Guddu Kumar - Haldi, Mehndi",
    clientName: "Guddu Kumar",
    memberName: "Vinod, Suraj",
    destination: "Ekangarsarai",
    dates: "18th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Guddu Kumar - Wedding",
    clientName: "Guddu Kumar",
    memberName: "Vinod, Suraj, Aditya",
    destination: "Ekangarsarai",
    dates: "20th Nov",
    status: "scheduled"
  },

  // 14. Anuradha Rani
  {
    clientEvent: "Anuradha Rani - Lagan, Mehndi",
    clientName: "Anuradha Rani",
    memberName: "Vinod",
    destination: "Ekangarsarai",
    dates: "19th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Anuradha Rani - Haldi",
    clientName: "Anuradha Rani",
    memberName: "Suraj, Vinod",
    destination: "Ekangarsarai",
    dates: "20th Nov",
    status: "scheduled"
  },

  // 15. Suraj Sinha
  {
    clientEvent: "Suraj Sinha - Mehndi",
    clientName: "Suraj Sinha",
    memberName: "Shubam Patna, Priyanshu",
    destination: "Patna (AIIMS)",
    dates: "19th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Suraj Sinha - Wedding",
    clientName: "Suraj Sinha",
    memberName: "Shubam Patna, Shubam Jeh, Priyanshu, Manikant (Monu)",
    destination: "Bhusaula Danapur",
    dates: "21st Nov",
    status: "scheduled"
  },

  // 16. Raushan Singh
  {
    clientEvent: "Raushan Singh - Rituals, Haldi, Mehndi",
    clientName: "Raushan Singh",
    memberName: "Suraj, Priyanshu, Mithlesh",
    destination: "Muzaffarpur",
    dates: "29th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Raushan Singh - Wedding",
    clientName: "Raushan Singh",
    memberName: "Shubham Jeh, Suraj, Priyanshu",
    destination: "Muzaffarpur",
    dates: "30th Nov",
    status: "scheduled"
  },

  // 19. Abhishek Kr Roy
  {
    clientEvent: "Abhishek Kr Roy - Tilak",
    clientName: "Abhishek Kr Roy",
    memberName: "Gautam Kr",
    destination: "Samastipur",
    dates: "20th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Abhishek Kr Roy - Haldi Mehndi",
    clientName: "Abhishek Kr Roy",
    memberName: "Gautam Kr, Ritik Cinema",
    destination: "Samastipur",
    dates: "24th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Abhishek Kr Roy - Wedding",
    clientName: "Abhishek Kr Roy",
    memberName: "Gautam Kr, Ritik Cinema",
    destination: "Barat Munger",
    dates: "25th Nov",
    status: "scheduled"
  },

  // 20. Arman
  {
    clientEvent: "Arman - Haldi",
    clientName: "Arman",
    memberName: "Rohit, Sanoj",
    destination: "Bihar Sharif",
    dates: "19th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Arman - Walima",
    clientName: "Arman",
    memberName: "Rohit, Sanoj",
    destination: "Bihar Sharif",
    dates: "25th Nov",
    status: "scheduled"
  },

  // 22. Mani Kant Thakur
  {
    clientEvent: "Mani Kant Thakur - Haldi Mehndi",
    clientName: "Mani Kant Thakur",
    memberName: "Ritik Photo Friend, Ritik",
    destination: "Madhubani",
    dates: "24th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Mani Kant Thakur - Wedding",
    clientName: "Mani Kant Thakur",
    memberName: "Ritik Photo Friend, Ritik",
    destination: "Madhubani",
    dates: "25th Nov",
    status: "scheduled"
  },

  // 23. Md Ahmed
  {
    clientEvent: "Md Ahmed - Rituals",
    clientName: "Md Ahmed",
    memberName: "Rohit, Priyanshu",
    destination: "Patna",
    dates: "12th Nov - 13th Nov",
    status: "scheduled"
  },
  {
    clientEvent: "Md Ahmed - Grand Reception",
    clientName: "Md Ahmed",
    memberName: "Rohit, Priyanshu, Sanoj, Suraj, Lucky Aditya",
    destination: "Patna",
    dates: "16th Nov",
    status: "scheduled"
  },

  // 25. Ankit (Bhagalpur)
  {
    clientEvent: "Ankit - Tilak & Functions",
    clientName: "Ankit",
    memberName: "Ritik Photo, Sikandar",
    destination: "Bhagalpur",
    dates: "2nd Dec - 5th Dec",
    status: "scheduled"
  },
  {
    clientEvent: "Ankit - Grand Wedding",
    clientName: "Ankit",
    memberName: "Sikandar, Ritik Photo, Suraj, Ritik",
    destination: "Bhagalpur",
    dates: "6th Dec",
    status: "scheduled"
  }
];

export async function GET() {
  try {
    await ensureDb();

    for (const item of clientDispatches) {
      await Dispatch.findOneAndUpdate(
        { clientEvent: item.clientEvent },
        { $set: item },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      count: clientDispatches.length,
      message: "Successfully loaded all client operational missions into database!"
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
