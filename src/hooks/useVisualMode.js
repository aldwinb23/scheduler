
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      // setHistory([...history, newMode]);
      setHistory(prev => ([...prev, newMode]))
    }
  }

  function back() {
    let arrHistory = [...history]; // 1 , 2, "3"
    if (arrHistory.length > 1) {
      setMode(() => arrHistory[(arrHistory.length - 1)]);  // 1, "2", 3
      arrHistory.pop() // 1, 2

    }
    setHistory(() => arrHistory); // 1, "2"
    // setHistory(prev => ([...prev, arrHistory]))

  }

  return { mode, transition, back };
}

