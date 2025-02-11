import { Calendar, Clock, Users, Award } from "lucide-react";

const scheduleData = [
  {
    day: "Day 1",
    title: "Arrival & Kick-Off",
    items: [
      "Welcome and Check-in",
      "Academy Introduction",
      "Team Formation",
      "Opening Ceremony"
    ]
  },
  {
    day: "Day 2",
    title: "Skills & Drills",
    items: [
      "Morning Fitness Session",
      "Technical Skills Training",
      "Tactical Drills",
      "Scrimmage Game"
    ]
  },
  {
    day: "Day 3",
    title: "Strategy & Analysis",
    items: [
      "Video Analysis Session",
      "Strategic Planning Workshop",
      "Position-Specific Training",
      "Full Team Practice"
    ]
  },
  {
    day: "Day 4",
    title: "Tournament & Awards",
    items: [
      "Mini-Tournament",
      "Final Match",
      "Awards Ceremony",
      "Farewell Dinner"
    ]
  }
];

const DailySchedule = () => {
  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold animate-fade-in">Daily Schedule</h2>
          <p className="text-gray-300 mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Four days of intensive training and development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scheduleData.map((day, index) => (
            <div
              key={day.day}
              className="neo-blur p-6 rounded-xl hover-scale card-hover"
              style={{
                animation: `fade-in 0.5s ease-out ${index * 0.2}s both`
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary animate-pulse-subtle" />
                <h3 className="text-xl font-semibold">{day.day}</h3>
              </div>
              <h4 className="text-lg font-medium mb-4 text-primary">{day.title}</h4>
              <ul className="space-y-3">
                {day.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-gray-300 flex items-start gap-2 hover:text-white transition-colors duration-300"
                    style={{
                      animation: `fade-in 0.3s ease-out ${(index * 0.2) + (i * 0.1)}s both`
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailySchedule;
