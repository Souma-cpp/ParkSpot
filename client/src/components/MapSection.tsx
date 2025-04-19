import { useEffect, useRef, useState } from "react";
import { ParkingSpot } from "@/types";
import L from "leaflet";

interface MapSectionProps {
  parkingSpots: ParkingSpot[];
  onBookParking: (spotId: number) => void;
}

export default function MapSection({ parkingSpots, onBookParking }: MapSectionProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    // Import Leaflet dynamically
    import("leaflet").then((L) => {
      if (mapContainerRef.current && !isMapInitialized) {
        // Initialize the map
        const map = L.map(mapContainerRef.current).setView([40.7128, -74.0060], 13); // New York City coordinates
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);
        
        // Store the map instance
        mapRef.current = map;
        setIsMapInitialized(true);
      }
    });
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsMapInitialized(false);
      }
    };
  }, []);
  
  // Add markers when map is initialized and spots are available
  useEffect(() => {
    if (isMapInitialized && mapRef.current && parkingSpots.length > 0) {
      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });
      
      // Add markers for each parking spot
      parkingSpots.forEach(spot => {
        // Create custom marker icon
        const customIcon = L.divIcon({
          html: 'P',
          className: 'custom-marker',
          iconSize: [24, 24]
        });
        
        // Create marker
        const marker = L.marker(spot.location, { icon: customIcon }).addTo(mapRef.current!);
        
        // Add popup
        marker.bindPopup(`
          <div class="text-center">
            <strong>${spot.name}</strong><br>
            ${spot.price}<br>
            <span class="text-sm">${spot.available} spots available</span><br>
            <button id="book-marker-${spot.id}" class="bg-primary text-white px-3 py-1 mt-2 rounded text-sm">
              Book Now
            </button>
          </div>
        `);
        
        // Add event listener to the popup after it's opened
        marker.on('popupopen', () => {
          const bookButton = document.getElementById(`book-marker-${spot.id}`);
          if (bookButton) {
            bookButton.addEventListener('click', () => {
              onBookParking(spot.id);
            });
          }
        });
      });
    }
  }, [isMapInitialized, parkingSpots, onBookParking]);

  const getCurrentLocation = () => {
    if (mapRef.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current?.setView([latitude, longitude], 15);
      });
    }
  };

  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  };

  return (
    <div className="map-container bg-gray-200 dark:bg-gray-700 relative">
      <div ref={mapContainerRef} className="h-full w-full"></div>
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10">
        <button 
          onClick={getCurrentLocation}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <i className="fas fa-location-arrow text-primary"></i>
        </button>
        <button 
          onClick={zoomIn}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mt-2"
        >
          <i className="fas fa-plus text-gray-700 dark:text-gray-300"></i>
        </button>
        <button 
          onClick={zoomOut}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mt-2"
        >
          <i className="fas fa-minus text-gray-700 dark:text-gray-300"></i>
        </button>
      </div>
    </div>
  );
}
