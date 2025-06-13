import { Link } from "react-router-dom";
import { Home, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">RealEstate</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Listings</Button>
          </Link>
          <Link to="/map">
            <Button variant="outline" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Map View
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}