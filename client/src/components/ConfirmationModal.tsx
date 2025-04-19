import { ParkingSpot } from "@/types";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmationDetails: {
    spot: ParkingSpot | null;
    date: string;
    code: string;
  };
}

export default function ConfirmationModal({ isOpen, onClose, confirmationDetails }: ConfirmationModalProps) {
  if (!isOpen) return null;
  
  const { spot, date, code } = confirmationDetails;

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`relative bg-white dark:bg-gray-800 w-full max-w-md mx-4 rounded-lg shadow-xl z-50 transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-4'}`}>
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <i className="fas fa-check text-2xl text-green-600 dark:text-green-300"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Your parking spot has been reserved. Details have been sent to your email.</p>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Location:</span>
              <span className="font-medium">{spot?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Date:</span>
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Confirmation code:</span>
              <span className="font-medium">{code}</span>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
