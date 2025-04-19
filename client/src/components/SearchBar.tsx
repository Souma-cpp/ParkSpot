import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Kolkata", 
    "Mumbai",
    "Delhi",
    "Bangalore"
  ]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(searchQuery)) {
        const newRecentSearches = [searchQuery, ...recentSearches.slice(0, 4)];
        setRecentSearches(newRecentSearches);
      }
    }
  };
  
  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sticky top-14 z-20">
      <div className="container mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            className="w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search for parking locations (try 'Kolkata' or 'Mumbai')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-md"
          >
            Search
          </button>
        </form>
        
        {recentSearches.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 self-center">Recent searches:</span>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(search)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
