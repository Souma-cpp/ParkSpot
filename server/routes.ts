import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Get all parking spots
  app.get("/api/parking-spots", async (req, res) => {
    try {
      const spots = await storage.getAllParkingSpots();
      res.json(spots);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve parking spots" });
    }
  });

  // Get a specific parking spot
  app.get("/api/parking-spots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const spot = await storage.getParkingSpot(id);
      
      if (!spot) {
        return res.status(404).json({ message: "Parking spot not found" });
      }
      
      res.json(spot);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve parking spot" });
    }
  });

  // Create a booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking({
        ...validatedData,
        createdAt: new Date().toISOString()
      });
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid booking data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
