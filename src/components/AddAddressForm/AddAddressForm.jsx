import { useState, useEffect } from 'react';
import { Navigation, MapPin, X } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * AddAddressForm component for adding or editing addresses
 */
const AddAddressForm = ({ editingAddress, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    pincode: '',
    landmark: '',
    deliveryInstructions: '',
  });

  // Populate form if editing
  useEffect(() => {
    if (editingAddress) {
      setFormData({
        label: editingAddress.label || 'Home',
        fullName: editingAddress.fullName || '',
        phone: editingAddress.phone || '',
        addressLine: editingAddress.addressLine || '',
        city: editingAddress.city || '',
        pincode: editingAddress.pincode || '',
        landmark: editingAddress.landmark || '',
        deliveryInstructions: editingAddress.note || '',
      });
    }
  }, [editingAddress]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName?.trim() || !formData.phone?.trim() || !formData.addressLine?.trim() || !formData.city?.trim() || !formData.pincode?.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate phone number (basic check)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    // Validate pincode (6 digits)
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode.trim())) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    // Format data for save
    const addressData = {
      ...formData,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      addressLine: formData.addressLine.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode.trim(),
      landmark: formData.landmark.trim(),
      note: formData.deliveryInstructions.trim(),
      ...(editingAddress && { id: editingAddress.id }),
    };

    onSave(addressData);
  };

  // Mock "Use current location" - fills with random nearby location
  const handleUseCurrentLocation = () => {
    const mockLocations = [
      {
        addressLine: 'Sector 29, Near Metro Station',
        city: 'Gurgaon',
        pincode: '122001',
      },
      {
        addressLine: 'DLF Cyber City, Tower A',
        city: 'Gurgaon',
        pincode: '122002',
      },
      {
        addressLine: 'MG Road, Near Shopping Mall',
        city: 'Gurgaon',
        pincode: '122003',
      },
    ];

    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    
    setFormData((prev) => ({
      ...prev,
      addressLine: randomLocation.addressLine,
      city: randomLocation.city,
      pincode: randomLocation.pincode,
    }));

    // Show success message
    toast.success('Location detected and filled!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Label Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Label *
          </label>
          <select
            name="label"
            value={formData.label}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            required
          />
        </div>

        {/* Use Current Location Button */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="w-full px-4 py-3 border-2 border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          Use My Current Location
        </button>

        {/* Street / Building / Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street / Building / Area *
          </label>
          <input
            type="text"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            placeholder="Enter street, building, or area"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            required
          />
        </div>

        {/* City and Pincode in a row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Landmark (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Landmark <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Enter nearby landmark"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Delivery Instructions (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Instructions <span className="text-gray-500">(Optional)</span>
          </label>
          <textarea
            name="deliveryInstructions"
            value={formData.deliveryInstructions}
            onChange={handleChange}
            placeholder="Any special instructions for delivery"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
          />
        </div>

        {/* Map Preview Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Map Preview Here</p>
          <p className="text-gray-400 text-xs mt-1">
            {formData.addressLine
              ? `${formData.addressLine}, ${formData.city}`
              : 'Enter address to see map preview'}
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            {editingAddress ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;

