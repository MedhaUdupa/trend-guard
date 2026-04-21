import { useEffect, useState } from "react";

export function useLiveData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/trends";
        const url = `${base}${endpoint}`;
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);  // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [endpoint]);

  return { data, loading };
}
