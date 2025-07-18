import { CloseIcon } from "@icons";
import { FC } from "react";

export const MobileNav: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-4">
          <button onClick={onClose} className="float-right p-2">
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="clear-both pt-8">
            <nav className="space-y-6">
              <a
                href="#"
                className="block text-gray-700 hover:text-orange-500 transition-colors text-lg font-medium"
              >
                Kitchen
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-orange-500 transition-colors text-lg font-medium"
              >
                Bedroom
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-orange-500 transition-colors text-lg font-medium"
              >
                Living Room
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-orange-500 transition-colors text-lg font-medium"
              >
                Storage
              </a>
            </nav>
            <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors mt-8">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
