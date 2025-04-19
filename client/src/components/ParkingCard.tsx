import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ParkingSpot } from "@shared/schema";

interface ParkingCardProps {
  spot: ParkingSpot;
  onBookClick: (spot: ParkingSpot) => void;
}

export default function ParkingCard({ spot, onBookClick }: ParkingCardProps) {
  return (
    <Card 
      id={`parking-${spot.id}`}
      className="overflow-hidden transition-all duration-200 hover:translate-y-[-4px] hover:shadow-md"
    >
      <div className="relative h-40">
        <img 
          src={spot.imageUrl} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {spot.distance}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{spot.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{spot.address}</p>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="text-secondary-600 dark:text-secondary-400 font-bold">{spot.price}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{spot.available} available</span>
          </div>
          <Button 
            size="sm"
            onClick={() => onBookClick(spot)}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
