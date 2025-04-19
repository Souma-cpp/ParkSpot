import { useState } from "react";
import Header from "@/components/Header";
import ParkingMap from "@/components/ParkingMap";
import SearchFilters from "@/components/SearchFilters";
import ParkingCard from "@/components/ParkingCard";
import BookingModal from "@/components/BookingModal";
import { useToast } from "@/hooks/use-toast";
import { parkingData } from "@/data/parkingData";
import { ParkingSpot } from "@shared/schema";

export default function Home() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredSpots = parkingData.filter(spot => 
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setIsModalOpen(true);
  };

  const handleBookingComplete = (name: string) => {
    setIsModalOpen(false);
    toast({
      title: "Booking Confirmed!",
      description: `Thanks, ${name}! Your parking spot has been reserved.`,
    });
  };

  const handleMapSpotSelect = (spotId: number) => {
    const spot = parkingData.find(s => s.id === spotId);
    if (spot) {
      const element = document.getElementById(`parking-${spotId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('ring-2', 'ring-primary-500');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-primary-500');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 pb-12">
        <div className="my-4 rounded-xl overflow-hidden shadow-md h-[40vh] min-h-[300px] md:h-[50vh] relative">
          <ParkingMap 
            parkingSpots={parkingData} 
            onSpotSelect={handleMapSpotSelect}
          />
        </div>
        
        <SearchFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map(spot => (
            <ParkingCard 
              key={spot.id}
              spot={spot}
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      </main>
      
      {selectedSpot && (
        <BookingModal
          isOpen={isModalOpen}
          spot={selectedSpot}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
}
