import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { ParkingSpot } from "@/types";
import L from "leaflet";

interface SearchLocation {
  name: string;
  coordinates: [number, number];
}

interface MapSectionProps {
  parkingSpots: ParkingSpot[];
  onBookParking: (spotId: number) => void;
  searchedLocation?: SearchLocation | null;
}

interface MapSectionRef {
  centerMapOn: (coords: [number, number]) => void;
}

const MapSection = forwardRef<MapSectionRef, MapSectionProps>(({ 
  parkingSpots, 
  onBookParking,
  searchedLocation
}, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const searchMarkerRef = useRef<L.Marker | null>(null);

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    centerMapOn: (coords: [number, number]) => {
      if (mapRef.current) {
        mapRef.current.setView(coords, 15);
      }
    }
  }));

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
  
  // Handle searched location changes
  useEffect(() => {
    if (isMapInitialized && mapRef.current && searchedLocation) {
      // Determine if this is a city or a specific location
      const isCityLevel = ['mumbai', 'delhi', 'kolkata', 'bangalore', 'new york'].some(
        city => searchedLocation.name.toLowerCase().includes(city)
      );
      
      // Set appropriate zoom level - cities get a wider view
      const zoomLevel = isCityLevel ? 12 : 15;
      
      // Center map on the searched location
      mapRef.current.setView(searchedLocation.coordinates, zoomLevel);
      
      // Remove previous search marker if exists
      if (searchMarkerRef.current) {
        mapRef.current.removeLayer(searchMarkerRef.current);
      }
      
      // Add a marker for the searched location
      const searchIcon = L.divIcon({
        html: '<i class="fas fa-map-marker-alt"></i>',
        className: 'search-marker',
        iconSize: [30, 30]
      });
      
      // Create and store the search marker
      searchMarkerRef.current = L.marker(searchedLocation.coordinates, { 
        icon: searchIcon,
        zIndexOffset: 1000 // Ensure it's on top of other markers
      }).addTo(mapRef.current);
      
      // Format the location name with proper capitalization
      const formattedName = searchedLocation.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
      // Add popup for the search location
      searchMarkerRef.current.bindPopup(`
        <div class="text-center">
          <strong>${formattedName}</strong><br>
          <span class="text-sm">Searched location</span>
        </div>
      `).openPopup();
    }
  }, [isMapInitialized, searchedLocation]);
  
  // Add markers when map is initialized and spots are available
  useEffect(() => {
    if (isMapInitialized && mapRef.current && parkingSpots.length > 0) {
      // Clear existing parking markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== searchMarkerRef.current) {
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
      {searchedLocation && (
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-10 max-w-[60%]">
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-primary mr-2"></i>
            <div>
              <p className="font-semibold">
                {searchedLocation.name
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {parkingSpots.length} parking spots found nearby
              </p>
            </div>
          </div>
        </div>
      )}
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
});

MapSection.displayName = 'MapSection';

export default MapSection;
