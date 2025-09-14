import { useState } from 'react';
import { Heart, Send, MessageCircle } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "Ahmad & Fatima",
      message: "Wishing you both a lifetime of love and happiness! You two are perfect together.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah's Family",
      message: "So excited to welcome Mohamed to our family! Can't wait for the wedding!",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "College Friends",
      message: "From our university days to now - watching your love story unfold has been beautiful!",
      date: "2 weeks ago"
    }
  ]);

  const [newWish, setNewWish] = useState({ name: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWish.name && newWish.message) {
      const wish: Wish = {
        id: wishes.length + 1,
        name: newWish.name,
        message: newWish.message,
        date: 'Just now'
      };
      setWishes([wish, ...wishes]);
      setNewWish({ name: '', message: '' });
    }
  };

  return (
    <section id="wishes" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Your Wishes for Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your love, blessings, and beautiful wishes for our journey ahead
          </p>
          <div className="ornament mt-4">❦</div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Wish Form */}
          <div className="modern-card">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="h-6 w-6 text-primary animate-pulse" />
              <h3 className="text-2xl font-bold text-primary">Leave a Wish</h3>
              <Heart className="h-6 w-6 text-primary animate-pulse" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newWish.name}
                  onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                  className="vintage-input"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Wish
                </label>
                <textarea
                  value={newWish.message}
                  onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                  className="vintage-input min-h-[120px] resize-none"
                  placeholder="Share your heartfelt wishes for Mohamed and Sarah..."
                  required
                />
              </div>

              <button
                type="submit"
                className="vintage-button w-full flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Your Wish</span>
              </button>
            </form>
          </div>

          {/* Wishes Display */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary">Wishes Received</h3>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishes.map((wish) => (
                <div key={wish.id} className="modern-card">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{wish.name}</h4>
                    <span className="text-xs text-muted-foreground">{wish.date}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "{wish.message}"
                  </p>
                  <div className="flex justify-end mt-3">
                    <Heart className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {wishes.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No wishes yet. Be the first to share your blessing!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishes;