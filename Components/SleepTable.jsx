import React, { useEffect } from "react";

export default function SleepTable({ sleepData, setSleepData, selectedDay }) {

  const { bedtime, wakeup, hours } = sleepData[selectedDay];

  // Auto-calculate hours slept
  useEffect(() => {
    if (bedtime && wakeup) {
      const [bedHour, bedMin] = bedtime.split(":").map(Number);
      const [wakeHour, wakeMin] = wakeup.split(":").map(Number);

      let bedMinutes = bedHour * 60 + bedMin;
      let wakeMinutes = wakeHour * 60 + wakeMin;

      if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60;

      const calculatedHours = ((wakeMinutes - bedMinutes) / 60).toFixed(2);

      setSleepData(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          hours: calculatedHours
        }
      }));
    }
  }, [bedtime, wakeup, selectedDay, setSleepData]);

  const handleChange = (field, value) => {
    setSleepData(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [field]: value
      }
    }));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{selectedDay}</h3>
      <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
        <div>
          <label>Bedtime:</label>
          <input
            type="time"
            value={bedtime}
            onChange={e => handleChange("bedtime", e.target.value)}
          />
        </div>
        <div>
          <label>Wake-up:</label>
          <input
            type="time"
            value={wakeup}
            onChange={e => handleChange("wakeup", e.target.value)}
          />
        </div>
        <div>
          <label>Hours Slept:</label>
          <input
            type="number"
            value={hours}
            readOnly
            style={{ background: "#eee", cursor: "not-allowed" }}
          />
        </div>
      </div>
    </div>
  );
}
