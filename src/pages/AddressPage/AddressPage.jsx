import React, { useState } from "react";
import { toast } from "react-toastify";
import { MapPin, Loader2 } from "lucide-react";

// 🧪 Mock API (replace this when baackend is ready)
const mockAddressApi = {
  createAddress: async (data) => {
    console.log("Mock API called with:", data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Math.floor(Math.random() * 10000) });
      }, 1000);
    });
  },
};

const AddressPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        toast.success("Location fetched successfully!");
      },
      (error) => {
        toast.error("Failed to get location. Please allow location access.");
        console.error(error);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mockAddressApi.createAddress(form);
      console.log("Mock response:", res);
      toast.success("Address saved successfully!");
      setForm({
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add Delivery Address
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* --- Name --- */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* --- Phone --- */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* --- Address --- */}
        <div>
          <label className="block text-sm font-medium">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* --- City / State --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* --- Pincode --- */}
        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* --- Lat / Long --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={form.latitude}
              readOnly
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={form.longitude}
              readOnly
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleLocationClick}
          className="flex items-center gap-2 text-blue-600 text-sm font-medium mt-1"
        >
          <MapPin className="w-4 h-4" /> Use Current Location
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-3 flex justify-center items-center"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
