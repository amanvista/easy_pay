import { X } from "lucide-react";

const RestaurantChangeModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentRestaurantName, 
  newRestaurantName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Replace cart items?
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          You have items from <span className="font-semibold text-gray-900">{currentRestaurantName}</span> in your cart. 
          Do you want to remove them and add items from <span className="font-semibold text-gray-900">{newRestaurantName}</span>?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition"
          >
            Yes, Replace
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantChangeModal;
