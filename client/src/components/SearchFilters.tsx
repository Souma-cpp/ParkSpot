import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchFilters({ searchQuery, onSearchChange }: SearchFiltersProps) {
  return (
    <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h2 className="text-xl font-semibold">Nearby Parking Spots</h2>
      <div className="flex items-center w-full sm:w-auto">
        <div className="relative flex-grow sm:flex-grow-0">
          <Input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">
            <Search className="h-4 w-4" />
          </span>
        </div>
        <Button variant="outline" size="icon" className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
    </div>
  );
}
