import {
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  FC,
  useCallback,
} from "react";
import { SlidersList } from "./SlidersList";
import { useCreateSliderMutation } from "@api";
import { toast } from "react-toastify";

// For a better UX, let's add some icons.
// You can use any icon library, lucide-react is a great choice.
// npm install lucide-react
import { UploadCloud, X } from "lucide-react";

type SliderStatus = "Active" | "Block";

export const CreateSlider: FC = () => {
  const [sliderImage, setSliderImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<SliderStatus>("Active");

  const [createSlider, { isLoading }] = useCreateSliderMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSliderImage(file);
      // Create a temporary URL for the preview
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = useCallback(() => {
    if (preview) {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(preview);
    }
    setSliderImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [preview]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sliderImage) {
      toast.error("Please select an image for the slider.");
      return;
    }

    const formData = new FormData();
    formData.append("slider", sliderImage);
    formData.append("status", status);

    try {
      await createSlider(formData).unwrap();
      toast.success("Slider created successfully!");
      removeImage(); // Reset the form completely
    } catch (error) {
      toast.error("Failed to create slider.");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white border rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Create Slider
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload an image and set its status to add it to the carousel.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: File Upload & Preview */}
            <div className="flex flex-col gap-4">
              <label className="font-medium text-gray-700">Slider Image</label>

              {preview && sliderImage ? (
                // --- Image Preview ---
                <div className="relative group">
                  <img
                    src={preview}
                    alt={sliderImage.name}
                    className="w-full h-48 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 group-hover:opacity-100 opacity-0 transition-opacity"
                    aria-label="Remove image"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                // --- Custom File Input ---
                <div
                  className="flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="slider"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                  />
                </div>
              )}
            </div>

            {/* Column 2: Status and Actions */}
            <div className="flex flex-col gap-4">
              <label htmlFor="status" className="font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as SliderStatus)}
              >
                <option value="Active">Active</option>
                <option value="Block">Block</option>
              </select>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t text-right">
            <button
              type="submit"
              disabled={isLoading || !sliderImage}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Slider"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12">
        <SlidersList />
      </div>
    </div>
  );
};
