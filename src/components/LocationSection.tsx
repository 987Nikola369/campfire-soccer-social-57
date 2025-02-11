import { MapPin, Calendar, Users } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="location" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold animate-fade-in">Location & Accommodation</h2>
          <p className="text-gray-300 mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            NK Primorac, Split & Camp Stobreč
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className="glass p-8 rounded-xl hover-scale card-hover"
            style={{
              animation: "fade-in 0.5s ease-out 0.3s both"
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary animate-pulse-subtle" />
              <h3 className="text-2xl font-semibold">Training Facility</h3>
            </div>
            <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
              Professional training grounds at NK Primorac, Split, equipped with modern facilities and technology for optimal performance development.
            </p>
            <ul className="space-y-3">
              {/* ... keep existing code (facility features list) */}
            </ul>
          </div>

          <div 
            className="glass p-8 rounded-xl hover-scale card-hover"
            style={{
              animation: "fade-in 0.5s ease-out 0.4s both"
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary animate-pulse-subtle" />
              <h3 className="text-2xl font-semibold">Accommodation</h3>
            </div>
            <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
              Comfortable stay at Camp Stobreč with modern mobile homes, perfect for team bonding and rest after training sessions.
            </p>
            <ul className="space-y-3">
              {/* ... keep existing code (accommodation features list) */}
            </ul>
          </div>
        </div>

        <div 
          className="mt-12 glass p-8 rounded-xl text-center hover-scale"
          style={{
            animation: "fade-in 0.5s ease-out 0.5s both"
          }}
        >
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 animate-float">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-gray-300">June 5-8, 2025</span>
            </div>
            <div className="flex items-center gap-2 animate-float" style={{ animationDelay: "0.2s" }}>
              <Users className="w-5 h-5 text-primary" />
              <span className="text-gray-300">Ages 8-15</span>
            </div>
            <div className="flex items-center gap-2 animate-float" style={{ animationDelay: "0.4s" }}>
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-gray-300">Split, Croatia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
