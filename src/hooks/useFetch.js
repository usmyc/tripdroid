import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, signal);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setLoading(false);
        setData(json);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setLoading(false);
          setError("could not fetch the data");
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, loading, error };
}
