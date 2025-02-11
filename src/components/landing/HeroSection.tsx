import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/80 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="inline-block px-6 py-2 rounded-full text-sm neo-blur hover:bg-white/20 transition-colors cursor-pointer animate-float">
            June 5-8, 2025 • Split, Croatia
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Train Like a Pro at{" "}
            <span className="text-gradient bg-gradient-to-r from-primary via-primary to-primary-dark animate-pulse-subtle">
              Rocket Football Academy
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            A unique football experience for young talents aged 8-15, led by Ivan Rakitić and professional coaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <button className="group bg-primary hover:bg-primary-dark transition-all duration-500 px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10">Register Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <button className="neo-blur hover:bg-white/20 transition-all duration-300 px-8 py-4 rounded-lg font-semibold hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-accent to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
