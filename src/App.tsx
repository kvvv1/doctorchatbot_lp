import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ChatbotPlayground />
        <DashboardShowcase />
        <HowItWorks />
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
}

export default App;