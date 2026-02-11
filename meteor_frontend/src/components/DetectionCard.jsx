export default function DetectionCard({ data }) {
  return (
    <div className="card">
      <h2>Meteor Detection Summary</h2>
      <p><strong>Frames detected:</strong> {data.frames_detected}</p>
      <p><strong>Average confidence:</strong> {data.avg_confidence}</p>
    </div>
  );
}
