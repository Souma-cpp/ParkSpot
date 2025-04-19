import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParkingSpot } from "@shared/schema";
import { Check, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BookingModalProps {
  isOpen: boolean;
  spot: ParkingSpot;
  onClose: () => void;
  onComplete: (name: string) => void;
}

const bookingFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  vehicle: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingModal({ isOpen, spot, onClose, onComplete }: BookingModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      vehicle: "",
    },
  });
  
  function onSubmit(data: BookingFormValues) {
    setIsConfirmed(true);
  }
  
  function handleDone() {
    onComplete(form.getValues().name);
    setIsConfirmed(false);
    form.reset();
  }
  
  function handleClose() {
    onClose();
    setIsConfirmed(false);
    form.reset();
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isConfirmed ? "Booking Confirmed!" : `Book Parking at ${spot.name}`}</DialogTitle>
          {!isConfirmed && (
            <DialogDescription>
              Complete the form below to reserve your parking spot.
            </DialogDescription>
          )}
        </DialogHeader>
        
        {!isConfirmed ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center mb-4">
                <img 
                  src={spot.imageUrl} 
                  alt={spot.name} 
                  className="w-16 h-16 rounded-md object-cover mr-4" 
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{spot.name}</p>
                  <p className="text-secondary-600 dark:text-secondary-400 font-bold">{spot.price}</p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Make and model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="gap-2 sm:gap-0 mt-4">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Confirm Booking
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Booking Confirmed!</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your parking spot has been reserved.</p>
            <p className="font-medium">
              Thanks, {form.getValues().name}! We'll email you the parking details.
            </p>
            <Button 
              className="mt-6 w-full" 
              onClick={handleDone}
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
