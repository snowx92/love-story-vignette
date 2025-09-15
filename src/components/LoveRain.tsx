import { useEffect, useState } from 'react';

// Define emojis outside component to avoid dependency issues
const loveEmojis = [
  // 3 types of hearts
  '❤️', '💕', '💖',
  // Flowers
  '🌹', '🌸', '🌺', '🌻', '🌷', '🌼', '💐', '🌿', '🌱',
  // Bakery items
  '🎂', '🧁', '🍰', '🍪', '🥧', '🍩', '🥖', '🥐', '🍞',
  // Rings
  '💍', '💎', '✨'
];

const LoveRain = () => {
  const [raindrops, setRaindrops] = useState<Array<{ id: number; left: number; emoji: string; delay: number }>>([]);

  useEffect(() => {
    const createRaindrop = () => {
      const emoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      
      return {
        id: Date.now() + Math.random(),
        left,
        emoji,
        delay
      };
    };

    const interval = setInterval(() => {
      setRaindrops(prev => {
        // Remove old raindrops and add new ones
        const newRaindrops = prev.filter((_, index) => index < 15); // Keep max 15 raindrops
        return [...newRaindrops, createRaindrop()];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="love-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {drop.emoji}
        </div>
      ))}
    </div>
  );
};

export default LoveRain;
