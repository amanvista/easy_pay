export function calculateFromGSTPercent(totalAmount, gstPercent) {
    const basePrice = totalAmount / (1 + gstPercent / 100);
    const gstAmount = totalAmount - basePrice;
  
    return {
      basePrice: basePrice.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      gstPercent: gstPercent + "%"
    };
  }
  
  // Example:
//   const result = calculateFromGSTPercent(195, 18);
//   console.log(result);
  // Output: { basePrice: "165.25", gstAmount: "29.75", gstPercent: "18%" }
  