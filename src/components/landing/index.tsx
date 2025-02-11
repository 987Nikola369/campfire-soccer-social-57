import React from 'react';
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import LocationSection from "./LocationSection";
import ProgramHighlights from "./ProgramHighlights";
import DailySchedule from './DailySchedule';
import TeamSection from "./TeamSection";
import ContactSection from './ContactSection';
import { LoginForm } from '../auth/LoginForm';
import { Facebook, Instagram } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LocationSection />
      <ProgramHighlights />
      <DailySchedule />
      <div className="py-12 px-4 w-full md:w-3/4 lg:w-4/5 xl:w-3/5 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Application</h2>
        <LoginForm />
      </div>
      <TeamSection />
      <ContactSection />
      <footer className="bg-accent py-8 text-center">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            &copy; 2025 Rocket Football Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
