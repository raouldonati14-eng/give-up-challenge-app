import React from "react";

export default function StudentInfo({ studentName, setStudentName }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        <strong>Student Name:</strong>{" "}
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          placeholder="Last, First"
          style={{ marginLeft: 10 }}
        />
      </label>
    </div>
  );
}