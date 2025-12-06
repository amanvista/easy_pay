// src/pages/CartPage.jsx
import { ChevronLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementItem, decrementItem } from "../../app/slices/cartSlice";
import { useState } from "react";
import { useDeliveryQuote } from "./useDeliveryQuote";
import { useOrderPayment } from "./useOrderPayment";

const CartPage = () => {
  const [orderType, setOrderType] = useState("delivery");
  const [deliveryPartner, setDeliveryPartner] = useState("porter");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const restaurant = useSelector((state) => state.cart.restaurant);
  const user = useSelector((state) => state.auth.userInfo);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);

  // Use delivery quote hook
  const {
    deliveryCharge,
    loading: loadingDeliveryCharge,
    available: deliveryAvailable,
    error: deliveryError,
  } = useDeliveryQuote({
    restaurant,
    selectedAddress,
    user,
    orderType,
  });

  // Use order payment hook
  const { isProcessing, processPayment } = useOrderPayment();

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = 10;
  const gst = Math.round(0.05 * totalMRP);
  const totalPay = totalMRP + platformFee + (orderType === "delivery" ? deliveryCharge : 0) + gst;
  const maxEta =
    cartItems.length > 0
      ? Math.max(
          ...cartItems.map(
            (item) => item.preparation_time || 0
          )
        )
      : 0;

  const handleBack = () => navigate(-1);

  const handlePayment = () => {
    processPayment({
      user,
      restaurant,
      cartItems,
      amounts: {
        totalMRP,
        gst,
        platformFee,
        deliveryCharge,
        totalPay,
      },
      orderType,
      deliveryPartner,
      instructions,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-white text-gray-700">
        {/* SVG / Illustration */}
        <img
          src="https://www.svgrepo.com/show/489284/cart.svg" // you can replace this with a better quirky svg
          alt="Empty cart"
          className="w-32 h-32 mb-6 opacity-70"
        />

        {/* Quirky Line */}
        <h2 className="text-xl font-bold mb-2">
          Oops! Looks like you’re on a diet 😅
        </h2>

        {/* Subtext */}
        <p className="text-sm mb-4">
          Your cart is empty. Add something delicious from the menu!
        </p>

        {/* CTA Button */}
        <button
          onClick={handleBack}
          className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 p-4 flex items-center gap-4">
        <ChevronLeft
          size={24}
          className="text-orange-500 cursor-pointer"
          onClick={handleBack}
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {restaurant?.name || "Cart"}
          </h2>
          <p className="text-xs text-gray-500">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s) •
            ⏱ {maxEta} min
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className=" m-4 px-4 py-6 space-y-4 border border-gray-200 p-4 rounded-2xl shadow-sm">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white hover:shadow-md transition-all"
          >
            {/* Left: Icon + Item Name */}
            <div className="flex items-center gap-3 w-1/2">
              {/* Veg/Non-Veg Icon */}
              <span
                className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                  item.is_vegetarian ? "border-green-600" : "border-red-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.is_vegetarian ? "bg-green-600" : "bg-red-600"
                  }`}
                />
              </span>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h3>
            </div>

            {/* Middle: Quantity Controls */}
            <div className="px-3 py-1 flex items-center gap-2">
              {/* Minus */}
              <button
                onClick={() => dispatch(decrementItem(item.id))}
                className="w-6 h-6 text-xs flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                −
              </button>

              {/* Quantity */}
              <span className="text-sm font-semibold text-gray-800 px-2">
                {item.quantity}
              </span>

              {/* Plus */}
              <button
                onClick={() => dispatch(incrementItem(item.id))}
                className="w-6 h-6 text-xs flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
              >
                +
              </button>
            </div>

            {/* Right: Total Price */}
            <div className="w-1/5 text-right">
              <p className="text-sm font-bold text-gray-800">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Restaurant Note */}
      <div className="px-4 mt-4">
        <label className="block text-sm text-gray-600 mb-1">
          Add Instructions for the Restaurant
        </label>
        <input
          type="text"
          placeholder="E.g. Less spicy"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-3 border rounded-xl text-sm bg-gray-50"
        />
      </div>

      {/* Order Type Selection */}
      <div className="px-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order Type
        </label>
        <div className="flex gap-4 mb-4">
          {[
            { value: "delivery", label: "Delivery" },
            { value: "pickup", label: "Eat Right Now" },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setOrderType(type.value)}
              className={`flex-1 px-4 py-3 rounded-xl border font-medium transition ${
                orderType === type.value
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Delivery Partner Selection */}
        {orderType === "delivery" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Partner
            </label>
            <div className="space-y-3">
              <div
                onClick={() => setDeliveryPartner("porter")}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  deliveryPartner === "porter"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 bg-white hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryPartner === "porter"
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryPartner === "porter" && (
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Porter</p>
                      <p className="text-xs text-gray-600">
                        Estimated delivery: 30-40 mins
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {loadingDeliveryCharge ? "..." : deliveryAvailable ? `₹${deliveryCharge}` : "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">Delivery charge</p>
                  </div>
                </div>
              </div>
              
              {/* Delivery Error Message */}
              {!deliveryAvailable && deliveryError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-700 font-medium">⚠️ {deliveryError}</p>
                  <p className="text-xs text-red-600 mt-1">Please select "Eat Right Now" option or try a different address.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bill Details */}
      <div
        className="mx-4 my-6 border-t pt-4 space-y-2 text-sm text-gray-700"
        id="bill_details"
      >
        <div className="flex justify-between">
          <span>Item Total</span>
          <span>₹{totalMRP}</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>
        {orderType === "delivery" && (
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>{loadingDeliveryCharge ? "Calculating..." : `₹${deliveryCharge}`}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>GST & Other</span>
          <span>₹{gst}</span>
        </div>
        <div className="flex justify-between font-bold text-base text-black pt-2 border-t">
          <span>To Pay</span>
          <span>₹{totalPay}</span>
        </div>
      </div>

      {/* Policy Disclaimer */}
      <div className="px-4 text-xs text-gray-500 space-y-1 mb-10">
        <p>Review your order before proceeding to payment.</p>
        <p>
          Read our{" "}
          <a href="/policies/cancellation" className="underline">
            Cancellation & Refund Policy
          </a>
          .
        </p>
      </div>

      {/* Restaurant Footer */}
      {restaurant && (
        <div className="px-4 text-sm text-gray-600 border-t py-4">
          <h4 className="font-medium text-gray-800">{restaurant.name}</h4>
          <p>{restaurant.address}</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner px-4 py-3 flex justify-between items-center z-50">
        <div className="text-sm">
          <p className="font-medium text-gray-800">₹{totalPay}</p>
          <button
            className="text-xs underline text-orange-500"
            onClick={() => {
              const el = document.querySelector("#bill_details");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Bill Details
          </button>
        </div>
        <button
          onClick={handlePayment}
          disabled={
            isProcessing || 
            (orderType === "delivery" && (loadingDeliveryCharge || !deliveryAvailable))
          }
          className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing 
            ? "Processing..." 
            : orderType === "delivery" && loadingDeliveryCharge 
            ? "Checking Delivery..." 
            : orderType === "delivery" && !deliveryAvailable 
            ? "Delivery Unavailable" 
            : "Make Payment"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
