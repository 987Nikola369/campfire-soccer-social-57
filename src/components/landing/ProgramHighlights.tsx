import { Trophy, Users, Calendar, Video } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Professional Training",
    description: "Learn from experienced coaches and football professionals"
  },
  {
    icon: Users,
    title: "Individual Approach",
    description: "Personalized feedback and development plans"
  },
  {
    icon: Calendar,
    title: "4-Day Program",
    description: "Intensive training sessions and workshops"
  },
  {
    icon: Video,
    title: "Video Analysis",
    description: "Modern technology for performance tracking"
  }
];

const ProgramHighlights = () => {
  return (
    <section id="program" className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">Program Highlights</h2>
          <p className="text-gray-300 mt-6 text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover what makes our academy unique
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="neo-blur p-8 rounded-xl hover-scale card-hover"
              style={{
                animation: `fade-in 0.5s ease-out ${index * 0.2}s both`
              }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                <feature.icon className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
