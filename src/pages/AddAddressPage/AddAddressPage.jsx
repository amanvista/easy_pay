import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, HelpCircle, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import AddressCard from '../../components/AddressCard/AddressCard';
import AddAddressForm from '../../components/AddAddressForm/AddAddressForm';
import StickyFooter from '../../components/StickyFooter/StickyFooter';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import addressService from '../../services/addressService';

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, addressId: null, addressLabel: '' });

  // Map API address to component format
  const mapAddressToComponent = (apiAddress) => ({
    id: apiAddress.id,
    label: apiAddress.address_label || 'Home',
    fullName: apiAddress.full_name,
    phone: apiAddress.phone_number,
    addressLine: apiAddress.street_building_area,
    city: apiAddress.city,
    state: apiAddress.state,
    pincode: apiAddress.zip_code,
    landmark: apiAddress.landmark || '',
    note: apiAddress.delivery_instructions || '',
    isDefault: apiAddress.is_default,
    latitude: apiAddress.latitude ? parseFloat(apiAddress.latitude) : null,
    longitude: apiAddress.longitude ? parseFloat(apiAddress.longitude) : null,
  });

  // Fetch addresses from API
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const addresses = await addressService.getAllAddresses();
      console.log('API Response addresses:', addresses);
      const mappedAddresses = addresses.map(mapAddressToComponent);
      console.log('Mapped addresses:', mappedAddresses);
      setSavedAddresses(mappedAddresses);
      
      // Sync to localStorage for AddressSelector
      localStorage.setItem('savedAddresses', JSON.stringify(mappedAddresses));
      
      // Auto-select default address
      const defaultAddress = mappedAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        localStorage.setItem('selectedAddress', JSON.stringify(defaultAddress));
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error(error.message || 'Failed to load addresses', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle URL parameters for edit mode
  useEffect(() => {
    const mode = searchParams.get('mode');
    const addressId = searchParams.get('id');

    if (mode === 'add') {
      setShowAddForm(true);
      setEditingAddress(null);
    } else if (mode === 'edit' && addressId && savedAddresses.length > 0) {
      const addressToEdit = savedAddresses.find(addr => addr.id === parseInt(addressId));
      if (addressToEdit) {
        setEditingAddress(addressToEdit);
        setShowAddForm(true);
      }
    }
  }, [searchParams, savedAddresses]);

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

  // API: POST address (add new)
  const handleAddAddress = async (newAddress) => {
    try {
      const apiAddressData = {
        address_label: newAddress.label || 'Home',
        street_building_area: newAddress.addressLine,
        city: newAddress.city,
        state: newAddress.state,
        zip_code: newAddress.pincode,
        full_name: newAddress.fullName,
        phone_number: newAddress.phone,
        landmark: newAddress.landmark || '',
        delivery_instructions: newAddress.deliveryInstructions || '',
        is_default: false,
        latitude: newAddress.latitude || null,
        longitude: newAddress.longitude || null,
      };

      await addressService.createAddress(apiAddressData);
      
      // Refresh addresses list
      await fetchAddresses();
      
      setSearchParams({});
      setShowAddForm(false);
      window.dispatchEvent(new Event('addressUpdated'));
      
      toast.success('Address added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error(error.message || 'Failed to add address', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // API: PUT address (update)
  const handleUpdateAddress = async (updatedAddress) => {
    try {
      const apiAddressData = {
        address_label: updatedAddress.label || 'Home',
        street_building_area: updatedAddress.addressLine,
        city: updatedAddress.city,
        state: updatedAddress.state,
        zip_code: updatedAddress.pincode,
        full_name: updatedAddress.fullName,
        phone_number: updatedAddress.phone,
        landmark: updatedAddress.landmark || '',
        delivery_instructions: updatedAddress.deliveryInstructions || '',
        is_default: updatedAddress.isDefault || false,
        latitude: updatedAddress.latitude || null,
        longitude: updatedAddress.longitude || null,
      };

      await addressService.updateAddress(updatedAddress.id, apiAddressData);
      
      // Refresh addresses list
      await fetchAddresses();
      
      setSearchParams({});
      setEditingAddress(null);
      setShowAddForm(false);
      window.dispatchEvent(new Event('addressUpdated'));
      
      toast.success('Address updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error(error.message || 'Failed to update address', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Show delete confirmation dialog
  const handleDeleteAddress = (addressId) => {
    const address = savedAddresses.find(addr => addr.id === addressId);
    setDeleteDialog({
      isOpen: true,
      addressId,
      addressLabel: address ? `${address.label} - ${address.addressLine}` : 'this address'
    });
  };

  // Confirm delete address
  const confirmDeleteAddress = async () => {
    try {
      await addressService.deleteAddress(deleteDialog.addressId);
      
      // Refresh addresses list
      await fetchAddresses();
      
      if (selectedAddressId === deleteDialog.addressId) {
        setSelectedAddressId(null);
        localStorage.removeItem('selectedAddress');
      }
      
      window.dispatchEvent(new Event('addressUpdated'));
      
      toast.success('Address deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error(error.message || 'Failed to delete address', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Handle edit
  const handleEditAddress = (address) => {
    setSearchParams({ mode: 'edit', id: address.id.toString() });
    setEditingAddress(address);
    setShowAddForm(true);
    setSelectedAddressId(null);
  };

  // Set address as default
  const handleSetDefault = async (addressId) => {
    try {
      const address = savedAddresses.find(addr => addr.id === addressId);
      if (!address) return;

      const apiAddressData = {
        address_label: address.label || 'Home',
        street_building_area: address.addressLine,
        city: address.city,
        state: address.state,
        zip_code: address.pincode,
        full_name: address.fullName,
        phone_number: address.phone,
        landmark: address.landmark || '',
        delivery_instructions: address.note || '',
        is_default: true,
        latitude: address.latitude || null,
        longitude: address.longitude || null,
      };

      await addressService.updateAddress(addressId, apiAddressData);
      
      // Refresh addresses list
      await fetchAddresses();
      
      toast.success('Default address updated!', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error(error.message || 'Failed to set default address', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
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
            onClick={() => {
              if (showAddForm) {
                // If in add/edit form, go back to address list
                setSearchParams({});
                setShowAddForm(false);
                setEditingAddress(null);
              } else {
                // Otherwise, navigate back
                navigate(-1);
              }
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {showAddForm 
              ? (editingAddress ? 'Edit Address' : 'Add New Address')
              : 'Select Delivery Address'
            }
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
          {/* Loading State */}
          {loading && !showAddForm && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Loading addresses...</p>
            </div>
          )}

          {/* Saved Addresses Section */}
          {!showAddForm && !loading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Saved Addresses
                </h2>
                <span className="text-sm text-gray-500">
                  {savedAddresses.length} {savedAddresses.length === 1 ? 'address' : 'addresses'}
                </span>
              </div>
              <div className="space-y-4">
                {savedAddresses.length > 0 ? (
                  savedAddresses.map((address) => (
                    <div key={address.id} className="relative">
                      <AddressCard
                        address={address}
                        isSelected={selectedAddressId === address.id}
                        onSelect={() => handleSelectAddress(address.id)}
                        onEdit={() => handleEditAddress(address)}
                        onDelete={() => handleDeleteAddress(address.id)}
                      />
                      {address.isDefault && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Default
                        </div>
                      )}
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="absolute top-2 right-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">No saved addresses yet</p>
                    <p className="text-gray-500 text-sm">Add your first address to get started</p>
                  </div>
                )}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => {
                  setSearchParams({ mode: 'add' });
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
                setSearchParams({});
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
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, addressId: null, addressLabel: '' })}
        onConfirm={confirmDeleteAddress}
        title="Delete Address"
        message={`Are you sure you want to delete "${deleteDialog.addressLabel}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default AddAddressPage;

