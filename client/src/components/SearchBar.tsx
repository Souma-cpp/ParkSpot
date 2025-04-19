import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search action
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sticky top-14 z-20">
      <div className="container mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            className="w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search for parking locations"
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
      </div>
    </div>
  );
}
