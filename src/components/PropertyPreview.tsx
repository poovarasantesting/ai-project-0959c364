import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface PropertyPreviewProps {
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
    image: string;
    type: string;
  };
  onClose?: () => void;
}

export function PropertyPreview({ property, onClose }: PropertyPreviewProps) {
  return (
    <div className="overflow-hidden rounded-md">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute right-1 top-1 rounded-full bg-white p-1 shadow hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      <Link to={`/property/${property.id}`}>
        <div className="relative h-32 w-full">
          <img 
            src={property.image} 
            alt={property.title}
            className="h-full w-full object-cover" 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span className="rounded-sm bg-blue-600 px-1.5 py-0.5 text-xs font-medium text-white">
              {property.type}
            </span>
          </div>
        </div>
        
        <div className="p-2">
          <h4 className="font-semibold line-clamp-1">{property.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-1">{property.address}</p>
          <p className="mt-1 font-bold text-blue-600">${property.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
}