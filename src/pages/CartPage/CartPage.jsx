// src/pages/CartPage.jsx
import { ChevronLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementItem, decrementItem } from "../../app/slices/cartSlice"; // you need to implement these
import { useState } from "react";
import DineInSelector from "../../components/DineInSelector/DineInSelector";

const CartPage = () => {
  const [orderType, setOrderType] = useState("dinein");
  const [tableNumber, setTableNumber] = useState("");
  const [selectedTakeawaySlot, setSelectedTakeawaySlot] = useState(null);
  const [showTakeawaySlot, setShowTakeawaySlot] = useState(false);

  // Time Slot State
  const [orderTime, setOrderTime] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const restaurant = useSelector((state) => state.cart.restaurant);

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = Math.round(0.3 * totalMRP);

  const platformFee = 10;
  const gst = Math.round(0.05 * totalMRP);
  const totalPay = totalMRP + platformFee + gst - savings;
  const maxEta =
    cartItems.length > 0
      ? Math.max(
          ...cartItems.map(
            (item) => parseInt(item.eta?.replace(/\D/g, ""), 10) || 0
          )
        )
      : 0;

  const handleBack = () => navigate(-1);
  const mockTimeSlots = [
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "01:00 PM",
    "01:15 PM",
    "01:30 PM",
    "01:45 PM",
  ];

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

      {/* Savings Banner */}
      {savings > 0 && (
        <div className="bg-green-100 text-green-800 p-3 mx-4 mt-4 rounded-lg text-sm font-medium">
          🎉 You’re saving ₹{savings} on this order!
        </div>
      )}

      {/* Order Type Selection */}
      <div className="px-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order Type
        </label>
        <div className="flex gap-4">
          {["dinein", "takeaway"].map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`px-4 py-2 rounded-xl border ${
                orderType === type
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {type === "dinein" ? "Dine-in" : "Takeaway"}
            </button>
          ))}
        </div>

        {/* Table Number Input for Dine-in */}
        {orderType === "dinein" && (
          <DineInSelector
            selectedTable={tableNumber}
            setSelectedTable={setTableNumber}
          />
        )}
      </div>

      {/* Time Slot Selection */}
      {orderType === "takeaway" && (
        <div className="px-4 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            When do you want your order?
          </label>
          <div className="flex gap-4 mb-3">
            {["asap", "custom"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setOrderTime(t);
                  if (t === "asap") {
                    const el = document.querySelector("#bill_details");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`px-4 py-2 rounded-xl border ${
                  orderTime === t
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {t === "asap" ? "Eat Right Now" : "Choose Time"}
              </button>
            ))}
          </div>

          {/* Time Selector if Custom Selected */}
          {orderTime === "custom" && (
            <div className="mt-2">
              {!selectedTakeawaySlot ? (
                <div className="w-full flex">
                  <button
                    onClick={() => setShowTakeawaySlot(true)}
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-sm"
                  >
                    Select a time slot
                  </button>
                </div>
              ) : (
                <div className="w-full border border-green-300 p-3 rounded-xl bg-green-50 text-sm flex justify-between items-center">
                  <span className="font-medium text-green-700">
                    ✅ {selectedTakeawaySlot}
                  </span>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setShowTakeawaySlot(true)}
                      className="text-xs text-blue-600 underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              {/* Dropdown modal / list */}
              {showTakeawaySlot && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {mockTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedTakeawaySlot(slot);
                        setShowTakeawaySlot(false);
                      }}
                      className="p-2 rounded-xl bg-white border hover:bg-orange-100 text-sm"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              {selectedTakeawaySlot && (
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={() => {
                      const el = document.querySelector("#bill_details");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs text-orange-500 underline"
                  >
                    View Bill Summary
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

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
      <div className="px-4 mt-2">
        <label className="block text-sm text-gray-600 mb-1">
          Add Instructions for the Restaurant
        </label>
        <input
          type="text"
          placeholder="E.g. Less spicy"
          className="w-full p-3 border rounded-xl text-sm bg-gray-50"
        />
      </div>

      {/* Apply Coupon */}
      <div className="mx-4 mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-orange-800">Apply Coupon</p>
          <p className="text-xs text-orange-700">
            Unlock offers and get instant discounts
          </p>
        </div>
        <button
          onClick={() => navigate("/apply-coupon")}
          className="text-sm font-medium text-orange-600 underline hover:text-orange-700 transition"
        >
          Apply
        </button>
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
        <div className="flex justify-between text-green-600 font-medium">
          <span>Discount</span>
          <span>-₹{savings}</span>
        </div>
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
          onClick={() => navigate("/payment")}
          className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700 transition-all"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
