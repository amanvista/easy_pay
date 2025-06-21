import React from 'react'
import RestaurantGridCard from '../../components/ResaurantGridCard/RestaurantGridCard'
import restaurants from '../../data/restaurantData';

const AllRestaurants = () => {
    const filteredRestaurants = restaurants.data.restaurants.data.filter(
        (res) =>
          (location ? res.city === location : true) &&
          (region ? res.region === region : true) &&
          res.name.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Explore More Restaurants
          </h3>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 w-full">
            {filteredRestaurants.map((res, index) => (
              <RestaurantGridCard key={index} {...res} />
            ))}
          </div>
        </section>
  )
}

export default AllRestaurants