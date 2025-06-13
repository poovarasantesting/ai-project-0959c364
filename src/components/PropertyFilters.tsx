import { useState } from "react";
import { Search, Home, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyFiltersProps {
  onFilterChange: (filters: {
    search: string;
    priceRange: [number, number];
    propertyTypes: string[];
    location: string;
  }) => void;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const propertyTypeOptions = [
    "House",
    "Apartment",
    "Condo",
    "Townhouse",
    "Land",
    "Commercial",
  ];

  const locationOptions = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handlePropertyTypeChange = (type: string) => {
    setPropertyTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc === location ? "" : loc);
  };

  const applyFilters = () => {
    onFilterChange({
      search,
      priceRange,
      propertyTypes,
      location,
    });
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow">
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by property name or address"
            className="pl-9"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>{propertyTypes.length ? `${propertyTypes.length} selected` : "Property Type"}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {propertyTypeOptions.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={propertyTypes.includes(type)}
                onCheckedChange={() => handlePropertyTypeChange(type)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location || "Location"}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {locationOptions.map((loc) => (
              <DropdownMenuCheckboxItem
                key={loc}
                checked={location === loc}
                onCheckedChange={() => handleLocationChange(loc)}
              >
                {loc}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">Price Range</span>
          <span className="text-sm text-gray-500">
            ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          defaultValue={[0, 1000000]}
          max={2000000}
          step={10000}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}