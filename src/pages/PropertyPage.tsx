import { useParams } from "react-router-dom";
import { 
  Bed, 
  Bath, 
  Square, 
  CalendarClock, 
  MapPin, 
  Home as HomeIcon, 
  Banknote, 
  ChevronLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "@/components/ImageGallery";
import { PropertyMap } from "@/components/PropertyMap";
import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockProperties";

export function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, fetch from API based on ID
  const property = mockProperties.find(p => p.id === id);
  
  if (!property) {
    return (
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold">Property not found</h2>
        <p className="mt-2 text-gray-500">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button className="mt-4">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="mb-2 flex items-center gap-1 -ml-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Listings
          </Button>
        </Link>
        
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{property.title}</h1>
            <div className="mt-1 flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{property.address}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">${Math.round(property.price / property.squareFeet).toLocaleString()} per sqft</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImageGallery images={property.images} />
          
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Bed className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-xl font-semibold">{property.bedrooms}</p>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Bath className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-xl font-semibold">{property.bathrooms}</p>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Square className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-xl font-semibold">{property.squareFeet.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Square Feet</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <CalendarClock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-xl font-semibold">{property.yearBuilt}</p>
                  <p className="text-sm text-gray-500">Year Built</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{property.description}</p>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-y-2 sm:grid-cols-3">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <PropertyMap 
                properties={[{
                  id: property.id,
                  title: property.title,
                  price: property.price,
                  address: property.address,
                  lat: property.location.lat,
                  lng: property.location.lng,
                  type: property.type,
                  image: property.images[0]
                }]}
                selectedId={property.id}
                height="300px"
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5 text-gray-500" />
                    <span>Property Type</span>
                  </div>
                  <span className="font-medium">{property.type}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-gray-500" />
                    <span>Year Built</span>
                  </div>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-gray-500" />
                    <span>Price per sqft</span>
                  </div>
                  <span className="font-medium">${Math.round(property.price / property.squareFeet).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <Button className="w-full">Contact Agent</Button>
                <Button variant="outline" className="w-full">Schedule Tour</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}