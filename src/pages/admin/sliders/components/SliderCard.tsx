import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteSliderMutation } from "@api";
import { generatePathWithParams } from "@utils/general";
import { ROUTES } from "@routes";
import { Pencil, Trash2 } from "lucide-react";
import { ISlider } from "@features/api/slidersApi/types";

export const SliderCard = ({ slider }: { slider: ISlider }) => {
  const navigate = useNavigate();
  const [deleteSlider, { isLoading: isDeleting }] = useDeleteSliderMutation();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        const result = await deleteSlider(slider._id).unwrap();
        toast.success(result.message || "Slider deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete slider.");
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    navigate(ROUTES.admin.updateSlider.replace(":sliderId", slider._id));
  };

  const statusColor =
    slider.status === "Active"
      ? "bg-green-500 text-white"
      : "bg-yellow-500 text-white";

  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
      onClick={() =>
        navigate(ROUTES.admin.updateSlider.replace(":sliderId", slider._id))
      }
    >
      <img
        src={`${import.meta.env.VITE_APP_BASE_URL}${slider.image}`}
        alt={slider.status}
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay for better text readability and actions */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Status Badge */}
      <div
        className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}
      >
        {slider.status}
      </div>

      {/* Action Buttons (visible on hover) */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleEdit}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Edit Slider"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-400"
          aria-label="Delete Slider"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
