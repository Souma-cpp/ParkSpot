import { ParkingSpot } from "../types";

export const parkingSpots: ParkingSpot[] = [
  {
    id: 1,
    name: "Downtown Garage",
    location: [40.712, -74.007],
    price: "$4.50/hour",
    distance: "0.3 miles away",
    available: 12,
    total: 120,
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Garage",
    address: "123 Broadway, New York, NY"
  },
  {
    id: 2,
    name: "Central Park Parking",
    location: [40.717, -74.005],
    price: "$3.75/hour",
    distance: "0.5 miles away",
    available: 8,
    total: 75,
    image: "https://images.unsplash.com/photo-1590674067030-9c789b8a513f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "45 Park Ave, New York, NY"
  },
  {
    id: 3,
    name: "Financial District Parking",
    location: [40.709, -74.010],
    price: "$5.25/hour",
    distance: "0.7 miles away",
    available: 5,
    total: 50,
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Garage",
    address: "78 Wall St, New York, NY"
  },
  {
    id: 4,
    name: "Midtown Covered Parking",
    location: [40.714, -73.998],
    price: "$6.00/hour",
    distance: "0.9 miles away",
    available: 15,
    total: 200,
    image: "https://images.unsplash.com/photo-1601225998129-a85800dae2fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Covered",
    address: "350 5th Ave, New York, NY"
  },
  {
    id: 5,
    name: "Riverside Parking",
    location: [40.720, -74.012],
    price: "$3.50/hour",
    distance: "1.1 miles away",
    available: 3,
    total: 45,
    image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Street",
    address: "90 Riverside Dr, New York, NY"
  },
  {
    id: 6,
    name: "East Village Lot",
    location: [40.723, -73.990],
    price: "$4.00/hour",
    distance: "1.3 miles away",
    available: 7,
    total: 60,
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "120 E 7th St, New York, NY"
  }
];
