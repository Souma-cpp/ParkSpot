import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const parkingSpots = pgTable("parking_spots", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  address: text("address").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  available: integer("available").notNull(),
  total: integer("total").notNull(),
  type: text("type").notNull(),
  image: text("image").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  spotId: integer("spot_id").references(() => parkingSpots.id),
  name: text("name").notNull(),
  license: text("license").notNull(),
  duration: text("duration").notNull(),
  confirmationCode: text("confirmation_code").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertParkingSpotSchema = createInsertSchema(parkingSpots).pick({
  name: true,
  price: true,
  address: true,
  latitude: true,
  longitude: true,
  available: true,
  total: true,
  type: true,
  image: true,
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  spotId: true,
  name: true,
  license: true,
  duration: true,
  confirmationCode: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertParkingSpot = z.infer<typeof insertParkingSpotSchema>;
export type ParkingSpot = typeof parkingSpots.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
