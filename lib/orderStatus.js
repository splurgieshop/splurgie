export const ORDER_STAGES = [
  { key: "placed", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export function getOrderStageIndex(createdAt) {
  if (!createdAt) return 2;
  const hours = (Date.now() - new Date(createdAt).getTime()) / 3600000;
  if (hours < 0.5) return 1;  // Processing
  if (hours < 24) return 2;   // Shipped
  if (hours < 48) return 3;   // Out for Delivery
  return 4;                    // Delivered
}

export function getOrderStatus(createdAt) {
  return ORDER_STAGES[getOrderStageIndex(createdAt)].label;
}
