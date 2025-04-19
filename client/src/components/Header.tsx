import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ParkingMeter } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <ParkingMeter className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
        <h1 className="text-xl font-bold text-primary-800 dark:text-primary-200">ParkFinder</h1>
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleTheme}
        className="rounded-full p-2 bg-gray-100 dark:bg-gray-700"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}
