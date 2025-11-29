import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Store, Utensils, UtensilsCrossed } from "lucide-react";
import restaurantService from "../../services/restaurantService";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function SearchPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all, restaurant, menu_item
  const observerTarget = useRef(null);
  const currentSearchQuery = useRef("");
  const debounceTimer = useRef(null);

  // Perform search when search term changes (with debouncing)
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (search.trim()) {
      // Set new timer for 500ms debounce
      debounceTimer.current = setTimeout(() => {
        // Reset and start new search
        currentSearchQuery.current = search.trim();
        setResults([]);
        setPage(1);
        setHasSearched(true);
        performSearch(search.trim(), 1, true);
      }, 500);
    } else {
      setResults([]);
      setHasSearched(false);
      setTotalResults(0);
    }

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

  // Infinite scroll observer
  useEffect(() => {
    const currentTarget = observerTarget.current;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && search.trim()) {
          const nextPage = page + 1;
          performSearch(currentSearchQuery.current, nextPage, false);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, page, search]);

  const performSearch = async (searchQuery, pageNum, isNewSearch = false) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await restaurantService.searchRestaurants(searchQuery, pageNum, 12);
      
      if (response.success) {
        if (isNewSearch) {
          setResults(response.data || []);
        } else {
          setResults(prev => [...prev, ...(response.data || [])]);
        }
        setPage(pageNum);
        setHasMore(pageNum < response.total_pages);
        setTotalResults(response.total);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    // Navigate to restaurant menu page
    navigate(`/menu/${item.restaurant_id}`);
  };

  // Filter results based on active tab
  const filteredResults = results.filter(item => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  // Count results by type
  const restaurantCount = results.filter(r => r.type === "restaurant").length;
  const menuItemCount = results.filter(r => r.type === "menu_item").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <SearchBar
            location={location}
            setLocation={setLocation}
            region={region}
            setRegion={setRegion}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-orange-500 mr-2" size={24} />
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        {hasSearched && results.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 font-medium transition-colors relative ${
                  activeTab === "all"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All ({totalResults})
                {activeTab === "all" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("restaurant")}
                className={`px-4 py-2 font-medium transition-colors relative ${
                  activeTab === "restaurant"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Restaurants ({restaurantCount})
                {activeTab === "restaurant" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("menu_item")}
                className={`px-4 py-2 font-medium transition-colors relative ${
                  activeTab === "menu_item"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Menu Items ({menuItemCount})
                {activeTab === "menu_item" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {filteredResults.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((item, index) => (
                <div
                  key={`${item.type}-${item.id}-${index}`}
                  onClick={() => handleItemClick(item)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                >
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.type === 'restaurant' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.type === 'restaurant' ? 'Restaurant' : 'Menu Item'}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="h-48 bg-gray-200 relative">
                    {item.image_url || item.restaurant_image_url ? (
                      <img
                        src={item.image_url || item.restaurant_image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {item.type === 'restaurant' ? (
                          <Store className="w-16 h-16 text-gray-400" />
                        ) : (
                          <UtensilsCrossed className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    
                    {/* Menu Item specific info */}
                    {item.type === 'menu_item' && (
                      <>
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-600 font-semibold">
                            ₹{item.price}
                          </span>
                          {item.is_vegetarian && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Veg
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 border-t pt-2">
                          <Store size={14} />
                          <span className="truncate">{item.restaurant_name}</span>
                        </div>
                      </>
                    )}

                    {/* Restaurant specific info */}
                    {item.type === 'restaurant' && (
                      <>
                        {item.address && (
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                            {item.address}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Utensils size={14} />
                          <span>View Menu</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Loading more indicator */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <Loader className="animate-spin text-orange-500 mr-2" size={24} />
                <p className="text-gray-600">Loading more...</p>
              </div>
            )}

            {/* Intersection observer target */}
            <div ref={observerTarget} className="h-20 flex items-center justify-center">
              {loading && hasMore && (
                <p className="text-gray-400 text-sm">Loading more...</p>
              )}
            </div>

            {/* End of results */}
            {!hasMore && filteredResults.length > 0 && (
              <div className="py-10 flex flex-col items-center text-gray-500">
                <div className="w-10 h-1 bg-gray-300 rounded-full mb-3"></div>
                <p className="text-sm tracking-wide">
                  You've reached the end of the results
                </p>
              </div>
            )}
          </>
        )}

        {/* No results for active filter */}
        {hasSearched && results.length > 0 && filteredResults.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {activeTab === "restaurant" ? "restaurants" : "menu items"} found
            </h3>
            <p className="text-gray-600">
              Try selecting a different filter or search with different keywords
            </p>
          </div>
        )}

        {/* No results */}
        {hasSearched && !loading && results.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Initial State - No search yet */}
        {!hasSearched && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Searching
            </h3>
            <p className="text-gray-600">
              Enter a restaurant name or dish to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
