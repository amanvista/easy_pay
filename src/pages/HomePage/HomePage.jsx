import { useState } from "react";
import featureCards from "../../data/featureCards";
import restaurants from "../../data/restaurantData";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantGridCard from "../../components/ResaurantGridCard/RestaurantGridCard";

const Home = () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filteredRestaurants = restaurants.data.restaurants.data.filter(
    (res) =>
      (location ? res.city === location : true) &&
      (region ? res.region === region : true) &&
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
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              Icon={card.icon}
            />
          ))}
        </section>

        {/* Restaurant Carousel */}
        <section className="overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-5 snap-x snap-mandatory overflow-x-auto scroll-smooth p-2">
              {filteredRestaurants.map((res, index) => (
                <RestaurantCard key={index} {...res} />
              ))}
            </div>
          </div>
        </section>

        {/* Restaurant Grid View */}
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
      </div>
    </div>
  );
};

export default Home;
