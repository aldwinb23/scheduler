
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory(prev => ([...prev, newMode]))
    }
  }

  function back() {
    let arrHistory = [...history];
    if (arrHistory.length > 1) {
      setMode(() => arrHistory[(arrHistory.length - 1)]);
      arrHistory.pop()

    }
    setHistory(() => arrHistory);
    
  }

  return { mode, transition, back };
}

