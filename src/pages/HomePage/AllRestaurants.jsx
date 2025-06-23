import React, { useEffect, useRef, useState, useCallback } from 'react';
import useRestaurants from '../../app/hooks/useRestaurants';
import RestaurantGridCard from '../../components/ResaurantGridCard/RestaurantGridCard';
import useLocation from '../../app/hooks/useLocation';

const AllRestaurants = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { restaurants, totalPages, loading, error } = useRestaurants(page, limit);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const {zoneId} = useLocation();
  const observerRef = useRef(null);
  useEffect(() => {
    setPage(1);
    setAllRestaurants([]);
  }, [zoneId]);
  // Append new restaurants (no duplicates)
  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      const combined = [...allRestaurants, ...restaurants];

      // Deduplicate using slug first, then fallback to id
      const uniqueRestaurants = Array.from(
        new Map(
          combined.map((r) => [(r.slug || r.id), r])
        ).values()
      );

      setAllRestaurants(uniqueRestaurants);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants]);

  // IntersectionObserver to load more
  const lastRestaurantRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, page, totalPages]
  );

  return (
    <section className="py-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Explore More Restaurants
      </h3>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 w-full">
        {allRestaurants.map((restaurant, index) => {
          const isLast = index === allRestaurants.length - 1;
          const key = `restaurant-${restaurant.slug || restaurant.id || index}`;
          return (
            <div key={key} ref={isLast ? lastRestaurantRef : null}>
              <RestaurantGridCard {...restaurant} />
            </div>
          );
        })}
      </div>

      {loading && <p className="text-center mt-6 text-gray-600">Loading more...</p>}
    </section>
  );
};

export default AllRestaurants;
