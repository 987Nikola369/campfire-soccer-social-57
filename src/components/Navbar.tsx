import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-6'}`}>
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="font-bold text-2xl text-gradient">Rocket Academy</a>
        <div className="hidden md:flex gap-8">
          <button onClick={() => scrollToSection('program')} className={`hover:text-primary transition-colors font-semibold relative ${location.pathname === '/' && location.hash === '#program' ? 'active-link' : ''}`}>Program</button>
          <button onClick={() => scrollToSection('schedule')} className={`hover:text-primary transition-colors font-semibold relative ${location.pathname === '/' && location.hash === '#schedule' ? 'active-link' : ''}`}>Schedule</button>
          <button onClick={() => scrollToSection('team')} className={`hover:text-primary transition-colors font-semibold relative ${location.pathname === '/' && location.hash === '#team' ? 'active-link' : ''}`}>Team</button>
          <button onClick={() => scrollToSection('location')} className={`hover:text-primary transition-colors font-semibold relative ${location.pathname === '/' && location.hash === '#location' ? 'active-link' : ''}`}>Location</button>
        </div>
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
