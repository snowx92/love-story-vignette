import { useState } from 'react';
import { Camera, Upload, Grid, Heart, X } from 'lucide-react';

const Gallery = () => {
  const [engagementPhotos, setEngagementPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setEngagementPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const openPhotoModal = (photo: string) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Engagement Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Dancing Script, cursive' }}>
            No photos uploaded yet from our engagement celebration. Be the first to share your beautiful memories with us!
          </p>
          <div className="ornament mt-4">❦</div>
        </div>

        {/* Upload Section */}
        <div className="modern-card text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Camera className="h-6 w-6 text-primary animate-pulse" />
            <h3 className="text-2xl font-bold text-primary">Share Engagement Photos</h3>
            <Camera className="h-6 w-6 text-primary animate-pulse" />
          </div>
          
          <p className="text-muted-foreground mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Were you at our engagement? We'd love to see your photos! Upload them to share the beautiful moments with everyone.
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
              <span>Upload Engagement Photos</span>
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-8">
            <Grid className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Dancing Script, cursive' }}>Photo Gallery</h3>
          </div>

          {/* Uploaded Photos Grid */}
          {engagementPhotos.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Recently Shared</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {engagementPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="vintage-photo cursor-pointer"
                    onClick={() => openPhotoModal(photo)}
                  >
                    <img
                      src={photo}
                      alt={`Engagement photo ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {engagementPhotos.length === 0 && (
            <div className="text-center py-12 bg-muted/10 rounded-lg">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-lg mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                No engagement photos shared yet
              </p>
              <p className="text-muted-foreground text-sm" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Be the first to upload and share our beautiful engagement memories!
              </p>
            </div>
          )}
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closePhotoModal}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedPhoto}
                alt="Enlarged photo"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;