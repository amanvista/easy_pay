import { Home, Briefcase, MapPin, Edit2, Trash2 } from 'lucide-react';

/**
 * AddressCard component displays a saved address with select, edit, and delete actions
 */
const AddressCard = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  // Get icon based on label
  const getIcon = () => {
    switch (address.label.toLowerCase()) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  // Get icon color based on label
  const getIconColor = () => {
    switch (address.label.toLowerCase()) {
      case 'home':
        return 'text-blue-600 bg-blue-50';
      case 'work':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all duration-200 active:scale-[0.98] sm:hover:scale-[1.01] ${
        isSelected
          ? 'border-orange-500 shadow-lg shadow-orange-100 ring-2 ring-orange-200'
          : 'border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`p-2 rounded-lg ${getIconColor()} flex-shrink-0`}
        >
          {getIcon()}
        </div>

        {/* Address Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {address.label}
            </h3>
            {isSelected && (
              <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-50 rounded-full">
                Selected
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-1">
            {address.addressLine}, {address.city} - {address.pincode}
          </p>
          <p className="text-sm text-gray-600 mb-2">Phone: {address.phone}</p>
          {address.note && (
            <p className="text-sm text-gray-500 italic mb-3">
              📝 {address.note}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
            {!isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
                className="w-full sm:flex-initial sm:px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors"
              >
                Deliver Here
              </button>
            )}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="flex-1 sm:flex-initial sm:px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4 flex-shrink-0" />
                <span>Edit</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="flex-1 sm:flex-initial sm:px-4 py-2.5 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 active:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4 flex-shrink-0" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;

