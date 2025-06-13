import { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";
import { PropertyPreview } from "@/components/PropertyPreview";

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  lat: number;
  lng: number;
  type: string;
  image: string;
}

interface PropertyMapProps {
  properties: Property[];
  height?: string;
  selectedId?: string;
}

export function PropertyMap({ properties, height = "600px", selectedId }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // This is a simplified map visualization without actual map integration
  // In a real app, you would integrate with Google Maps, Mapbox, Leaflet, etc.
  useEffect(() => {
    if (selectedId) {
      const property = properties.find(p => p.id === selectedId);
      if (property) {
        setSelectedProperty(property);
      }
    }
  }, [selectedId, properties]);

  return (
    <div className="relative rounded-lg border shadow">
      <div 
        ref={mapRef} 
        className="relative bg-blue-50" 
        style={{ height }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-center text-gray-500">
            Map visualization (would integrate with Google Maps, Mapbox, etc.)
          </p>
        </div>
        
        {/* Property markers */}
        {properties.map((property) => (
          <div
            key={property.id}
            className={`absolute cursor-pointer transition-all hover:z-10 ${
              selectedProperty?.id === property.id ? "z-10 scale-125" : ""
            }`}
            style={{
              left: `${(property.lng + 180) / 360 * 100}%`,
              top: `${(90 - property.lat) / 180 * 100}%`,
              transform: "translate(-50%, -50%)"
            }}
            onClick={() => setSelectedProperty(property)}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              selectedProperty?.id === property.id 
                ? "bg-blue-600 text-white" 
                : "bg-white text-blue-600"
            } shadow-md`}>
              <Home className="h-4 w-4" />
            </div>
          </div>
        ))}
        
        {/* Property preview popup */}
        {selectedProperty && (
          <div 
            className="absolute z-20 w-64 rounded-lg bg-white p-2 shadow-lg"
            style={{
              left: `${(selectedProperty.lng + 180) / 360 * 100}%`,
              top: `${(90 - selectedProperty.lat) / 180 * 100}%`,
              transform: "translate(-50%, calc(-100% - 16px))"
            }}
          >
            <PropertyPreview property={selectedProperty} />
            <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
          </div>
        )}
      </div>
    </div>
  );
}