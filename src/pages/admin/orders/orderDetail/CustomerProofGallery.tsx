import React from "react";
import { Download, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";

interface CustomerProofGalleryProps {
  proofs: {
    front?: string;
    back?: string;
    optional1?: string;
    optional2?: string;
  };
  customerName: string;
}

export const CustomerProofGallery: React.FC<CustomerProofGalleryProps> = ({
  proofs,
  customerName,
}) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${imageName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const images = [
    { url: proofs.front, label: "ID Front", name: "customer-id-front" },
    { url: proofs.back, label: "ID Back", name: "customer-id-back" },
    { url: proofs.optional1, label: "Optional 1", name: "optional-proof-1" },
    { url: proofs.optional2, label: "Optional 2", name: "optional-proof-2" },
  ].filter((img) => img.url);

  return (
    <div className="bg-white rounded-lg border-2 border-blue-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b">
        <div className="p-2 bg-gray-100 rounded-lg">
          <ImageIcon className="text-gray-700" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Customer ID Proofs
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col gap-2">
            <p className="text-xs text-gray-500 font-medium">{image.label}</p>
            <div className="relative group">
              <img
                src={`${BASE_URL}${image.url}`}
                alt={image.label}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                loading="lazy"
              />
              <button
                onClick={() =>
                  downloadImage(
                    `${BASE_URL}${image.url}`,
                    `${customerName}-${image.name}`
                  )
                }
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
              >
                <Download className="text-white" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
