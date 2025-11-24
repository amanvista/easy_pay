import { ChevronLeft, ShoppingCart } from "lucide-react";

const MenuPageHeader = ({ 
  restaurantDetails, 
  restaurant, 
  cartCount, 
  onBack, 
  onCartClick 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button className="text-orange-500">
          <ChevronLeft
            size={24}
            onClick={onBack}
            className="cursor-pointer"
          />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {restaurantDetails?.name || restaurant.name}
          </h2>
          {restaurantDetails && (
            <p className="text-xs text-gray-600">
              {restaurantDetails.address}
            </p>
          )}
        </div>
      </div>
      <div
        className="relative cursor-pointer"
        onClick={onCartClick}
      >
        <ShoppingCart size={24} className="text-orange-500" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default MenuPageHeader;
