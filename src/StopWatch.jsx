import { useState, useRef } from "react";

export default function StopWatch() {
  const [elapsed, setElapsed] = useState(0); // elapsed time in ms
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  function handleStart() {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsed; 
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 25); // update every 25ms
    }
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setElapsed(0);
  }

  function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMs(
      milliseconds
    )}`;
  }

  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  function padMs(num) {
    return num.toString().padStart(3, "0"); 
  }

  return (
    <div className="stopwatch-div">
      <h2>{formatTime(elapsed)}</h2>
      <div className="buttons-div">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
