import { useState, useCallback, useMemo, useEffect } from 'react';
import photo1 from '@/assets/1.jpeg';
import photo2 from '@/assets/2.jpeg';
import photo3 from '@/assets/3.jpeg';
import photo4 from '@/assets/4.jpeg';
import photo5 from '@/assets/5.jpeg';
import photo6 from '@/assets/6.jpeg';
import photo7 from '@/assets/7.jpeg';
import photo8 from '@/assets/8.jpeg';
import photo9 from '@/assets/9.jpeg';
import photo10 from '@/assets/10.jpeg';

const FloatingPhotos = () => {
  const [enlargedPhoto, setEnlargedPhoto] = useState<{ show: boolean; src: string; alt: string }>({
    show: false,
    src: '',
    alt: ''
  });

  const allPhotos = useMemo(() => [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10], []);
const loveMessages = [
  // Arabic Romantic Poetry
  "وفي عينيكِ رأيتُ كلَّ الأوطان 🌹",
  "أنتِ البداية التي لا تنتهي، والدهشة التي لا تزول 💕",
  "كلما ابتسمتِ، امتلأ قلبي بالطمأنينة ✨",
  "أحبك حبًّا لو وزع على هذا العالم لكفاه 💫",
  "يا نبض قلبي، يا أغنيتي التي لا تنطفئ 🎶",
  "معكِ، يصبح العمر قصيدة بلا نهاية 📖",
  "أنتِ سكوني حين يضجّ العالم 🌌",
  "وجودكِ حولي، يجعل الليل قمراً دائمًا 🌙",
  "أحبك فوق الحب، كما تحب الروح سرَّ الخلود 🕊️",

  // English Lyrics (Cigarettes After Sex style)
  "Your touch feels like a dream I never want to wake up from 🌒",
  "In the silence, your voice is all I hear ✨",
  "Every night, I fall in love with you again under the stars 🌌",
  "Your kiss tastes like eternity, soft and endless 💋",
  "I carry your presence in every shadow and every light 🌙",
  "Being with you feels like slow dancing in a dream 🖤",
  "You’re the secret melody my heart plays on repeat 🎶",
  "The world fades, but you remain — infinite and true ♾️"
];

  const generateAllPhotos = useCallback(() => {
    // Generate positions that work on both mobile and desktop
    const desktopPositions = [
      { top: "8%", left: "2%" },
      { top: "15%", right: "1%" },
      { top: "25%", left: "1%" },
      { top: "35%", right: "2%" },
      { top: "45%", left: "3%" },
      { top: "55%", right: "1%" },
      { top: "65%", left: "2%" },
      { top: "75%", right: "3%" },
      { top: "85%", left: "1%" },
      { top: "18%", right: "5%" }
    ];

    // Mobile-friendly positions (fewer photos, better spacing)
    const mobilePositions = [
      { top: "10%", left: "5%" },
      { top: "20%", right: "5%" },
      { top: "40%", left: "5%" },
      { top: "60%", right: "5%" },
      { top: "80%", left: "5%" },
    ];

    // Determine if mobile based on screen width
    const isMobile = window.innerWidth < 768;
    const positions = isMobile ? mobilePositions : desktopPositions;
    const photosToShow = isMobile ? 5 : 10;

    // Shuffle positions for randomness
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    const selectedPhotos = allPhotos.slice(0, photosToShow);

    return selectedPhotos.map((photo, index) => ({
      src: photo,
      alt: `Love memory ${index + 1}`,
      id: `photo-${index}`,
      ...shuffledPositions[index]
    }));
  }, [allPhotos]);

  const [photos, setPhotos] = useState(generateAllPhotos);

  // Re-randomize positions every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotos(generateAllPhotos());
    }, 15000);

    return () => clearInterval(interval);
  }, [generateAllPhotos]);

  // Handle screen resize to update photos layout
  useEffect(() => {
    const handleResize = () => {
      setPhotos(generateAllPhotos());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateAllPhotos]);

  const handlePhotoClick = (e: React.MouseEvent, photo: { src: string; alt: string; id: string }) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Photo clicked:', photo.alt); // Debug log
    setEnlargedPhoto({ show: true, src: photo.src, alt: photo.alt });
  };

  const closeEnlargedPhoto = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEnlargedPhoto({ show: false, src: '', alt: '' });
  };

  return (
    <>
      <style>{`
        @keyframes floatSlow {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-12px) rotate(1deg);
          }
        }
        
        @keyframes floatMobile {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-8px) rotate(0.5deg);
          }
        }
        
        .floating-photo-container {
          position: absolute;
          pointer-events: auto;
          z-index: 5;
        }
        
        .floating-photo-container:hover {
          z-index: 20 !important;
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .floating-photo-container {
            animation: floatMobile 6s ease-in-out infinite alternate !important;
          }
        }

        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .floating-photo-container {
            animation: floatSlow 8s ease-in-out infinite alternate !important;
          }
        }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .floating-photo-container {
            animation: floatSlow 10s ease-in-out infinite alternate !important;
          }
        }
      `}</style>
      
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="floating-photo-container vintage-photo w-20 h-16 sm:w-24 sm:h-18 md:w-28 md:h-20 lg:w-32 lg:h-24 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:rotate-2"
          style={{
            top: photo.top,
            left: photo.left,
            right: photo.right,
            animationDelay: `${index * -0.8}s`,
            pointerEvents: 'auto'
          }}
          onClick={(e) => handlePhotoClick(e, photo)}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover rounded-md sm:rounded-lg border border-white sm:border-2 shadow-md sm:shadow-lg transition-all duration-500 hover:border-pink-300"
            draggable={false}
          />
        </div>
      ))}
      
      {/* Enlarged Photo Modal */}
      {enlargedPhoto.show && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] transition-all duration-500 ease-in-out p-2 sm:p-4"
          style={{ backdropFilter: 'blur(5px)' }}
          onClick={(e) => closeEnlargedPhoto(e)}
        >
          <div 
            className="relative max-w-[95vw] max-h-[90vh] sm:max-w-[90vw] sm:max-h-[85vh] animate-in zoom-in duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={enlargedPhoto.src}
              alt={enlargedPhoto.alt}
              className="w-full h-full object-contain rounded-lg sm:rounded-xl shadow-2xl transition-transform duration-300"
              style={{ maxHeight: '80vh' }}
            />
            
            {/* Close Button */}
            <button
              onClick={(e) => closeEnlargedPhoto(e)}
              className="absolute top-1 right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 shadow-lg hover:scale-110"
              aria-label="Close"
            >
              ×
            </button>
            
            {/* Love Message */}
            <div className="absolute -bottom-2 sm:-bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-8 md:py-4 rounded-full shadow-2xl animate-pulse max-w-[90vw] sm:max-w-xs md:max-w-md text-center">
              <span className="text-xs sm:text-sm font-medium">
                {loveMessages[Math.floor(Math.random() * loveMessages.length)]}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingPhotos;