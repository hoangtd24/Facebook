import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [param, setParam] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setParam(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return param;
}

export default useDebounce;
