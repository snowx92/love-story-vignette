import { MapPin, Heart, Users, Gem, Crown } from 'lucide-react';

const Timeline = () => {
  // Generate random dates within realistic ranges
  const generateRandomDate = (year: number, month?: number) => {
    const randomMonth = month || Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    return `${randomMonth}/${randomDay}/${year}`;
  };

  const milestones = [
    {
      date: "2016",
      title: "First Meeting",
      description: "We met in the beautiful city of Salalah, Sultan of Oman, where our journey began",
      icon: MapPin,
      location: "Salalah, Oman"
    },
    {
      date: generateRandomDate(2024, 11),
      title: "Love Confession",
      description: "The day we both said 'I love you' and knew this was forever",
      icon: Heart,
      location: "Egypt"
    },
    {
      date: generateRandomDate(2025, 9),
      title: "Family Meeting",
      description: "When our families met and blessed our beautiful union",
      icon: Users,
      location: "Egypt"
    },
    {
      date: generateRandomDate(2025, 10),
      title: "Engagement Day",
      description: "The day we officially became engaged and started planning our future together",
      icon: Gem,
      location: "Egypt"
    },
    {
      date: generateRandomDate(2026, Math.floor(Math.random() * 6) + 4), // Random date between April-September 2026
      title: "Wedding Day",
      description: "The day we become husband and wife, surrounded by our loved ones",
      icon: Crown,
      location: "Egypt"
    }
  ];

  return (
    <section id="timeline" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="ornament mb-6">❦</div>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Our Love Story Timeline
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nine years of beautiful moments leading to forever
          </p>
          <div className="ornament mt-6">❦</div>
        </div>

        <div className="relative">
          {/* Enhanced Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-primary via-secondary via-accent to-primary rounded-full shadow-lg"></div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} group`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="modern-card">
                    <div className={`flex items-center space-x-4 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <milestone.icon className="h-8 w-8 text-primary animate-pulse" />
                      <span className="text-primary font-bold text-xl bg-primary/10 px-4 py-2 rounded-full">
                        {milestone.date}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                      {milestone.description}
                    </p>
                    <div className={`flex items-center space-x-2 text-accent ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">{milestone.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Timeline Dot */}
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-xl group-hover:scale-125 transition-transform duration-500">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;