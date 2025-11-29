import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, Home, Briefcase, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAddresses, selectAddress } from '../../app/slices/addressSlice';

/**
 * AddressSelector component - Cool address selector with icon design for Header
 */
const AddressSelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get addresses from Redux
  const savedAddresses = useSelector((state) => state.address.addresses);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);

  // Load addresses from localStorage on mount (sync with Redux)
  useEffect(() => {
    const storedAddresses = localStorage.getItem('savedAddresses');
    if (storedAddresses) {
      try {
        const parsed = JSON.parse(storedAddresses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch(setAddresses(parsed));
        }
      } catch (e) {
        console.log('Error parsing stored addresses');
      }
    }
  }, [dispatch]);

  // Listen for address updates from other components
  useEffect(() => {
    const handleAddressUpdate = () => {
      const storedAddresses = localStorage.getItem('savedAddresses');
      if (storedAddresses) {
        try {
          const parsed = JSON.parse(storedAddresses);
          if (Array.isArray(parsed)) {
            dispatch(setAddresses(parsed));
          }
        } catch (e) {
          console.log('Error parsing stored addresses');
        }
      }
    };

    window.addEventListener('addressUpdated', handleAddressUpdate);
    return () => {
      window.removeEventListener('addressUpdated', handleAddressUpdate);
    };
  }, [dispatch]);

  // Handle address selection
  const handleSelectAddress = (address) => {
    dispatch(selectAddress(address));
    setShowDropdown(false);
  };

  // Get icon based on label
  const getIcon = (label) => {
    switch (label?.toLowerCase()) {
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'work':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  // Get icon color
  const getIconColor = (label) => {
    switch (label?.toLowerCase()) {
      case 'home':
        return 'text-blue-600';
      case 'work':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!selectedAddress || savedAddresses.length === 0) {
    return (
      <button
        onClick={() => navigate('/add-address')}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-50"
      >
        <MapPin className="w-4 h-4" />
        <span className="hidden sm:inline">Add Address</span>
        <span className="sm:hidden">Add</span>
      </button>
    );
  }

  return (
    <div className="relative w-full sm:w-auto">
      {/* Address Selector Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors group w-full sm:w-auto"
        aria-label="Select delivery address"
      >
        {/* Icon with cool design - animated pulse on hover */}
        <div className="relative flex items-center justify-center w-9 h-9 flex-shrink-0">
          {/* Animated background circle */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full opacity-0 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300"></div>
          {/* Icon container with background */}
          <div className={`relative z-10 p-1.5 rounded-full bg-white border-2 border-transparent group-hover:border-orange-200 transition-all duration-300 ${getIconColor(selectedAddress.label)}`}>
            {getIcon(selectedAddress.label)}
          </div>
        </div>
        
        {/* Address Text */}
        <div className="text-left hidden sm:block flex-1 min-w-0">
          <div className="text-xs text-gray-500">Deliver to</div>
          <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-[180px]">
            {selectedAddress.label} • {selectedAddress.addressLine.split(',')[0]}
          </div>
        </div>
        
        {/* Mobile - Show label and city */}
        <div className="text-left sm:hidden flex-1 min-w-0">
          <div className="text-xs text-gray-500">Location</div>
          <div className="text-sm font-medium text-gray-900 truncate">
            {selectedAddress.label} • {selectedAddress.city}
          </div>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute left-0 sm:left-0 top-full mt-2 w-[calc(100vw-3rem)] sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-[70] overflow-hidden animate-fade-in">
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">Select Delivery Address</h3>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {savedAddresses.length > 0 ? (
                savedAddresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => handleSelectAddress(address)}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                      selectedAddress?.id === address.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <div className={`mt-1 flex-shrink-0 ${getIconColor(address.label)}`}>
                      {getIcon(address.label)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{address.label}</span>
                        {selectedAddress?.id === address.id && (
                          <span className="px-2 py-0.5 text-xs font-medium text-orange-600 bg-orange-100 rounded-full flex-shrink-0">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {address.addressLine}, {address.city} - {address.pincode}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No addresses saved
                </div>
              )}
            </div>
            
            {/* Manage Addresses Button */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/add-address');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Manage Addresses
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressSelector;

