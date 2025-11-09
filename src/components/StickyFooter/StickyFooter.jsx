import { ArrowRight } from 'lucide-react';

/**
 * StickyFooter component displays a sticky bottom CTA button for delivery confirmation
 */
const StickyFooter = ({ selectedAddress, onDeliver }) => {
  if (!selectedAddress) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-slide-up safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 mb-1">Deliver to</p>
            <p className="text-base font-semibold text-gray-900 truncate">
              {selectedAddress.label} - {selectedAddress.addressLine}, {selectedAddress.city}
            </p>
          </div>
          <button
            onClick={onDeliver}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;

