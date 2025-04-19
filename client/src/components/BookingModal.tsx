import { ParkingSpot } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface BookingModalProps {
  isOpen: boolean;
  selectedSpot: ParkingSpot | null;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
}

// Define validation schema
const bookingFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  license: z.string().min(2, "License plate is required"),
  duration: z.string(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function BookingModal({ isOpen, selectedSpot, onClose, onSubmit }: BookingModalProps) {
  const [selectedDuration, setSelectedDuration] = useState("2h");
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      license: "",
      duration: "2h",
    },
  });

  const handleSubmit = (data: BookingFormData) => {
    onSubmit({
      ...data,
      duration: selectedDuration,
    });
  };

  const selectDuration = (duration: string) => {
    setSelectedDuration(duration);
    form.setValue("duration", duration);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`relative bg-white dark:bg-gray-800 w-full max-w-md mx-4 rounded-lg shadow-xl z-50 transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-4'}`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{selectedSpot ? `Book - ${selectedSpot.name}` : 'Book Parking'}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-gray-700 dark:text-gray-300 mb-2">License Plate</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={() => (
                  <FormItem>
                    <FormLabel className="block text-gray-700 dark:text-gray-300 mb-2">Duration</FormLabel>
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        onClick={() => selectDuration("1h")} 
                        className={`flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-md ${selectedDuration === "1h" ? "bg-primary text-white" : "bg-white dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                      >
                        1h
                      </button>
                      <button 
                        type="button"
                        onClick={() => selectDuration("2h")} 
                        className={`flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-md ${selectedDuration === "2h" ? "bg-primary text-white" : "bg-white dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                      >
                        2h
                      </button>
                      <button 
                        type="button"
                        onClick={() => selectDuration("3h")} 
                        className={`flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-md ${selectedDuration === "3h" ? "bg-primary text-white" : "bg-white dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                      >
                        3h
                      </button>
                      <button 
                        type="button"
                        onClick={() => selectDuration("4h+")} 
                        className={`flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-md ${selectedDuration === "4h+" ? "bg-primary text-white" : "bg-white dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                      >
                        4h+
                      </button>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Confirm Booking
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
