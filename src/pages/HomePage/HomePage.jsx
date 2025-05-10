import React from "react";
import "./HomePage.css";
import Header from "../../components/Header/Header";

// Direct Unsplash image URLs (permanent links)
const heroImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";
const stepImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
];

const featuredRestaurants = [
  {
    name: "Spicy Hub",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "North Indian • Tandoori Specials"
  },
  {
    name: "Tandoori Treats",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Mughlai • Kebabs"
  },
  {
    name: "Curry Corner",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "South Indian • Seafood"
  }
];

const HomePage = () => {
  return (
    <>
    <Header/>
    <div className="homepage-blinkfeast">
      
      {/* Hero Section */}
      <section className="homepage-blinkfeast__hero">
        <div className="homepage-blinkfeast__hero-image">
          <img 
            src={heroImage} 
            alt="Happy woman enjoying delicious food at a restaurant"
          />
        </div>
        <div className="homepage-blinkfeast__hero-content">
          <h1>Skip the line, savor the flavor</h1>
          <p>Order ahead from your favorite local restaurants</p>
          <button className="homepage-blinkfeast__cta">Get Started</button>
        </div>
      </section>

     

      {/* How It Works Section */}
      <section className="homepage-blinkfeast__how-it-works">
        <h2>How It Works</h2>
        <div className="homepage-blinkfeast__steps">
          {stepImages.map((image, index) => (
            <div key={index} className="homepage-blinkfeast__card">
              <img src={image} alt={`Step ${index + 1}`} />
              <h3>{[
                "Browse & Order", 
                "Pay Securely", 
                "Pick Up & Enjoy"
              ][index]}</h3>
              <p>{[
                "Choose from local restaurants and place your order online.",
                "Complete your payment with our secure payment system.",
                "Get notified when your order is ready - no waiting!"
              ][index]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="homepage-blinkfeast__featured">
        <h2>Featured Restaurants</h2>
        <div className="homepage-blinkfeast__restaurants">
          {featuredRestaurants.map((restaurant, index) => (
            <div key={index} className="homepage-blinkfeast__restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.cuisine}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-blinkfeast__footer">
        <div className="homepage-blinkfeast__footer-logo">blinkfeast</div>
      </footer>
    </div>
    </>
  );
};

export default HomePage;