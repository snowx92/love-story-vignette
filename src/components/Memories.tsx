import { useState } from 'react';
import { Camera, Upload, Heart } from 'lucide-react';

const Memories = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const sampleMemories = [
    { id: 1, caption: "Our first trip together", date: "2018" },
    { id: 2, caption: "Celebrating anniversaries", date: "2020" },
    { id: 3, caption: "Family gatherings", date: "2025" },
    { id: 4, caption: "Beautiful moments", date: "2025" },
  ];

  return (
    <section id="memories" className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Beautiful Memories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Moments we've shared throughout our journey together
          </p>
          <div className="ornament mt-4">❦</div>
        </div>

        {/* Sample Memory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {sampleMemories.map((memory) => (
            <div key={memory.id} className="vintage-photo group cursor-pointer">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-1">{memory.caption}</h3>
                <p className="text-sm text-muted-foreground">{memory.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="modern-card text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-6 w-6 text-primary animate-pulse" />
            <h3 className="text-2xl font-bold text-primary">Share Your Memories</h3>
            <Heart className="h-6 w-6 text-primary animate-pulse" />
          </div>
          
          <p className="text-muted-foreground mb-8">
            Upload your favorite photos of us to add to our memory collection
          </p>

          <div className="relative inline-block">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="vintage-button flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Photos</span>
            </button>
          </div>

          {/* Uploaded Photos Display */}
          {uploadedPhotos.length > 0 && (
            <div className="mt-12">
              <h4 className="text-xl font-semibold text-foreground mb-6">Recently Uploaded</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="vintage-photo">
                    <img
                      src={photo}
                      alt={`Uploaded memory ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Memories;