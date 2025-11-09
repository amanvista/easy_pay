import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * OrderFilterBar - Filter and sort controls for order history
 */
const OrderFilterBar = ({ onFilterChange, onSortChange, activeFilter, activeSort }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'past', label: 'Past' },
    { key: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { key: 'newest', label: 'Newest → Oldest' },
    { key: 'oldest', label: 'Oldest → Newest' },
    { key: 'amount-high', label: 'Amount (High → Low)' },
    { key: 'amount-low', label: 'Amount (Low → High)' }
  ];

  const handleSortSelect = (sortKey) => {
    onSortChange(sortKey);
    setShowSortDropdown(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.label}
              {activeFilter === filter.key && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            <span>Sort: {sortOptions.find(opt => opt.key === activeSort)?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showSortDropdown && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[60]"
                onClick={() => setShowSortDropdown(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-[70] overflow-hidden"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSortSelect(option.key)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                      activeSort === option.key ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFilterBar;