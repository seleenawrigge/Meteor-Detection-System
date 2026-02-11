export default function TrendChart({ trend, deltaY }) {
  return (
    <div className="trend-box">
      <h3>Trajectory Trend</h3>
      <p><strong>Direction:</strong> {trend}</p>
      <p><strong>Vertical Displacement:</strong> {deltaY}px</p>
    </div>
  );
}
