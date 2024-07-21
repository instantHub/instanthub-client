import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timerOut);
  }, [value, delay]);

  return debounceValue;
};

export const useDebounceFunc = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);
  console.log("inside useDebouceFunc");
  useEffect(() => {
    const timerOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timerOut);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
