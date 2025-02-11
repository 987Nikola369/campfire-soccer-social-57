import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
          <button onClick={() => scrollToSection('program')} className="hover:text-primary transition-colors">Program</button>
          <button onClick={() => scrollToSection('schedule')} className="hover:text-primary transition-colors">Schedule</button>
          <button onClick={() => scrollToSection('team')} className="hover:text-primary transition-colors">Team</button>
          <button onClick={() => scrollToSection('location')} className="hover:text-primary transition-colors">Location</button>
        </div>
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
