import { ParkingSpot } from "../types";

// New York parking spots
const newYorkSpots: ParkingSpot[] = [
  {
    id: 101,
    name: "Downtown Garage",
    location: [40.712, -74.007],
    price: "$4.50/hour",
    distance: "0.3 miles away",
    available: 12,
    total: 120,
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Garage",
    address: "123 Broadway, New York, NY",
    city: "new york"
  },
  {
    id: 102,
    name: "Central Park Parking",
    location: [40.781, -73.966],
    price: "$3.75/hour",
    distance: "0.5 miles away",
    available: 8,
    total: 75,
    image: "https://images.unsplash.com/photo-1590674067030-9c789b8a513f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "45 Central Park West, New York, NY",
    city: "new york"
  },
  {
    id: 103,
    name: "Financial District Parking",
    location: [40.709, -74.010],
    price: "$5.25/hour",
    distance: "0.7 miles away",
    available: 5,
    total: 50,
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Garage",
    address: "78 Wall St, New York, NY",
    city: "new york"
  }
];

// Mumbai parking spots
const mumbaiSpots: ParkingSpot[] = [
  {
    id: 201,
    name: "Nariman Point Parking Complex",
    location: [18.926, 72.824],
    price: "₹80/hour",
    distance: "0.2 km away",
    available: 45,
    total: 200,
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Multi-level",
    address: "Nariman Point, Mumbai 400021",
    city: "mumbai"
  },
  {
    id: 202,
    name: "Bandra Kurla Complex Parking",
    location: [19.060, 72.830],
    price: "₹100/hour",
    distance: "0.4 km away",
    available: 120,
    total: 350,
    image: "https://images.unsplash.com/photo-1590674067030-9c789b8a513f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Covered",
    address: "BKC, Bandra East, Mumbai 400051",
    city: "mumbai"
  },
  {
    id: 203,
    name: "Worli Sea Face Parking",
    location: [19.009, 72.818],
    price: "₹60/hour",
    distance: "0.3 km away",
    available: 25,
    total: 80,
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "Worli Sea Face, Mumbai 400018",
    city: "mumbai"
  },
  {
    id: 204,
    name: "Andheri Metro Parking",
    location: [19.114, 72.870],
    price: "₹50/hour",
    distance: "0.1 km away",
    available: 60,
    total: 150,
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Metro Parking",
    address: "Andheri Metro Station, Mumbai 400053",
    city: "mumbai"
  }
];

// Delhi parking spots
const delhiSpots: ParkingSpot[] = [
  {
    id: 301,
    name: "Connaught Place Parking",
    location: [28.629, 77.210],
    price: "₹60/hour",
    distance: "0.3 km away",
    available: 35,
    total: 150,
    image: "https://images.unsplash.com/photo-1601225998129-a85800dae2fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Underground",
    address: "Connaught Place, New Delhi 110001",
    city: "delhi"
  },
  {
    id: 302,
    name: "India Gate Parking Zone",
    location: [28.613, 77.230],
    price: "₹40/hour",
    distance: "0.5 km away",
    available: 90,
    total: 200,
    image: "https://images.unsplash.com/photo-1590674067030-9c789b8a513f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "India Gate, New Delhi 110001",
    city: "delhi"
  },
  {
    id: 303,
    name: "Select Citywalk Mall Parking",
    location: [28.528, 77.219],
    price: "₹70/hour",
    distance: "0.1 km away",
    available: 150,
    total: 500,
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Multi-level",
    address: "Saket District Centre, New Delhi 110017",
    city: "delhi"
  }
];

// Kolkata parking spots
const kolkataSpots: ParkingSpot[] = [
  {
    id: 401,
    name: "Park Street Metro Parking",
    location: [22.551, 88.349],
    price: "₹40/hour",
    distance: "0.2 km away",
    available: 32,
    total: 80,
    image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Underground",
    address: "Park Street Metro, Kolkata 700016",
    city: "kolkata"
  },
  {
    id: 402,
    name: "New Market Parking Complex",
    location: [22.562, 88.351],
    price: "₹30/hour",
    distance: "0.4 km away",
    available: 45,
    total: 120,
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Multi-level",
    address: "New Market Area, Kolkata 700087",
    city: "kolkata"
  },
  {
    id: 403,
    name: "Salt Lake Stadium Parking",
    location: [22.582, 88.413],
    price: "₹25/hour",
    distance: "0.3 km away",
    available: 200,
    total: 500,
    image: "https://images.unsplash.com/photo-1590674067030-9c789b8a513f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "Salt Lake Stadium, Kolkata 700098",
    city: "kolkata"
  },
  {
    id: 404,
    name: "Science City Parking",
    location: [22.538, 88.397],
    price: "₹20/hour",
    distance: "0.1 km away",
    available: 65,
    total: 150,
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Open Lot",
    address: "Science City, Kolkata 700046",
    city: "kolkata"
  }
];

// Bangalore parking spots
const bangaloreSpots: ParkingSpot[] = [
  {
    id: 501,
    name: "MG Road Smart Parking",
    location: [12.975, 77.608],
    price: "₹70/hour",
    distance: "0.3 km away",
    available: 40,
    total: 100,
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Smart Parking",
    address: "MG Road, Bangalore 560001",
    city: "bangalore"
  },
  {
    id: 502,
    name: "Koramangala Forum Mall Parking",
    location: [12.934, 77.613],
    price: "₹80/hour",
    distance: "0.1 km away",
    available: 120,
    total: 300,
    image: "https://images.unsplash.com/photo-1590674067030-9c789b8a513f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Multi-level",
    address: "Koramangala, Bangalore 560095",
    city: "bangalore"
  },
  {
    id: 503,
    name: "Indiranagar Metro Parking",
    location: [12.978, 77.638],
    price: "₹50/hour",
    distance: "0.2 km away",
    available: 55,
    total: 120,
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "Metro Parking",
    address: "Indiranagar Metro Station, Bangalore 560038",
    city: "bangalore"
  }
];

// Combine all cities' parking spots
export const parkingSpots: ParkingSpot[] = [
  ...newYorkSpots,
  ...mumbaiSpots,
  ...delhiSpots,
  ...kolkataSpots,
  ...bangaloreSpots
];
