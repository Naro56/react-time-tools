import { useState } from "react";
import Time from "./Time";
import StopWatch from "./StopWatch";
import Timer from "./Timer"

function App() {
  const [activeTab, setActiveTab] = useState("clock"); // default show clock

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <button
          className={activeTab === "clock" ? "active" : ""}
          onClick={() => setActiveTab("clock")}
        >
          Clock
        </button>
        <button
          className={activeTab === "stopwatch" ? "active" : ""}
          onClick={() => setActiveTab("stopwatch")}
        >
          Stopwatch
        </button>
        <button
          className={activeTab === "timer" ? "active" : ""}
          onClick={() => setActiveTab("timer")}
        >
          Timer
        </button>
      </nav>

      {/* Conditional Rendering */}
      <div className="content">
        {activeTab === "clock" && <Time />}
        {activeTab === "stopwatch" && <StopWatch />}
        {activeTab ==="timer" && <Timer />}
      </div>
    </>
  );
}

export default App;
