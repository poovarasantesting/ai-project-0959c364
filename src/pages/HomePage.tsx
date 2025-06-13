import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { Button } from "@/components/ui/button";
import { MapPin, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockProperties";

export function HomePage() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  
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
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Property Listings</h1>
        <div className="flex items-center gap-2">
          <Link to="/map">
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Map View
            </Button>
          </Link>
          <div className="flex rounded-md border">
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewType("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <PropertyFilters onFilterChange={handleFilterChange} />

      {filteredProperties.length === 0 ? (
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium">No properties found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewType === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              address={property.address}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              squareFeet={property.squareFeet}
              type={property.type}
              images={property.images}
            />
          ))}
        </div>
      )}
    </div>
  );
}