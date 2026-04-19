// src/feature/Frames/AllFrames.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function AllFrames() {
  const frames = useSelector(state => state.frames.frames) || [];

  return (
    <main className="orders-page">
      <h1 className="orders-title">משקופים</h1>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>פרופיל</th>
              <th>רוחב</th>
              <th>גובה</th>
            </tr>
          </thead>
          <tbody>
            {frames.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.profile}</td>
                <td>{f.width}</td>
                <td>{f.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}