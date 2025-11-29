import { MapPin, Search as SearchIcon, Navigation } from "lucide-react";

const SearchBar = ({ location, setLocation, region, setRegion, search, setSearch }) => {
  const locations = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune"];
  const regions = ["North", "South", "East", "West"];

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-center">

      {/* Region Dropdown (visible only after city is selected) */}
      {location && (
        <div className="relative w-full md:w-1/4">
          <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="appearance-none pl-12 pr-4 py-3 rounded-xl w-full bg-white/80 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          >
            <option value="" disabled>Select region</option>
            {regions.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Input */}
      <div className="relative w-full md:w-1/2">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
        <input
          type="text"
          placeholder="Search for restaurants or dishes"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-4 py-3 rounded-xl w-full bg-white/80 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
      </div>
    </div>
  );
};

export default SearchBar;
