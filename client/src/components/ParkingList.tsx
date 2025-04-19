import { ParkingSpot } from "@/types";
import { useEffect, useState } from "react";

interface ParkingListProps {
  parkingSpots: ParkingSpot[];
  onBookParking: (spotId: number) => void;
}

export default function ParkingList({ parkingSpots, onBookParking }: ParkingListProps) {
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("Nearest");

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getSortedSpots = () => {
    const spots = [...parkingSpots];
    
    switch (filterOption) {
      case "Cheapest":
        return spots.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceA - priceB;
        });
      case "Availability":
        return spots.sort((a, b) => b.available - a.available);
      case "Nearest":
      default:
        return spots.sort((a, b) => {
          const distanceA = parseFloat(a.distance.split(' ')[0]);
          const distanceB = parseFloat(b.distance.split(' ')[0]);
          return distanceA - distanceB;
        });
    }
  };

  const getAvailabilityClass = (available: number, total: number) => {
    const availabilityPercentage = (available / total) * 100;
    
    if (availabilityPercentage > 30) {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    } else if (availabilityPercentage > 10) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    } else {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Available Parking Spots</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
          <select 
            className="text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 px-2 py-1"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option>Nearest</option>
            <option>Cheapest</option>
            <option>Availability</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeletons
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
          ))
        ) : (
          // Actual parking spots
          getSortedSpots().map((spot) => (
            <div 
              key={spot.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={spot.image} alt={spot.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{spot.name}</h3>
                  <span className="text-primary font-medium">{spot.price}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{spot.address}</p>
                <div className="flex items-center mt-2 mb-3">
                  <i className="fas fa-map-marker-alt text-gray-500 mr-1"></i>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{spot.distance}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{spot.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${getAvailabilityClass(spot.available, spot.total)} text-xs px-2 py-1 rounded-full`}>
                    {spot.available}/{spot.total} spots
                  </span>
                  <button 
                    onClick={() => onBookParking(spot.id)}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
