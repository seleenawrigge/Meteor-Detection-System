export default function VideoPanel({ videoURL }) {
  if (!videoURL) return null;

  return (
    <div className="video-box">
      <video src={videoURL} controls width="100%" />
    </div>
  );
}
