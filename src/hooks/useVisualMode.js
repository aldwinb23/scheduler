
import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }
  
  function back() {
    let arrHistory = [...history];
    if (arrHistory.length > 1) {
      setMode((prev) => arrHistory[(arrHistory.length - 1)]);

    }
    arrHistory.pop()
    setHistory((prev) => arrHistory);
  }

  return { mode, transition, back };
}

