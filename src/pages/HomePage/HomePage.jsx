import { useState } from "react";
import featureCards from "../../data/featureCards";
import restaurants from "../../data/restaurantData";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopRestaurants from "./TopRestaurants";
import AllRestaurants from "./AllRestaurants";

const Home = () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

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
        <TopRestaurants zoneId={4}/>
        <AllRestaurants/>
        
      </div>
    </div>
  );
};

export default Home;
