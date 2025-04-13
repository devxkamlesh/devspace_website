import Hero from './sections/Hero';
import Features from './sections/Features';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import { HomeWrapper } from '../components/HomeWrapper';

export default function Home() {
  return (
    <HomeWrapper>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </HomeWrapper>
  );
}
