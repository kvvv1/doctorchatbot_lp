import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { trackVisit } from './utils/track';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatbotPlayground from './components/ChatbotPlayground';
import DashboardShowcase from './components/DashboardShowcase';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Integrations from './components/Integrations';
import ROICalculator from './components/ROICalculator';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import InformacoesLandingPage from './pages/InformacoesLandingPage';
import NotFound from './pages/NotFound';

const Home = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <main>
      <Hero />
      <HowItWorks />
      <ChatbotPlayground />
      <DashboardShowcase />
      <Features />
      <Integrations />
      <ROICalculator />
      <Plans />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/informacoes/:slug" element={<InformacoesLandingPage />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

function App() {
  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;
