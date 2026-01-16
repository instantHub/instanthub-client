import { useEffect, useState, useRef, ChangeEvent, FormEvent, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSliderByIdQuery, useUpdateSliderMutation } from "@api";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import { TSliderStatus } from "@features/api/slidersApi/types";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

export const UpdateSlider: FC = () => {
  const { sliderId } = useParams<{ sliderId: string }>();
  const navigate = useNavigate();

  // Fetch only the specific slider we need
  const { data: slider, isLoading: isSliderLoading } = useGetSliderByIdQuery(
    sliderId!
  );
  const [updateSlider, { isLoading: isUpdating }] = useUpdateSliderMutation();

  // State for the form fields
  const [status, setStatus] = useState<TSliderStatus>("Active");

  // State for the new image file and its preview
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Populate the form with existing slider data once it loads
  useEffect(() => {
    if (slider) {
      setStatus(slider.status);
      setPreview(`${import.meta.env.VITE_APP_BASE_URL}${slider.image}`);
    }
  }, [slider]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      // Create a temporary URL for the new image preview
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    // Revert preview to the original image from the server
    if (slider) {
      setPreview(`${import.meta.env.VITE_APP_BASE_URL}/${slider.image}`);
    }
    setNewImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("status", status);

    // Only append the image if a new one has been selected
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    try {
      await updateSlider({ sliderId: sliderId!, data: formData }).unwrap();
      toast.success("Slider updated successfully!");
      navigate(ROUTES.admin.createSlider);
    } catch (error) {
      toast.error("Failed to update slider.");
      console.error("Error: ", error);
    }
  };

  if (isSliderLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(ROUTES.admin.createSlider)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Sliders List
        </button>
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Update Slider
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Change the image or status of the slider.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: File Upload & Preview */}
            <div className="flex flex-col gap-4">
              <label className="font-medium text-gray-700">Slider Image</label>

              {preview ? (
                // --- Image Preview ---
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Slider preview"
                    className="w-full h-48 object-cover rounded-md border"
                  />
                  {newImageFile && ( // Only show remove button for the new image
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-all"
                      aria-label="Revert to original image"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              ) : (
                // --- Fallback if no image ---
                <div
                  className="flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                name="slider"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
              />
            </div>

            {/* Column 2: Status */}
            <div className="flex flex-col gap-4">
              <label htmlFor="status" className="font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as TSliderStatus)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t text-right">
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
