import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementItem } from "../../app/slices/cartSlice";

const MenuItem = ({ item, restaurantDetails, restaurant }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const quantity = cartItems.find((i) => i.id === item.id)?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        featured_image_url: item.image_url,
        is_vegetarian: item.is_vegetarian,
        preparation_time: item.preparation_time,
        restaurant: {
          id: restaurantDetails?.id || restaurant.id,
          name: restaurantDetails?.name || restaurant.name,
          address: restaurantDetails?.address || restaurant.address,
        },
      })
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 rounded-2xl border shadow-sm relative bg-white border-gray-100">
      {/* Left Section */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded border ${
              item.is_vegetarian
                ? "text-green-600 border-green-600 bg-green-50"
                : "text-red-600 border-red-600 bg-red-50"
            }`}
          >
            {item.is_vegetarian ? "Veg" : "Non-Veg"}
          </span>
        </div>
        <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
        {item.description && (
          <p className="text-sm text-gray-600">{item.description}</p>
        )}
        <div className="text-sm font-medium text-gray-700">
          ₹{item.price}{" "}
          {item.preparation_time > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              ⏱ {item.preparation_time} min
            </span>
          )}
        </div>
      </div>

      {/* Right Section (Image & Button/Counter) */}
      <div className="relative w-full sm:w-28 h-28 shrink-0">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        <div className="absolute bottom-1 right-1 w-[84px]">
          {quantity > 0 ? (
            <div className="flex items-center justify-between bg-white border border-orange-500 text-orange-500 text-xs font-semibold rounded-full px-2 py-1 h-7 shadow transition-all">
              <button
                onClick={() => dispatch(decrementItem(item.id))}
                className="hover:bg-orange-100 rounded-full px-2"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleAddToCart}
                className="hover:bg-orange-100 rounded-full px-2"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full h-7 bg-orange-500 text-white text-xs font-semibold rounded-full shadow hover:bg-orange-600 transition-all"
            >
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
