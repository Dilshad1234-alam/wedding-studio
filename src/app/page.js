import Hero from '@/components/Hero';
import ReviewsSection from '@/components/ReviewsSection';
import StudioIntro from '@/components/StudioIntro';
import FeaturedWeddings from '@/components/FeaturedWeddings';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ClientFeedback from '@/components/ClientFeedback';
import RecentPhotoshoots from '@/components/RecentPhotoshoots';
import AwardsSection from '@/components/AwardsSection';
import FaqSection from '@/components/FaqSection';
import InstagramGrid from '@/components/InstagramGrid';


export default function HomePage() {
  return (
    <div className="bg-[#212639] text-[#E8E6E1] min-h-screen">
<Hero />
      <ReviewsSection />
      <StudioIntro />
      <FeaturedWeddings />
      <ServicesSection />
      <WhyChooseUs />
      <ClientFeedback />
      <RecentPhotoshoots />
      <AwardsSection />
      <FaqSection />
      <InstagramGrid />
    </div>
  );
}