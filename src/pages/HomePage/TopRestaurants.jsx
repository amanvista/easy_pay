import React from 'react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useTopRestaurants from '../../app/hooks/useTopRestaurants';

const TopRestaurants = () => {
  const { topRestaurants, loading, error } = useTopRestaurants();

  if (loading) {
    return <div className="p-4"><LoadingSpinner/></div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading restaurants: {error}</div>;
  }

  if (topRestaurants.length === 0) {
    return <div className="p-4 text-gray-500">No top restaurants found for this zone.</div>;
  }

  return (
    <section className="overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 snap-x snap-mandatory overflow-x-auto scroll-smooth p-2">
          {topRestaurants?.map((res, index) => (
            <RestaurantCard key={res.id || index} {...res} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRestaurants;
