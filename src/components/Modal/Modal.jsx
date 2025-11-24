import { X } from "lucide-react";

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-8 mb-8">
    <div className="bg-white rounded-2xl p-6 relative w-full max-w-md shadow-xl">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <div className="pt-2">{children}</div>
    </div>
  </div>
);

export default Modal;
