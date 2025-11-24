import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Home, Briefcase, Navigation, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * AddressSelector component - Cool address selector with icon design for Header
 */
const AddressSelector = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Mock saved addresses - in real app, this would come from Redux or API
  // This should match the addresses from AddAddressPage
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      addressLine: 'H-22, Sector 56',
      city: 'Gurgaon',
      pincode: '122011',
    },
    {
      id: 2,
      label: 'Work',
      addressLine: 'Plot 8, Cyber Hub',
      city: 'Gurgaon',
      pincode: '122009',
    },
  ]);

  // Load selected address from localStorage and sync addresses
  useEffect(() => {
    // Try to get addresses from localStorage (synced from AddAddressPage)
    const storedAddresses = localStorage.getItem('savedAddresses');
    if (storedAddresses) {
      try {
        const parsed = JSON.parse(storedAddresses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAddresses(parsed);
        }
      } catch (e) {
        console.log('Error parsing stored addresses');
      }
    }

    const saved = localStorage.getItem('selectedAddress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedAddress(parsed);
      } catch (e) {
        console.log('Error parsing selected address');
      }
    }
  }, []);

  // Sync selected address when savedAddresses changes
  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddress) {
      // Default to first address if none selected
      setSelectedAddress(savedAddresses[0]);
      localStorage.setItem('selectedAddress', JSON.stringify(savedAddresses[0]));
    } else if (selectedAddress && savedAddresses.length > 0) {
      // Check if selected address still exists
      const exists = savedAddresses.find(addr => addr.id === selectedAddress.id);
      if (!exists && savedAddresses.length > 0) {
        // Selected address was deleted, use first available
        setSelectedAddress(savedAddresses[0]);
        localStorage.setItem('selectedAddress', JSON.stringify(savedAddresses[0]));
      }
    }
  }, [savedAddresses, selectedAddress]);

  // Listen for address updates (for real-time sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'savedAddresses') {
        try {
          const updatedAddresses = JSON.parse(e.newValue || '[]');
          if (Array.isArray(updatedAddresses)) {
            setSavedAddresses(updatedAddresses);
          }
        } catch (error) {
          console.log('Error parsing updated addresses');
        }
      }
      if (e.key === 'selectedAddress') {
        try {
          const updatedSelected = JSON.parse(e.newValue || 'null');
          if (updatedSelected) {
            setSelectedAddress(updatedSelected);
          }
        } catch (error) {
          console.log('Error parsing selected address');
        }
      }
    };

    // Custom event for same-tab updates
    const handleCustomStorage = () => {
      const storedAddresses = localStorage.getItem('savedAddresses');
      if (storedAddresses) {
        try {
          const parsed = JSON.parse(storedAddresses);
          if (Array.isArray(parsed)) {
            setSavedAddresses(parsed);
          }
        } catch (e) {
          console.log('Error parsing stored addresses');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('addressUpdated', handleCustomStorage);
    // Poll for changes (fallback for same-tab updates)
    const interval = setInterval(handleCustomStorage, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('addressUpdated', handleCustomStorage);
      clearInterval(interval);
    };
  }, []);

  // Handle address selection
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem('selectedAddress', JSON.stringify(address));
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

