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
      date: "28-11-2024",
      title: "Love Confession",
      description: "The day we both said 'I love you' and knew this was forever",
      icon: Heart,
      location: "Egypt"
    },
    {
      date: "12-09-2025",
      title: "Family Meeting",
      description: "When our families met and blessed our beautiful union",
      icon: Users,
      location: "Egypt"
    },
    {
      date: "03-10-2025",
      title: "Engagement Day",
      description: "The day we officially became engaged and started planning our future together",
      icon: Gem,
      location: "Egypt"
    },
    {
      date: "Soon ♥",
      title: "Wedding Day",
      description: "I'm working hard every day to prepare our beautiful home so we can marry soon. Our wedding day will be perfect when the time is right, surrounded by our loved ones",
      icon: Crown,
      location: "Egypt"
    }
  ];

  return (
    <section id="timeline" className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <div className="ornament mb-4 sm:mb-6">❦</div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 sm:mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Our Love Story Timeline
          </h2>
          <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Nine years of beautiful moments leading to forever
          </p>
          <div className="ornament mt-4 sm:mt-6">❦</div>
        </div>

        {/* Mobile Horizontal Timeline */}
        <div className="block lg:hidden">
          <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary via-pink-400 to-amber-500 rounded-full shadow-lg"></div>
            
            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto pb-6 timeline-scroll">
              <div className="flex space-x-8 min-w-max px-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    {/* Timeline Dot */}
                    <div className="relative z-10 mb-6">
                      <div className="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-xl group-hover:scale-125 transition-all duration-500 flex items-center justify-center">
                        <milestone.icon className="h-4 w-4 text-white" />
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-72 bg-white rounded-xl border-2 border-amber-200 shadow-lg p-4 transform group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 hover:border-primary">
                      <div className="text-center">
                        <div className="bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full inline-block mb-3">
                          {milestone.date}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-sm leading-relaxed" style={{ fontFamily: 'Dancing Script, cursive' }}>
                          {milestone.description}
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-accent">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium text-sm" style={{ fontFamily: 'Dancing Script, cursive' }}>{milestone.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll Hint */}
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground animate-pulse" style={{ fontFamily: 'Dancing Script, cursive' }}>
                ← Swipe to explore our journey →
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Vertical Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-primary via-pink-400 to-amber-500 rounded-full shadow-lg"></div>

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
                      <h3 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-lg leading-relaxed" style={{ fontFamily: 'Dancing Script, cursive' }}>
                        {milestone.description}
                      </p>
                      <div className={`flex items-center space-x-2 text-accent ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <MapPin className="h-5 w-5" />
                        <span className="font-medium" style={{ fontFamily: 'Dancing Script, cursive' }}>{milestone.location}</span>
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
      </div>
    </section>
  );
};

export default Timeline;