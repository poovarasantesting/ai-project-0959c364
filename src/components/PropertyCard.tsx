import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  type: string;
  images: string[];
}

export function PropertyCard({
  id,
  title,
  price,
  address,
  bedrooms,
  bathrooms,
  squareFeet,
  type,
  images
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Link to={`/property/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-64 w-full">
          <img
            src={images[currentImageIndex]}
            alt={title}
            className="h-full w-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          <Badge className="absolute left-2 top-2">{type}</Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
            <p className="font-bold text-blue-600">${price.toLocaleString()}</p>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <p className="line-clamp-1">{address}</p>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <div className="flex w-full justify-between text-sm">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-gray-400" />
              <span>{bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-gray-400" />
              <span>{bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4 text-gray-400" />
              <span>{squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}