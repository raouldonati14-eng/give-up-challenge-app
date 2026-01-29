import React from "react";

export default function Summary({ sleepData }) {
  const totalHours = Object.values(sleepData).reduce((sum, day) => {
    const hours = parseFloat(day.hours);
    return sum + (isNaN(hours) ? 0 : hours);
  }, 0);

  const nights = Object.values(sleepData).filter(day => day.hours !== "").length;
  const avgHours = nights ? totalHours / nights : 0;

  let color = "#000";
  if (avgHours >= 7 && avgHours <= 9) color = "green";
  else if ((avgHours >= 5 && avgHours < 7) || (avgHours > 9 && avgHours <= 10)) color = "orange";
  else if (avgHours < 5 || avgHours > 10) color = "red";

  return (
    <div style={{ marginTop: 30, padding: 15, border: "1px solid #ccc", borderRadius: 8, background: "#fafafa" }}>
      <h3>Weekly Sleep Summary</h3>
      <p>Total Hours Slept: {totalHours}</p>
      <p>
        Average per Night: <span style={{ fontWeight: "bold", color }}>{avgHours.toFixed(2)}</span>
      </p>
    </div>
  );
}
