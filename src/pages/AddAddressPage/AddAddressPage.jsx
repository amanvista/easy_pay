import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import AddressCard from '../../components/AddressCard/AddressCard';
import AddAddressForm from '../../components/AddAddressForm/AddAddressForm';
import StickyFooter from '../../components/StickyFooter/StickyFooter';

// Mock saved addresses data
const mockSavedAddresses = [
  {
    id: 1,
    label: 'Home',
    addressLine: 'H-22, Sector 56',
    city: 'Gurgaon',
    pincode: '122011',
    phone: '9876543210',
    note: 'Call once you reach gate',
  },
  {
    id: 2,
    label: 'Work',
    addressLine: 'Plot 8, Cyber Hub',
    city: 'Gurgaon',
    pincode: '122009',
    phone: '9999888877',
    note: 'Near building 5',
  },
];

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = useState(mockSavedAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Mock API: GET addresses
  useEffect(() => {
    // Load addresses from localStorage if available, otherwise use mock data
    const storedAddresses = localStorage.getItem('savedAddresses');
    if (storedAddresses) {
      try {
        const parsed = JSON.parse(storedAddresses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAddresses(parsed);
        } else {
          setSavedAddresses(mockSavedAddresses);
          localStorage.setItem('savedAddresses', JSON.stringify(mockSavedAddresses));
        }
      } catch (e) {
        setSavedAddresses(mockSavedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(mockSavedAddresses));
      }
    } else {
      setSavedAddresses(mockSavedAddresses);
      localStorage.setItem('savedAddresses', JSON.stringify(mockSavedAddresses));
    }

    // Load selected address from localStorage
    const selected = localStorage.getItem('selectedAddress');
    if (selected) {
      try {
        const parsed = JSON.parse(selected);
        const addressExists = savedAddresses.find(addr => addr.id === parsed.id);
        if (addressExists) {
          setSelectedAddressId(parsed.id);
        }
      } catch (e) {
        console.log('Error parsing selected address');
      }
    }
  }, []);

  // Handle address selection
  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      // Sync selected address to localStorage for AddressSelector
      localStorage.setItem('selectedAddress', JSON.stringify(address));
    }
    setShowAddForm(false);
    setEditingAddress(null);
  };

  // Mock API: POST address (add new)
  const handleAddAddress = (newAddress) => {
    const addressWithId = {
      ...newAddress,
      id: savedAddresses.length + 1,
    };
    const updatedAddresses = [...savedAddresses, addressWithId];
    setSavedAddresses(updatedAddresses);
    // Sync to localStorage for AddressSelector
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new Event('addressUpdated'));
    setShowAddForm(false);
    toast.success('Address added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  // Mock API: PUT address (update)
  const handleUpdateAddress = (updatedAddress) => {
    const updatedAddresses = savedAddresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    );
    setSavedAddresses(updatedAddresses);
    // Sync to localStorage for AddressSelector
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new Event('addressUpdated'));
    setEditingAddress(null);
    setShowAddForm(false);
    toast.success('Address updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  // Mock API: DELETE address
  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const updatedAddresses = savedAddresses.filter((addr) => addr.id !== addressId);
      setSavedAddresses(updatedAddresses);
      // Sync to localStorage for AddressSelector
      localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
      // Dispatch custom event for real-time sync
      window.dispatchEvent(new Event('addressUpdated'));
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        localStorage.removeItem('selectedAddress');
        window.dispatchEvent(new Event('addressUpdated'));
      }
      toast.success('Address deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  // Handle edit
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddForm(true);
    setSelectedAddressId(null);
  };

  // Get selected address details
  const selectedAddress = savedAddresses.find(
    (addr) => addr.id === selectedAddressId
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Select Delivery Address
          </h1>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content - Top-left aligned on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl">
          {/* Saved Addresses Section */}
          {!showAddForm && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Saved Addresses
              </h2>
              <div className="space-y-4">
                {savedAddresses.length > 0 ? (
                  savedAddresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={selectedAddressId === address.id}
                      onSelect={() => handleSelectAddress(address.id)}
                      onEdit={() => handleEditAddress(address)}
                      onDelete={() => handleDeleteAddress(address.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No saved addresses yet
                  </div>
                )}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingAddress(null);
                  setSelectedAddressId(null);
                }}
                className="mt-6 w-full sm:w-auto px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 font-medium hover:border-orange-500 hover:text-orange-500 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Add New Address
              </button>
            </div>
          )}

          {/* Add/Edit Address Form */}
          {showAddForm && (
            <AddAddressForm
              editingAddress={editingAddress}
              onSave={editingAddress ? handleUpdateAddress : handleAddAddress}
              onCancel={() => {
                setShowAddForm(false);
                setEditingAddress(null);
              }}
            />
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      {!showAddForm && selectedAddress && (
        <StickyFooter
          selectedAddress={selectedAddress}
          onDeliver={() => navigate('/order-summary')}
        />
      )}
    </div>
  );
};

export default AddAddressPage;

