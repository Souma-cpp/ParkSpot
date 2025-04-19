import { useState } from "react";
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

export default function HomePage() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState({
    spot: null as ParkingSpot | null,
    date: "",
    code: "",
  });

  const handleBookParking = (spotId: number) => {
    const spot = parkingSpots.find(s => s.id === spotId) || null;
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
      <SearchBar />
      
      <main className="flex-grow">
        <MapSection 
          parkingSpots={parkingSpots} 
          onBookParking={handleBookParking} 
        />
        <ParkingList 
          parkingSpots={parkingSpots} 
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
