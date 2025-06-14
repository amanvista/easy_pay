import { X } from "lucide-react";

const CategoryMenuModal = ({
  visible,
  categories,
  onClose,
  onSelectCategory,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 shadow-lg w-80 max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Menu Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category}>
              <button
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 transition-all"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenuModal;
