import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mockOrders } from '../../data/mockOrders';
import OrderFilterBar from '../../components/OrderFilterBar/OrderFilterBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';

/**
 * OrderHistoryPage - Complete order history with filtering and sorting
 */
const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter orders based on active filter
  useEffect(() => {
    let filtered = [...orders];

    switch (activeFilter) {
      case 'ongoing':
        filtered = orders.filter(order => order.status === 'In Progress');
        break;
      case 'past':
        filtered = orders.filter(order => order.status === 'Delivered');
        break;
      case 'cancelled':
        filtered = orders.filter(order => order.status === 'Cancelled');
        break;
      default:
        filtered = orders;
    }

    setFilteredOrders(filtered);
  }, [orders, activeFilter]);

  // Sort orders based on active sort
  useEffect(() => {
    let sorted = [...filteredOrders];

    switch (activeSort) {
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-high':
        sorted.sort((a, b) => b.total - a.total);
        break;
      case 'amount-low':
        sorted.sort((a, b) => a.total - b.total);
        break;
      default: // newest
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredOrders(sorted);
  }, [activeSort, activeFilter, orders]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort) => {
    setActiveSort(sort);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleReorder = (order) => {
    // Simulate reorder API call
    toast.success(`Reordering from ${order.restaurant}...`, {
      position: 'top-right',
      autoClose: 2000,
    });
    
    // Navigate to restaurant menu or cart
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  const handleRateOrder = (order) => {
    // Simulate rating submission
    const rating = Math.floor(Math.random() * 2) + 4; // Random rating 4-5
    
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === order.id ? { ...o, rating } : o
      )
    );
    
    toast.success(`Thank you for rating ${order.restaurant}!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-sm text-gray-600">
                {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter and Sort Bar */}
        <OrderFilterBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          activeFilter={activeFilter}
          activeSort={activeSort}
        />

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredOrders.map((order) => (
              <motion.div key={order.id} variants={itemVariants}>
                <OrderCard
                  order={order}
                  onViewDetails={handleViewDetails}
                  onReorder={handleReorder}
                  onRateOrder={handleRateOrder}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilter === 'all' 
                ? "You haven't placed any orders yet."
                : `No ${activeFilter} orders found.`
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
            >
              Start Ordering
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        onReorder={handleReorder}
      />
    </div>
  );
};

export default OrderHistoryPage;