// src/hooks/useCashfreeCheckout.js
import { useEffect, useRef, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

export default function useCashfreeCheckout({ mode = "sandbox" } = {}) {
  const cashfreeRef = useRef(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  // Initialize SDK once
  useEffect(() => {
    const initializeSDK = async () => {
      cashfreeRef.current = await load({ mode });
      setIsSDKLoaded(true);
    };
    initializeSDK();
  }, [mode]);

  // Function to start checkout
  const startCheckout = ({ paymentSessionId, redirectTarget = "_self" }) => {
    if (!isSDKLoaded || !cashfreeRef.current) {
      throw new Error("Cashfree SDK not loaded yet");
    }
    if (!paymentSessionId) {
      throw new Error("paymentSessionId is required");
    }

    cashfreeRef.current.checkout({
      paymentSessionId,
      redirectTarget,
    });
  };

  return { startCheckout, isSDKLoaded };
}
