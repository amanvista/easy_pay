import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import "./SearchPage.css";
import Header from '../../components/Header/Header';
import NotificationPlay from '../../components/NotificationPlay/NotificationPlay';
import useRestaurants from '../../app/hooks/useRestaurants';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const [page, setPage] = useState(1);
  const limit = 5;

  const { restaurants, totalPages, loading, error } = useRestaurants(page, limit);
  const [cartCount, setCartCount] = useState(0);
  const [userLocation, setUserLocation] = useState('New York, NY');

  const handleChangeLocation = () => {
    const newLocation = prompt('Enter your location:');
    if (newLocation) {
      setUserLocation(newLocation);
    }
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine_type?.toLowerCase().includes(query.toLowerCase()) ||
      r.top_dishes?.toLowerCase().includes(query.toLowerCase())
    );
  }, [restaurants, query]);

  return (
    <div className="search-page">
      <Header
        cartCount={cartCount}
        userLocation={userLocation}
        onChangeLocation={handleChangeLocation}
      />

      <main className="main-content">
        {loading && <p>Loading restaurants...</p>}
        {error && <p>Error: {error}</p>}

        <div className="results-grid">
          {!loading && filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onOrder={() => setCartCount(c => c + 1)}
            />
          ))}
        </div>

        {!loading && filteredRestaurants.length === 0 && (
          <div className="no-results">
            <h3 className="no-results-title">No restaurants found</h3>
            <p className="no-results-message">Try a different search term</p>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
              ⬅ Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              Next ➡
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
