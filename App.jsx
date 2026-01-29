import React, { useState } from "react";
import Header from "./components/Header";
import SleepTable from "./components/SleepTable";
import Summary from "./components/Summary";
import { WEEK_TEMPLATE } from "./data/weekTemplate";
import "./styles/app.css";

function downloadSleepCSV(studentName, sleepData) {
  let rows = [["Student", "Day", "Bedtime", "Wake-up", "Hours Slept"]];
  Object.entries(sleepData).forEach(([day, entry]) => {
    rows.push([
      studentName || "Unknown",
      day,
      entry.bedtime || "",
      entry.wakeup || "",
      entry.hours || ""
    ]);
  });

  const csvContent =
    "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "weekly_sleep_log.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function App() {
  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const [studentName, setStudentName] = useState("");
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [sleepData, setSleepData] = useState(WEEK_TEMPLATE);

  return (
    <div className="app-container">
      <Header title="Weekly Sleep Log" subtitle="Track your sleep for one week" />

      <div style={{ marginBottom: 20 }}>
        <label>
          <strong>Student Name:</strong>{" "}
          <input
            type="text"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            placeholder="Last, First"
          />
        </label>
      </div>

      <div className="day-buttons">
        {DAYS.map(day => (
          <button
            key={day}
            className={selectedDay === day ? "active" : ""}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <SleepTable
        sleepData={sleepData}
        setSleepData={setSleepData}
        selectedDay={selectedDay}
      />

      <div className="summary-card">
        <Summary sleepData={sleepData} />
      </div>

      <button
        onClick={() => downloadSleepCSV(studentName, sleepData)}
        style={{ marginTop: 20 }}
      >
        Download Weekly Sleep Log (CSV)
      </button>
    </div>
  );
}
