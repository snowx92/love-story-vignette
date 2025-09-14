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

  // Sample placeholder photos for demonstration
  const samplePhotos = [
    { id: 1, caption: "The proposal moment" },
    { id: 2, caption: "Ring exchange" },
    { id: 3, caption: "Family celebration" },
    { id: 4, caption: "Happy tears" },
    { id: 5, caption: "First dance" },
    { id: 6, caption: "Group photo" },
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Engagement Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share and view photos from our special engagement celebration
          </p>
          <div className="ornament mt-4">❦</div>
        </div>

        {/* Upload Section */}
        <div className="love-letter text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Camera className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-primary">Share Engagement Photos</h3>
            <Camera className="h-6 w-6 text-primary" />
          </div>
          
          <p className="text-muted-foreground mb-8">
            Were you at our engagement? Upload your photos to share with everyone!
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
            <h3 className="text-2xl font-bold text-primary">Photo Gallery</h3>
          </div>

          {/* Sample Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {samplePhotos.map((photo) => (
              <div key={photo.id} className="vintage-photo group cursor-pointer">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2 hover:bg-muted/80 transition-colors">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {photo.caption}
                </p>
              </div>
            ))}
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
              <p className="text-muted-foreground text-lg">
                No photos uploaded yet. Be the first to share!
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