import React, { useState } from "react";

export default function SleepEntry({ day, weeklyLog, setWeeklyLog }) {
  const [sleepStart, setSleepStart] = useState(weeklyLog[day].sleepStart);
  const [sleepEnd, setSleepEnd] = useState(weeklyLog[day].sleepEnd);
  const [quality, setQuality] = useState(weeklyLog[day].quality);

  const handleSubmit = e => {
    e.preventDefault();
    setWeeklyLog(prev => ({
      ...prev,
      [day]: { sleepStart, sleepEnd, quality }
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>{day}</h3>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <label>
          Sleep Start:
          <input type="time" value={sleepStart} onChange={e => setSleepStart(e.target.value)} />
        </label>
        <label>
          Sleep End:
          <input type="time" value={sleepEnd} onChange={e => setSleepEnd(e.target.value)} />
        </label>
        <label>
          Quality:
          <select value={quality} onChange={e => setQuality(e.target.value)}>
            <option value="">Select</option>
            <option value="Poor">Poor</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}