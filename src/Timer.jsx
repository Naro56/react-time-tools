import { useState, useRef } from "react";

export default function Timer() {
  const [time, setTime] = useState(5 * 60 * 1000); 
  const [isRunning, setIsRunning] = useState(false);
  const [editableTime, setEditableTime] = useState("05:00.000"); 
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  function parseTime(str) {
    
    const [minSec, ms = "0"] = str.split(".");
    const [min = "0", sec = "0"] = minSec.split(":");
    const minutes = parseInt(min) || 0;
    const seconds = parseInt(sec) || 0;
    const milliseconds = parseInt(ms) || 0;
    return minutes * 60000 + seconds * 1000 + milliseconds;
  }

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
  }

  function pad(num) {
    return num.toString().padStart(2, "0");
  }
  function padMs(num) {
    return num.toString().padStart(3, "0");
  }

  function handleStart() {
    if (!isRunning) {
      
      const initialMs = parseTime(editableTime);
      setTime(initialMs);
      setIsRunning(true);

      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev - (Date.now() - startTimeRef.current);
          startTimeRef.current = Date.now();
          if (newTime <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return newTime;
        });
      }, 10);
    }
  }

  function handleStop() {
    setIsRunning(false);
      clearInterval(intervalRef.current);
      setEditableTime(formatTime(time)); 
  }

  function handleReset() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(5 * 60 * 1000);
    setEditableTime("05:00.000");
  }

  return (
    <div className="timer-div">
      
        {isRunning ? (
          <h2>{formatTime(time)}</h2>
        ) : (
          <input
            type="text"
            value={editableTime}
            onChange={(e) => setEditableTime(e.target.value)}
          />
        )}
      

      <div className="buttons-div">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
