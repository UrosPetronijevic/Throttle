import { useState, useEffect, useRef } from "react";
import Throttling from "./utils/Throttling";

function App() {
  const [defMouseMove, setDefMouseMove] = useState(0);
  const [throttleMouseMove, setThrottleMouseMove] = useState(0);

  const throttledUpdate = useRef(
    Throttling(() => {
      setThrottleMouseMove((prev) => prev + 1);
    }, 1000)
  ).current;

  useEffect(() => {
    const handleMouseMove = () => {
      setDefMouseMove((prev) => prev + 1);
      throttledUpdate();
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [throttledUpdate]);
  return (
    <div className="text-cyan-300 min-h-screen p-4">
      <h1 className="text-2xl mb-4">Mouse Movement Tracking</h1>
      <p>Mouse movement default: {defMouseMove}</p>
      <p>Mouse movement throttling: {throttleMouseMove}</p>
      <p className="mt-4 text-sm text-gray-500">
        Move your mouse to see the counters update. The throttled counter will
        update every 1 second.
      </p>
    </div>
  );
}

export default App;
