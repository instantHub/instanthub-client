import { useState } from "react";
import { Button } from "@components/general";
import { formatDate } from "@utils/general";
import {
  CheckCircleIcon,
  CheckIcon,
  ClipboardIcon,
  MailIcon, // Added
  CalendarCheckIcon, // Added
  SmartphoneIcon, // Added
  AlertTriangleIcon, // Added
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import Link
import { IOrder } from "@features/api/orders/types";

/**
 * A "Thank You" page component shown after a customer
 * books an order to sell their gadget.
 */
export const OrderConfirmationPage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { state } = useLocation();

  const bookedOrder: IOrder | undefined = state?.bookedOrder;
  //   console.log("bookedOrder from state:", bookedOrder);

  /**
   * Handles copying the order ID to the clipboard.
   */
  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard
      .writeText(orderId)
      .then(() => {
        setIsCopied(true);
        // Reset the "Copied" status after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  // --- 🛑 CRITICAL: Handle Missing State ---
  // This renders if the user refreshes the page or arrives without state
  if (!bookedOrder) {
    return (
      <div className="w-full flex min-h-[50vh] items-center justify-center bg-gray-5 p-4">
        <div className="max-w-md rounded-xl bg-white p-8 shadow-xl text-center">
          <AlertTriangleIcon className="mx-auto h-16 w-16 text-yellow-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Order Details Not Found
          </h1>
          <p className="mt-2 text-gray-600">
            We couldn't find your order details. This can happen if you
            refreshed the page.
          </p>
          <Link to="/">
            <Button variant="instanthub" className="mt-8 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- De-structure for cleaner code ---
  const { orderId, schedulePickUp, customerDetails } = bookedOrder;
  const customerEmail = customerDetails?.email || "your email";
  const pickupDate = schedulePickUp?.date;

  return (
    // Use bg-gray-50 for a softer background
    // Add more padding on desktop, less on mobile
    <div className="w-full flex lg:min-h-screen items-start justify-center bg-gray- p-4 pt-4 sm:items-center">
      {/* Increased max-width for a slightly wider card on desktop */}
      <div className="max-w-lg rounded-xl bg-white p-6 shadow- sm:p-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thank You!
          </h1>
          <p className="mt-2 text-lg leading-7 text-gray-600">
            Your order to sell your gadget is confirmed.
          </p>
        </div>

        {/* --- Order ID with Copy Button (Redesigned) --- */}
        <div className="mt-8 sm:mt-10">
          <p className="text-center text-sm font-medium text-gray-500">
            Your Order ID
          </p>
          <div className="relative mt-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xl font-mono font-medium text-gray-900">
                {orderId}
              </span>
              <button
                onClick={() => handleCopyOrderId(orderId)}
                title="Copy Order ID"
                className="relative rounded-md p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isCopied ? (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <ClipboardIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* "Copied!" tooltip */}
            {isCopied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* --- Next Steps (Redesigned) --- */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            What happens next?
          </h3>
          {/* Use a list with icons for better scannability */}
          <ul className="mt-4 space-y-3 rounded-lg border border-gray-100 bg-gray-50/70 p-4 text-gray-600">
            <li className="flex items-start">
              <MailIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
              <span className="ml-3">
                We've sent a confirmation email to
                <strong className="font-semibold text-gray-800">
                  {" "}
                  {customerEmail}
                </strong>
                .
              </span>
            </li>
            <li className="flex items-start">
              <CalendarCheckIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
              <span className="ml-3">
                Your pickup is scheduled for
                <strong className="font-semibold text-gray-800">
                  {" "}
                  {formatDate(pickupDate)}
                </strong>
                .
              </span>
            </li>
            <li className="flex items-start">
              <SmartphoneIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
              <span className="ml-3">
                Our team will contact you to inspect the device and complete the
                pickup.
              </span>
            </li>
          </ul>
        </div>

        {/* --- CTA Button (Use Link for SPA navigation) --- */}
        <Link to="/" className="mt-10 block w-full">
          <Button variant="instanthub" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
