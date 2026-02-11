import { useState } from "react";
import VideoPanel from "./components/VideoPanel";
import AlertPanel from "./components/AlertPanel";
import TrendChart from "./components/TrendChart";
import DetectionCard from "./components/DetectionCard";
import "./styles.css";
import shootingStarBg from "./assets/shootingstarbg.mp4";

export default function App() {
  const [detection, setDetection] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [progress, setProgress] = useState(0);

  async function analyzeVideo(file) {
    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);
    setProgress(10);
    setDetection(null);
    setProcessedVideo(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 5;
      });
    }, 400);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      clearInterval(interval);
      setProgress(100);

      setDetection(data);

      // 🔥 IMPORTANT: backend must return video_url
      if (data.video_url) {
        setProcessedVideo(data.video_url);
      }

    } catch (err) {
      console.error("Error analyzing video:", err);
      clearInterval(interval);
    }

    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 800);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile) {
      analyzeVideo(videoFile);
    }
  };

  return (
    <>
      {/* 🎥 Background Video */}
      <video autoPlay muted loop id="bg-video">
        <source src={shootingStarBg} type="video/mp4" />
      </video>

      <div className="overlay">
        <div className="container">
          <h1>Meteor Detection & Trajectory Trend System</h1>

          <form onSubmit={handleSubmit} className="upload-section">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Analyze Video"}
            </button>
          </form>

          {loading && (
            <div className="progress-container">
              <p className="loading">Analyzing video... {progress}%</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {detection && (
            <>
              <AlertPanel alertLevel={detection.alert_level} />

              <div className="grid">
                {/* 🔥 Correct prop passing */}
                <VideoPanel videoURL={processedVideo} />

                <DetectionCard data={detection} />

                <TrendChart
                  trend={detection.trend}
                  deltaY={detection.delta_y}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
