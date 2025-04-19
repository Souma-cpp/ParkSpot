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
}

export interface BookingFormData {
  name: string;
  license: string;
  duration: string;
}
