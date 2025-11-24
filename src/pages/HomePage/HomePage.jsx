import { useState, useEffect, useRef, useCallback } from "react";
import featureCards from "../../data/featureCards";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantGridCard from "../../components/ResaurantGridCard/RestaurantGridCard";
import restaurantService from "../../services/restaurantService";

const Home = () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  
  // Carousel restaurants state
  const [carouselRestaurants, setCarouselRestaurants] = useState([]);
  const [carouselPage, setCarouselPage] = useState(1);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [carouselHasMore, setCarouselHasMore] = useState(true);
  
  // Grid restaurants state
  const [gridRestaurants, setGridRestaurants] = useState([]);
  const [gridPage, setGridPage] = useState(1);
  const [gridLoading, setGridLoading] = useState(false);
  const [gridHasMore, setGridHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const observerTarget = useRef(null);
  const carouselRef = useRef(null);
  const carouselEndRef = useRef(null);

  // Initial load for both carousel and grid
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setCarouselLoading(true);
        setGridLoading(true);
        setError(null);
        
        const response = await restaurantService.getFeatured(1, 10);
        
        if (response.success) {
          setCarouselRestaurants(response.data);
          setGridRestaurants(response.data);
          setCarouselHasMore(1 < response.total_pages);
          setGridHasMore(1 < response.total_pages);
        }
      } catch (err) {
        console.error('Error fetching featured restaurants:', err);
        setError(err.message);
      } finally {
        setCarouselLoading(false);
        setGridLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Horizontal scroll observer for carousel
  useEffect(() => {
    const carouselElement = carouselRef.current;
    const endElement = carouselEndRef.current;
    
    if (!carouselElement || !endElement) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && carouselHasMore && !carouselLoading) {
          console.log('Loading more carousel items...');
          setCarouselLoading(true);
          const nextPage = carouselPage + 1;
          
          restaurantService.getFeatured(nextPage, 4)
            .then(response => {
              if (response.success && response.data.length > 0) {
                setCarouselRestaurants(prev => [...prev, ...response.data]);
                setCarouselPage(nextPage);
                setCarouselHasMore(nextPage < response.total_pages);
              } else {
                setCarouselHasMore(false);
              }
            })
            .catch(err => {
              console.error('Error loading carousel:', err);
              setCarouselHasMore(false);
            })
            .finally(() => {
              setCarouselLoading(false);
            });
        }
      },
      { 
        root: carouselElement,
        threshold: 0.1,
        rootMargin: '0px 200px 0px 0px' // Trigger 200px before end
      }
    );

    observer.observe(endElement);

    return () => {
      observer.unobserve(endElement);
    };
  }, [carouselPage, carouselHasMore, carouselLoading]);

  // Vertical scroll observer for grid
  useEffect(() => {
    const currentTarget = observerTarget.current;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && gridHasMore && !gridLoading) {
          console.log('Loading more grid restaurants...');
          setGridLoading(true);
          const nextPage = gridPage + 1;
          
          restaurantService.getFeatured(nextPage, 4)
            .then(response => {
              if (response.success && response.data.length > 0) {
                setGridRestaurants(prev => [...prev, ...response.data]);
                setGridPage(nextPage);
                setGridHasMore(nextPage < response.total_pages);
              } else {
                setGridHasMore(false);
              }
            })
            .catch(err => {
              console.error('Error loading grid:', err);
              setGridHasMore(false);
            })
            .finally(() => {
              setGridLoading(false);
            });
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
  }, [gridHasMore, gridLoading, gridPage]);

  // Filter restaurants based on search
  const filteredCarouselRestaurants = carouselRestaurants.filter(
    (res) =>
      (location ? res.pincode === location : true) &&
      res.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredGridRestaurants = gridRestaurants.filter(
    (res) =>
      (location ? res.pincode === location : true) &&
      res.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-4 space-y-10 py-10">
        {/* Search + Location */}
        <SearchBar
          location={location}
          setLocation={setLocation}
          region={region}
          setRegion={setRegion}
          search={search}
          setSearch={setSearch}
        />

        {/* Features */}
        {/* <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              Icon={card.icon}
            />
          ))}
        </section> */}

        {/* Featured Restaurants Carousel */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Featured Restaurants
          </h3>
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-5 snap-x snap-mandatory scroll-smooth p-2">
                {filteredCarouselRestaurants.map((res) => (
                  <RestaurantCard key={`carousel-${res.id}`} {...res} image_url={res.image_url} />
                ))}
                {/* Carousel end marker for intersection observer */}
                <div ref={carouselEndRef} className="flex-shrink-0 w-1 h-full"></div>
                {/* Loading indicator for carousel */}
                {carouselLoading && (
                  <div className="flex-shrink-0 w-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Explore More - Grid View with Infinite Scroll */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Explore More Restaurants
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 w-full">
            {filteredGridRestaurants.map((res) => (
              <RestaurantGridCard key={`grid-${res.id}`} {...res} />
            ))}
          </div>

          {/* Loading indicator */}
          {gridLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          )}

          {/* Intersection observer target */}
          <div ref={observerTarget} className="h-20 flex items-center justify-center">
            {gridLoading && gridHasMore && (
              <p className="text-gray-400 text-sm">Loading more...</p>
            )}
          </div>

          {/* No more results */}
          {!gridHasMore && gridRestaurants.length > 0 && (
            <div className="py-10 flex flex-col items-center text-gray-500">
              <div className="w-10 h-1 bg-gray-300 rounded-full mb-3"></div>
              <p className="text-sm tracking-wide">
                You’ve reached the end of the list
              </p>
            </div>
          )}

          {/* No results */}
          {!gridLoading && gridRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured restaurants found</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
