import { useEffect, useRef } from "react";
import L from "leaflet";
import { ParkingSpot } from "@shared/schema";
import { useTheme } from "@/lib/theme-context";

interface ParkingMapProps {
  parkingSpots: ParkingSpot[];
  onSpotSelect: (spotId: number) => void;
}

export default function ParkingMap({ parkingSpots, onSpotSelect }: ParkingMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Initialize the map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map("parkingMap").setView([40.7128, -74.0060], 14);
      
      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      
      // Create parking icon
      const parkingIcon = L.icon({
        iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });
      
      // Add markers for each parking spot
      parkingSpots.forEach(spot => {
        const marker = L.marker([spot.latitude, spot.longitude], { icon: parkingIcon })
          .addTo(mapRef.current!);
        
        // Create popup with spot info
        const popupContent = `
          <div class="font-medium">${spot.name}</div>
          <div class="text-sm">${spot.address}</div>
          <div class="text-sm font-bold">${spot.price}</div>
          <div class="text-sm">${spot.available} spots available</div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Handle marker click
        marker.on("click", () => {
          onSpotSelect(spot.id);
        });
      });
    }
    
    // Adjust map appearance based on theme
    if (mapRef.current) {
      const container = document.querySelector('.leaflet-popup-content-wrapper');
      if (container) {
        if (theme === 'dark') {
          container.setAttribute('style', 'background: #1f2937; color: #f9fafb;');
        } else {
          container.setAttribute('style', 'background: white; color: #111827;');
        }
      }
    }
    
    // Handle cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [parkingSpots, onSpotSelect, theme]);
  
  return <div id="parkingMap" className="h-full w-full"></div>;
}
