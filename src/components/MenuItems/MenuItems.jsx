import { menuData } from "../../data/menuData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementItem } from "../../app/slices/cartSlice";
import { useEffect, useRef } from "react";

const MenuItems = ({ onRefsReady }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const categoryRefs = useRef({});

  useEffect(() => {
    if (onRefsReady) {
      onRefsReady(categoryRefs.current);
    }
  }, [onRefsReady]);

  const getItemQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="mt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-12">
      {Object.entries(menuData.categories).map(([category, items]) => {
        if (!categoryRefs.current[category]) {
          categoryRefs.current[category] = null;
        }
        return (
          <div
            key={category}
            ref={(el) => (categoryRefs.current[category] = el)}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-5">
              {category}
            </h3>
            <div className="space-y-6">
              {items.map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row justify-between gap-4 p-4 rounded-2xl border shadow-sm relative ${
                      item.is_available
                        ? "bg-white border-gray-100"
                        : "bg-gray-100 border-gray-200 opacity-70"
                    }`}
                  >
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
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="text-sm font-medium text-gray-700">
                        ₹{item.price}{" "}
                        <span className="ml-2 text-xs text-gray-500">
                          ⏱ {item.preparation_time} min
                        </span>
                      </div>
                    </div>

                    {/* Right Section (Image & Button/Counter) */}
                    <div className="relative w-full sm:w-28 h-28 shrink-0">
                      <img
                        src={item.featured_image_url}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />

                      {item.is_available && (
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
                                onClick={() => dispatch(addToCart(item))}
                                className="hover:bg-orange-100 rounded-full px-2"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => dispatch(addToCart(item))}
                              className="w-full h-7 bg-orange-500 text-white text-xs font-semibold rounded-full shadow hover:bg-orange-600 transition-all"
                            >
                              Add +
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItems;
