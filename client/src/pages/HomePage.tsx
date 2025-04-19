import { useState, useRef } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MapSection from "@/components/MapSection";
import ParkingList from "@/components/ParkingList";
import BookingModal from "@/components/BookingModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import Footer from "@/components/Footer";
import { ParkingSpot } from "@/types";
import { parkingSpots } from "@/data/parkingSpots";

// Type for the booking form data
interface BookingFormData {
  name: string;
  license: string;
  duration: string;
}

// Sample locations to simulate geocoding results
const locationCoordinates: Record<string, [number, number]> = {
  "new york": [40.7128, -74.0060],
  "times square": [40.7580, -73.9855],
  "central park": [40.7812, -73.9665],
  "brooklyn": [40.6782, -73.9442],
  "soho": [40.7248, -74.0018],
  "manhattan": [40.7831, -73.9712],
  "queens": [40.7282, -73.7949],
  "bronx": [40.8448, -73.8648],
  "harlem": [40.8116, -73.9465],
  "wall street": [40.7064, -74.0090]
};

// Type for the location search
interface SearchLocation {
  name: string;
  coordinates: [number, number];
}

export default function HomePage() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState({
    spot: null as ParkingSpot | null,
    date: "",
    code: "",
  });
  
  const [searchedLocation, setSearchedLocation] = useState<SearchLocation | null>(null);
  const [filteredParkingSpots, setFilteredParkingSpots] = useState<ParkingSpot[]>(parkingSpots);
  const mapSectionRef = useRef<{ centerMapOn: (coords: [number, number]) => void } | null>(null);

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Find matching location from our mock data
    const foundLocation = Object.entries(locationCoordinates).find(([name]) => 
      name.includes(normalizedQuery) || normalizedQuery.includes(name)
    );
    
    if (foundLocation) {
      const [name, coordinates] = foundLocation;
      setSearchedLocation({ name, coordinates });
      
      // Center map on the found location
      if (mapSectionRef.current) {
        mapSectionRef.current.centerMapOn(coordinates);
      }
      
      // Filter parking spots by proximity to the location
      // In a real app, you would use actual distance calculation
      // Here we're just simulating by creating a random subset of spots
      const randomOffset = Math.floor(Math.random() * 3) + 1; // 1-3 spots shown
      const numberOfSpots = Math.min(parkingSpots.length, randomOffset + 3);
      
      // Create a new array with modified distances from the searched location
      const spotsWithUpdatedDistance = parkingSpots.slice(0, numberOfSpots).map(spot => {
        // Generate a random distance between 0.1 and 1.5 miles
        const randomDistance = (Math.random() * 1.4 + 0.1).toFixed(1);
        return {
          ...spot,
          distance: `${randomDistance} miles away`
        };
      });
      
      setFilteredParkingSpots(spotsWithUpdatedDistance);
    } else {
      // If no location found, reset and show all parking spots
      setSearchedLocation(null);
      setFilteredParkingSpots(parkingSpots);
    }
  };

  const handleBookParking = (spotId: number) => {
    const spot = filteredParkingSpots.find(s => s.id === spotId) || null;
    setSelectedSpot(spot);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    // Close booking modal
    setIsBookingModalOpen(false);
    
    // Get current date and time for the confirmation
    const now = new Date();
    const hours = now.getHours();
    const formattedDate = `Today, ${hours}:00 ${hours >= 12 ? 'PM' : 'AM'} - ${hours + parseInt(data.duration) >= 12 ? (hours + parseInt(data.duration)) % 12 || 12 : hours + parseInt(data.duration)}:00 ${hours + parseInt(data.duration) >= 12 ? 'PM' : 'AM'}`;
    
    // Generate random confirmation code
    const confirmCode = 'PK' + Math.floor(10000 + Math.random() * 90000);
    
    // Set confirmation details
    setConfirmationDetails({
      spot: selectedSpot,
      date: formattedDate,
      code: confirmCode,
    });
    
    // Show confirmation modal
    setIsConfirmationModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedSpot(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SearchBar onSearch={handleSearch} />
      
      <main className="flex-grow">
        <MapSection 
          ref={mapSectionRef}
          parkingSpots={filteredParkingSpots} 
          onBookParking={handleBookParking}
          searchedLocation={searchedLocation}
        />
        <ParkingList 
          parkingSpots={filteredParkingSpots} 
          onBookParking={handleBookParking} 
        />
        
        <BookingModal 
          isOpen={isBookingModalOpen}
          selectedSpot={selectedSpot}
          onClose={closeBookingModal}
          onSubmit={handleBookingSubmit}
        />
        
        <ConfirmationModal 
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          confirmationDetails={confirmationDetails}
        />
      </main>
      
      <Footer />
    </div>
  );
}
