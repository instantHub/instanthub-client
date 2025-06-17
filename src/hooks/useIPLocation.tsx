import { useEffect, useState } from "react";
import { slugify } from "@utils/general";

interface ILocation {
  city: string;
  region: string;
}

interface IIPLocationReturnType {
  location: ILocation;
  error: string;
  loading: boolean;
}

export const useIPLocation = (): IIPLocationReturnType => {
  const [location, setLocation] = useState<ILocation>({
    city: "",
    region: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectAndRedirect = async () => {
      try {
        setLoading(true);
        // https://ipinfo.io/dashboard/token
        const res = await fetch(
          `https://ipinfo.io/json?token=${
            import.meta.env.VITE_IP_LOCATION_TOKEN
          }`
        );
        const data = await res.json();

        const city = slugify(data.city || "bangalore");

        const region = slugify(data.region || "karnataka");

        setLocation({ city, region });
        localStorage.setItem("location", city);
        setLoading(false);
      } catch (err) {
        console.error("Location detection failed:", err);
        setError("Error fetching location!");
        setLoading(false);
      }
    };
    detectAndRedirect();
  }, []);

  return { location, error, loading };
};
