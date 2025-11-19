import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Package, Clock } from "lucide-react";
import orderService from "../../services/orderService";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const statusLabels = {
    1: { label: "Order Placed", color: "bg-yellow-100 text-yellow-800" },
    2: { label: "Accepted", color: "bg-blue-100 text-blue-800" },
    3: { label: "Preparing", color: "bg-purple-100 text-purple-800" },
    4: { label: "Ready", color: "bg-green-100 text-green-800" },
    5: { label: "Picked Up", color: "bg-gray-100 text-gray-800" },
    6: { label: "Cancelled", color: "bg-red-100 text-red-800" },
    7: { label: "Rejected", color: "bg-red-100 text-red-800" },
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  const fetchOrders = async () => {
    if (!hasMore && page > 1) return;
    
    setLoading(true);
    try {
      const response = await orderService.getUserOrders(page, 10);
      const newOrders = response.data.orders || [];
      
      if (page === 1) {
        setOrders(newOrders);
      } else {
        setOrders((prev) => [...prev, ...newOrders]);
      }
      
      setHasMore(page < (response.data.totalPages || 1));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500">View your order history</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start ordering delicious food!</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusId = order.order_status_id || order.orderStatusId || 1;
              const status = statusLabels[statusId] || statusLabels[1];
              const orderCode = order.order_code || order.orderCode || "N/A";
              const finalAmount = order.final_amount || order.finalAmount || 0;
              const createdAt = order.created_at || order.createdAt;
              const restaurantName = order.restaurant_name || order.restaurantName || "Restaurant";
              const orderItems = order.order_items || order._order_items || [];

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/order-tracking/${order.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{restaurantName}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Order #{orderCode}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{parseFloat(finalAmount).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {orderItems.length} item{orderItems.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {orderItems.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {orderItems.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1 text-xs whitespace-nowrap">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-6 h-6 rounded object-cover"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          )}
                          <span className="text-gray-700">
                            {item.quantity}× {item.name}
                          </span>
                        </div>
                      ))}
                      {orderItems.length > 3 && (
                        <span className="text-xs text-gray-500 self-center">
                          +{orderItems.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="text-sm text-orange-600 font-medium hover:text-orange-700">
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}

            {loading && orders.length > 0 && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}

            <div ref={observerTarget} className="h-4" />

            {!hasMore && orders.length > 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                No more orders to load
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
