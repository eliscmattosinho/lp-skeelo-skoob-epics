import Header from '@/features/Nav/Nav';
import Hero from '@/features/Hero/Hero';

import InfoContext from '@/features/InfoContext/InfoContext';
import InfoElements from '@/features/InfoElements/InfoElements';

import Skeelo from '@/features/Skeelo/Skeelo';
import Skoob from '@/features/Skoob/Skoob';

import Contact from '@/features/Contact/Contact';
import Footer from '@/features/Footer/Footer';

function LandingPage() {
  return (
    <div className="lp-structure">
      <Header />
      <Hero />
      <InfoContext />
      <InfoElements />
      <Skeelo />
      <Skoob />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
