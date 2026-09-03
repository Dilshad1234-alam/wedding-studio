import Hero from '@/components/Hero';
import ReviewsSection from '@/components/ReviewsSection';
import StudioIntro from '@/components/StudioIntro';
import FeaturedWeddings from '@/components/FeaturedWeddings';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ClientFeedback from '@/components/ClientFeedback';
import AwardsSection from '@/components/AwardsSection';
import FaqSection from '@/components/FaqSection';
import InstagramGrid from '@/components/InstagramGrid';


export default function HomePage() {
  return (
    <>
      <Hero />
      <ReviewsSection />
      <StudioIntro />
      <FeaturedWeddings />
      <ServicesSection />
      <WhyChooseUs />
      <ClientFeedback />
      <AwardsSection />
      <FaqSection />
      <InstagramGrid />

    </>
  );
}