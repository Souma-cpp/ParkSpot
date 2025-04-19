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
  // US Cities
  "new york": [40.7128, -74.0060],
  "times square": [40.7580, -73.9855],
  "central park": [40.7812, -73.9665],
  "brooklyn": [40.6782, -73.9442],
  "soho": [40.7248, -74.0018],
  "manhattan": [40.7831, -73.9712],
  "queens": [40.7282, -73.7949],
  "bronx": [40.8448, -73.8648],
  "harlem": [40.8116, -73.9465],
  "wall street": [40.7064, -74.0090],
  
  // Indian Cities
  "mumbai": [19.0760, 72.8777],
  "delhi": [28.7041, 77.1025],
  "bangalore": [12.9716, 77.5946],
  "hyderabad": [17.3850, 78.4867],
  "ahmedabad": [23.0225, 72.5714],
  "chennai": [13.0827, 80.2707],
  "kolkata": [22.5726, 88.3639],
  "surat": [21.1702, 72.8311],
  "pune": [18.5204, 73.8567],
  "jaipur": [26.9124, 75.7873],
  
  // Popular areas in Mumbai
  "bandra": [19.0596, 72.8295],
  "andheri": [19.1136, 72.8697],
  "worli": [19.0096, 72.8175],
  "nariman point": [18.9256, 72.8242],
  
  // Popular areas in Delhi
  "connaught place": [28.6289, 77.2099],
  "india gate": [28.6129, 77.2295],
  "hauz khas": [28.5531, 77.2021],
  
  // Popular areas in Kolkata
  "park street": [22.5513, 88.3494],
  "salt lake": [22.5816, 88.4127],
  "new town": [22.6033, 88.4619]
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
      
      // Extract the city name for filtering the parking spots
      // We assume the query might be a neighborhood, so we need to determine the main city
      let cityName = name;
      
      // Handle neighborhoods by mapping them to their parent city
      if (name.includes("park street") || name.includes("salt lake") || name.includes("new town")) {
        cityName = "kolkata";
      } else if (name.includes("bandra") || name.includes("andheri") || name.includes("worli") || name.includes("nariman point")) {
        cityName = "mumbai";
      } else if (name.includes("connaught place") || name.includes("india gate") || name.includes("hauz khas")) {
        cityName = "delhi";
      } else if (name.includes("central park") || name.includes("times square") || name.includes("broadway")) {
        cityName = "new york";
      }
      
      // Find all parking spots in the searched city
      const citySpots = parkingSpots.filter(spot => 
        spot.city && spot.city.toLowerCase() === cityName
      );
      
      if (citySpots.length > 0) {
        // Found parking spots for the given city
        // Update distances to make them more realistic for the search
        const spotsWithUpdatedDistance = citySpots.map(spot => {
          // Generate a random distance between 0.1 and 1.5 km/miles
          // Use km for Indian cities, miles for US cities
          const randomDistance = (Math.random() * 1.4 + 0.1).toFixed(1);
          const unit = cityName.includes("new york") ? "miles away" : "km away";
          return {
            ...spot,
            distance: `${randomDistance} ${unit}`
          };
        });
        
        setFilteredParkingSpots(spotsWithUpdatedDistance);
      } else {
        // No spots found for this city, just show random spots
        const randomSpots = parkingSpots
          .slice(0, 4)
          .map(spot => {
            const randomDistance = (Math.random() * 1.4 + 0.1).toFixed(1);
            return {
              ...spot,
              distance: `${randomDistance} km away`
            };
          });
        
        setFilteredParkingSpots(randomSpots);
      }
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
