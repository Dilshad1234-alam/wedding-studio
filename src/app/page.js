import LandingPage from './landing/page';
import dbConnect from '@/lib/dbConnect';
import SiteContent from '@/models/SiteContent';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let initialData = null;
  try {
    await dbConnect();
    const content = await SiteContent.findOne({ sectionType: 'landing' }).lean();
    if (content && content.data) {
      initialData = JSON.parse(JSON.stringify(content.data));
    }
  } catch (error) {
    console.error("Error fetching landing content in page.js:", error);
  }

  return <LandingPage initialData={initialData} />;
}