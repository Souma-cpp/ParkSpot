import { ParkingSpot } from "@shared/schema";

export const parkingData: ParkingSpot[] = [
  {
    id: 1,
    name: "Downtown Parking Garage",
    address: "123 Main St",
    price: "$8.50/hour",
    distance: "0.3 miles",
    available: 15,
    imageUrl: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    id: 2,
    name: "Central Plaza Parking",
    address: "456 Park Ave",
    price: "$10.00/hour",
    distance: "0.5 miles",
    available: 8,
    imageUrl: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
    latitude: 40.7148,
    longitude: -74.0055
  },
  {
    id: 3,
    name: "Riverside Parking Lot",
    address: "789 River Rd",
    price: "$7.00/hour",
    distance: "0.8 miles",
    available: 22,
    imageUrl: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
    latitude: 40.7138,
    longitude: -74.0090
  },
  {
    id: 4,
    name: "City Center Garage",
    address: "101 Center Blvd",
    price: "$12.00/hour",
    distance: "0.4 miles",
    available: 5,
    imageUrl: "https://images.unsplash.com/photo-1590674899484-d5a63c5f7246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
    latitude: 40.7158, 
    longitude: -74.0040
  },
  {
    id: 5,
    name: "Metro Station Parking",
    address: "202 Transit Way",
    price: "$6.00/hour",
    distance: "0.7 miles",
    available: 30,
    imageUrl: "https://images.unsplash.com/photo-1587955052135-30891a970e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
    latitude: 40.7110,
    longitude: -74.0080
  },
  {
    id: 6,
    name: "East Side Lot",
    address: "303 East St",
    price: "$9.00/hour",
    distance: "1.0 miles",
    available: 12,
    imageUrl: "https://images.unsplash.com/photo-1470092306007-055b6797ca72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
    latitude: 40.7118,
    longitude: -74.0030
  }
];
