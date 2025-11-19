import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../app/slices/cartSlice";

const CartSummary = ({ cartCount, onViewCart }) => {
  const dispatch = useDispatch();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner px-4 py-3 flex justify-between items-center z-50">
      <p className="text-sm text-gray-800">
        {cartCount} item{cartCount > 1 ? "s" : ""} added
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={onViewCart}
          className="bg-orange-500 text-white px-4 py-2 rounded-xl cursor-pointer font-medium hover:bg-orange-600 transition-all"
        >
          View Cart
        </button>
        <button
          onClick={() => dispatch(clearCart())}
          className="flex items-center gap-1 text-gray-700 hover:text-black text-sm font-medium transition"
          title="Clear Cart"
        >
          <X size={16} strokeWidth={2} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
