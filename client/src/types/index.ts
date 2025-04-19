export interface ParkingSpot {
  id: number;
  name: string;
  location: [number, number]; // [latitude, longitude]
  price: string;
  distance: string;
  available: number;
  total: number;
  image: string;
  type: string;
  address: string;
  city?: string; // The city this parking spot belongs to
}

export interface BookingFormData {
  name: string;
  license: string;
  duration: string;
}
