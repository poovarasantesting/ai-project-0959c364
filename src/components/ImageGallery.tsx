import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div 
        className={`relative rounded-lg bg-gray-100 ${
          isFullscreen 
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black" 
            : "h-[500px] overflow-hidden"
        }`}
      >
        <img
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          className={`h-full w-full cursor-pointer object-cover ${
            isFullscreen ? "object-contain" : ""
          }`}
          onClick={toggleFullscreen}
        />
        
        {isFullscreen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 bg-black/20 text-white hover:bg-black/40"
            onClick={toggleFullscreen}
          >
            <X className="h-6 w-6" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 shadow hover:bg-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 shadow hover:bg-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {!isFullscreen && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`relative h-20 cursor-pointer overflow-hidden rounded-md ${
                index === currentIndex ? "ring-2 ring-blue-600 ring-offset-2" : ""
              }`}
              onClick={() => selectImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}