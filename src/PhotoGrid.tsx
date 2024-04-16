import React, { useEffect, useState } from 'react';

interface PhotoGridProps {
  photos: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [photos]);

  useEffect(() => {
    setCurrentPhotos(photos.slice(currentIndex, currentIndex + 9));
  }, [photos, currentIndex]);

  return (
    <div className="photo-grid">
      {currentPhotos.map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index}`} />
      ))}
    </div>
  );
};

export default PhotoGrid;
