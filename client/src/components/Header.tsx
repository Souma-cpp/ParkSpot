import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <i className="fas fa-parking text-primary text-2xl mr-2"></i>
          <h1 className="text-xl font-bold">ParkSpot</h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {theme === "light" ? (
            <i className="fas fa-sun text-yellow-500"></i>
          ) : (
            <i className="fas fa-moon text-blue-300"></i>
          )}
        </button>
      </div>
    </header>
  );
}
