import { MapPin, Heart, Users, Gem } from 'lucide-react';

const Timeline = () => {
  const milestones = [
    {
      date: "2016",
      title: "First Meeting",
      description: "We met in the beautiful city of Salalah, Sultan of Oman, where our journey began",
      icon: MapPin,
      location: "Salalah, Oman"
    },
    {
      date: "November 28, 2024",
      title: "Love Confession",
      description: "The day we both said 'I love you' and knew this was forever",
      icon: Heart,
      location: "Egypt"
    },
    {
      date: "September 12, 2025",
      title: "Family Meeting",
      description: "When our families met and blessed our beautiful union",
      icon: Users,
      location: "Egypt"
    },
    {
      date: "October 3, 2025",
      title: "Engagement Day",
      description: "The day we officially became engaged and started planning our future together",
      icon: Gem,
      location: "Egypt"
    }
  ];

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Love Story Timeline
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nine years of beautiful moments that led us to this perfect day
          </p>
          <div className="ornament mt-4">❦</div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="vintage-frame">
                    <div className="flex items-center space-x-3 mb-3">
                      <milestone.icon className="h-6 w-6 text-primary" />
                      <span className="text-primary font-semibold text-lg">
                        {milestone.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {milestone.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-accent">
                      <MapPin className="h-4 w-4" />
                      <span>{milestone.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                
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