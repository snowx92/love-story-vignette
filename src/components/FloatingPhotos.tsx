import vintagePhoto1 from '@/assets/vintage-photo-1.jpg';
import vintagePhoto2 from '@/assets/vintage-photo-2.jpg';
import vintagePhoto3 from '@/assets/vintage-photo-3.jpg';

const FloatingPhotos = () => {
  const photos = [
    { src: vintagePhoto1, alt: "Vintage couple photo", top: "10%", left: "5%" },
    { src: vintagePhoto2, alt: "Love letter", top: "25%", right: "8%" },
    { src: vintagePhoto3, alt: "Engagement ring", top: "60%", left: "3%" },
    { src: vintagePhoto1, alt: "Romantic moment", top: "80%", right: "5%" },
    { src: vintagePhoto2, alt: "Vintage memory", top: "45%", right: "12%" },
    { src: vintagePhoto3, alt: "Love story", top: "15%", right: "15%" },
  ];

  return (
    <>
      {photos.map((photo, index) => (
        <div
          key={index}
          className="floating-photo vintage-photo hidden lg:block w-20 h-16"
          style={{
            top: photo.top,
            left: photo.left,
            right: photo.right,
            animationDelay: `${index * -1}s`
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  );
};

export default FloatingPhotos;