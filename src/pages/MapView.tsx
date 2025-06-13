import { useState } from "react";
import { PropertyMap } from "@/components/PropertyMap";
import { PropertyPreview } from "@/components/PropertyPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Filter } from "lucide-react";
import { PropertyFilters } from "@/components/PropertyFilters";
import { mockProperties } from "@/data/mockProperties";

export function MapView() {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  
  const handleFilterChange = (filters: {
    search: string;
    priceRange: [number, number];
    propertyTypes: string[];
    location: string;
  }) => {
    // In a real app, this would likely be an API call
    const filtered = mockProperties.filter((property) => {
      // Filter by search term
      if (
        filters.search &&
        !property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !property.address.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Filter by price range
      if (
        property.price < filters.priceRange[0] ||
        property.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Filter by property type
      if (
        filters.propertyTypes.length > 0 &&
        !filters.propertyTypes.includes(property.type)
      ) {
        return false;
      }

      // Filter by location
      if (
        filters.location &&
        !property.address.includes(filters.location)
      ) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
    setShowFilters(false);
  };

  const mapProperties = filteredProperties.map(property => ({
    id: property.id,
    title: property.title,
    price: property.price,
    address: property.address,
    lat: property.location.lat,
    lng: property.location.lng,
    type: property.type,
    image: property.images[0]
  }));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-1 -ml-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Listings
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Map View</h1>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="mb-6">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyMap 
            properties={mapProperties} 
            selectedId={selectedProperty || undefined}
            height="calc(100vh - 200px)"
          />
        </div>
        
        <div className="h-[calc(100vh-200px)] overflow-y-auto rounded-lg border p-4">
          <h3 className="mb-4 font-semibold">
            {filteredProperties.length} Properties Found
          </h3>
          
          <div className="space-y-4">
            {filteredProperties.map(property => (
              <div 
                key={property.id}
                className={`cursor-pointer rounded-lg border p-2 transition-colors ${
                  selectedProperty === property.id ? "border-blue-600 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedProperty(property.id === selectedProperty ? null : property.id)}
              >
                <PropertyPreview
                  property={{
                    id: property.id,
                    title: property.title,
                    price: property.price,
                    address: property.address,
                    image: property.images[0],
                    type: property.type
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}