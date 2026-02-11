from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import tempfile
import os
import time
import uuid

# -----------------------
# 1️⃣ Setup Flask
# -----------------------
app = Flask(__name__)
CORS(app)

PROCESSED_FOLDER = "processed"
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# -----------------------
# 2️⃣ Load YOLO Model
# -----------------------
MODEL_PATH = "model/best.pt"

print("Loading YOLO model...")
model = YOLO(MODEL_PATH)
model.to("cpu")
print("Model loaded successfully.")

# -----------------------
# 3️⃣ Analyze Route
# -----------------------
@app.route("/analyze", methods=["POST"])
def analyze_video():
    print("Analyze endpoint hit")

    if "video" not in request.files:
        return jsonify({"error": "No video provided"}), 400

    file = request.files["video"]

    # Save uploaded file temporarily
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    file.save(temp.name)

    cap = cv2.VideoCapture(temp.name)

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25

    output_filename = f"output_{uuid.uuid4().hex}.mp4"
    output_path = os.path.join(PROCESSED_FOLDER, output_filename)

    # IMPORTANT: mp4v works on Windows
    fourcc = cv2.VideoWriter_fourcc(*"avc1")

    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    centroids = []
    confidences = []

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            results = model(frame, conf=0.5, device="cpu", verbose=False)

            # Draw bounding boxes
            annotated = results[0].plot()
            out.write(annotated)

            if results[0].boxes is not None and len(results[0].boxes) > 0:
                best_box = max(results[0].boxes, key=lambda b: float(b.conf[0]))
                x1, y1, x2, y2 = best_box.xyxy[0].cpu().numpy()
                cy = float((y1 + y2) / 2)
                centroids.append(cy)
                confidences.append(float(best_box.conf[0]))

    finally:
        cap.release()
        out.release()
        cv2.destroyAllWindows()
        time.sleep(0.2)

        try:
            os.remove(temp.name)
        except:
            print("Temp cleanup warning")

    # -----------------------
    # Trend + Alert Logic
    # -----------------------
    if len(centroids) < 2:
        return jsonify({
            "frames_detected": len(centroids),
            "avg_confidence": 0,
            "trend": "none",
            "delta_y": 0,
            "alert_level": "NONE",
            "video_url": f"http://localhost:5000/processed/{output_filename}"
        })

    movement = sum(
        centroids[i] - centroids[i - 1]
        for i in range(1, len(centroids))
    )

    delta_y = float(movement)
    avg_conf = float(sum(confidences) / len(confidences))

    if delta_y > 5:
        trend = "downward"
    elif delta_y < -5:
        trend = "upward"
    else:
        trend = "stable"

    alert = "NONE"
    if len(centroids) >= 3 and avg_conf >= 0.5:
        alert = "INFO"
    if len(centroids) >= 5 and avg_conf >= 0.6 and trend != "stable":
        alert = "TREND"
    if len(centroids) >= 8 and avg_conf >= 0.7 and trend == "downward":
        alert = "HIGH"

    return jsonify({
        "frames_detected": len(centroids),
        "avg_confidence": round(avg_conf, 3),
        "trend": trend,
        "delta_y": round(delta_y, 2),
        "alert_level": alert,
        "video_url": f"http://localhost:5000/processed/{output_filename}"
    })


# -----------------------
# 4️⃣ Serve Processed Video
# -----------------------
@app.route("/processed/<filename>")
def serve_video(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)


# -----------------------
# 5️⃣ Run Server
# -----------------------
if __name__ == "__main__":
    app.run(debug=True)
