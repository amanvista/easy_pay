import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1>Order Food, Skip the Queue</h1>
          <p>With Garbji, order online, pay online, and pick up your food when it's ready - no waiting!</p>
          <div className="hero-buttons">
            <Link to="/restaurants" className="btn btn-primary">Order Now</Link>
            <Link to="/register" className="btn btn-outline">Sign Up</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How Garbji Works</h2>
            <p>We provide the best food delivery experience with our fast service and wide selection of restaurants</p>
          </div>
          
          <div className="grid grid-cols-3">
            <div className="feature-card">
              <div className="feature-icon">1</div>
              <h3>Browse & Order</h3>
              <p>Choose from local restaurants and place your order online.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">2</div>
              <h3>Pay Securely</h3>
              <p>Complete your payment online with our secure payment system.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">3</div>
              <h3>Pick Up & Enjoy</h3>
              <p>Get notified when your order is ready for pickup - no waiting in line!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="featured-restaurants">
        <div className="container">
          <div className="section-title">
            <h2>Featured Restaurants</h2>
          </div>
          
          <div className="grid grid-cols-3">
            <div className="restaurant-card">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Restaurant" 
              />
              <div className="restaurant-info">
                <h3>Urban Bites</h3>
                <p className="cuisine-type">Italian • American • $$</p>
                <Link to="/menu/1" className="view-menu">View Menu</Link>
              </div>
            </div>
            {/* Add more restaurant cards */}
          </div>
          
          <div className="view-all">
            <Link to="/restaurants" className="btn btn-outline">View All Restaurants</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;