import { useEffect, useRef, useState } from "react";

export function useLiveData(endpoint) {
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    const base = import.meta.env.VITE_WS_URL || "ws://localhost:8000";
    const url = `${base}${endpoint}`;
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);
    ws.current.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData((prev) => [parsed, ...prev].slice(0, 100));
      } catch {
        // Ignore malformed messages.
      }
    };

    return () => ws.current?.close();
  }, [endpoint]);

  return { data, connected };
}
