import { useState, useEffect, useRef } from "react";
import deliveryService from "../../services/deliveryService";

/**
 * Custom hook to fetch delivery quote
 * @param {Object} params - Parameters for delivery quote
 * @param {Object} params.restaurant - Restaurant object with latitude/longitude
 * @param {Object} params.selectedAddress - Delivery address with latitude/longitude
 * @param {Object} params.user - User object with name/phone
 * @param {string} params.orderType - Order type (delivery/takeaway)
 * @returns {Object} - Delivery quote state and methods
 */
export const useDeliveryQuote = ({ restaurant, selectedAddress, user, orderType }) => {
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState("");
  const [quoteFetched, setQuoteFetched] = useState(false);
  const fetchAttempted = useRef(false);

  useEffect(() => {
    // Reset states when order type changes to non-delivery
    if (orderType !== "delivery") {
      setDeliveryCharge(0);
      setQuoteFetched(false);
      setAvailable(true);
      setError("");
      fetchAttempted.current = false;
      return;
    }

    // Don't fetch if already fetched or if missing required data
    if (fetchAttempted.current || !restaurant || !selectedAddress) {
      return;
    }

    // Check if we have required coordinates
    if (
      !restaurant.latitude ||
      !restaurant.longitude ||
      !selectedAddress.latitude ||
      !selectedAddress.longitude
    ) {
      console.warn("Missing coordinates for delivery quote");
      setAvailable(false);
      setError("Delivery not available - Missing location coordinates");
      setQuoteFetched(true);
      fetchAttempted.current = true;
      return;
    }

    const fetchDeliveryQuote = async () => {
      setLoading(true);
      setAvailable(true);
      setError("");
      fetchAttempted.current = true;

      try {
        const quoteParams = {
          pickup_details: {
            lat: parseFloat(restaurant.latitude),
            lng: parseFloat(restaurant.longitude),
          },
          drop_details: {
            lat: parseFloat(selectedAddress.latitude),
            lng: parseFloat(selectedAddress.longitude),
          },
          customer: {
            name: user?.name || "Customer",
            mobile: {
              country_code: "+91",
              number: user?.phone || "9999999999",
            },
          },
        };

        console.log("Fetching delivery quote with params:", quoteParams);
        const quote = await deliveryService.getQuote(quoteParams);

        if (quote.success && quote.deliveryCharge) {
          setDeliveryCharge(Math.round(quote.deliveryCharge));
          setAvailable(true);
          console.log("Delivery charge fetched:", quote.deliveryCharge);
        } else {
          console.warn("Failed to get delivery quote");
          setAvailable(false);
          setError("Delivery not available at this location");
          setDeliveryCharge(0);
        }
      } catch (err) {
        console.error("Error fetching delivery charge:", err);
        setAvailable(false);
        setError("Unable to fetch delivery charges. Please try again.");
        setDeliveryCharge(0);
      } finally {
        setLoading(false);
        setQuoteFetched(true);
      }
    };

    fetchDeliveryQuote();
  }, [orderType, restaurant, selectedAddress, user]);

  // Method to manually retry fetching quote
  const retryFetch = () => {
    fetchAttempted.current = false;
    setQuoteFetched(false);
  };

  return {
    deliveryCharge,
    loading,
    available,
    error,
    quoteFetched,
    retryFetch,
  };
};
