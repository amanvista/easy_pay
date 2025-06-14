import { ChevronLeft, MapPin, ShoppingCart } from "lucide-react";
import restaurants from "../../data/restaurantData";
import { useNavigate, useParams } from "react-router-dom";
import MenuItems from "../../components/MenuItems/MenuItems";
import RestaurantFooter from "../../components/RestaurantFooter/RestaurantFooter";
import { useSelector } from "react-redux";
import { menuData } from "../../data/menuData";
import { useRef, useState } from "react";
import CategoryMenuModal from "../../components/CategoryMenuModal/CategoryMenuModal";

const MenuPage = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const categoryRefs = useRef({});
  const { id } = useParams();

  const restaurant = restaurants.data.restaurants.data.find(
    (res) => res.id === Number(id)
  );

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // fallback to home
    }
  };

  const handleCategoryRefs = (refs) => {
    categoryRefs.current = refs;
  };

  const scrollToCategory = (category) => {
    const ref = categoryRefs.current[category];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setShowCategoryMenu(false);
    }
  };

  if (!restaurant) return <div className="p-4">Restaurant not found.</div>;

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button className="text-orange-500">
            <ChevronLeft
              size={24}
              onClick={handleBack}
              className="cursor-pointer"
            />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            {restaurant.name}
          </h2>
        </div>
        <div className="relative">
          <ShoppingCart size={24} className="text-orange-500" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Restaurant Info */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-4 space-y-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            {/* Logo + Name/Details */}
            <div className="flex gap-4 items-start">
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-14 h-14 rounded-full border object-cover"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {restaurant.name}
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {restaurant.address}
                </p>
                <p className="text-xs text-gray-500 italic">
                  {restaurant.description}
                </p>
                <a
                  href={`tel:${restaurant.contact_phone}`}
                  className="text-sm text-orange-500 underline"
                >
                  Call: {restaurant.contact_phone}
                </a>
              </div>
            </div>

            {/* Rating + Cost */}
            <div className="text-right ml-auto sm:text-left">
              <p className="text-sm text-gray-700">
                ⭐ {restaurant.avg_rating.toFixed(1)}
              </p>
              {restaurant.top_dishes && (
                <p className="text-xs text-gray-500 mt-1">
                  Top picks: {restaurant.top_dishes}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Visual Tile (Video) */}
        {restaurant.video && (
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-white/20">
            <video
              className="w-full h-56 object-cover"
              src={`/assets/${restaurant.video}`}
              autoPlay
              muted
              loop
            />
          </div>
        )}
      </div>

      {/* Menu Item */}
      <MenuItems onRefsReady={handleCategoryRefs} />
      {/* Floating Menu Button */}
      <button
        className="hidden md:block fixed bottom-24 right-5 z-40 bg-orange-500 text-white px-5 py-2 rounded-full shadow-xl hover:bg-orange-600 transition-all"
        onClick={() => setShowCategoryMenu(true)}
      >
        Menu
      </button>

      {/* Category Modal */}
      <CategoryMenuModal
        visible={showCategoryMenu}
        categories={Object.keys(menuData.categories)}
        onClose={() => setShowCategoryMenu(false)}
        onSelectCategory={scrollToCategory}
      />

      {/* Sticky Cart Summary */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner px-4 py-3 flex justify-between items-center z-50">
          <p className="text-sm text-gray-800">
            {cartCount} item{cartCount > 1 ? "s" : ""} added
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-all">
            View Cart
          </button>
        </div>
      )}

      <RestaurantFooter restaurant={restaurant} />
    </div>
  );
};

export default MenuPage;
