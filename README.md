# AI-Driven Meteor Detection and Trajectory Prediction

An AI-powered computer vision system for detecting meteors from night-sky footage and predicting their trajectories using deep learning and computer vision techniques.


# Project Overview

This research project focuses on developing an intelligent meteor monitoring system capable of:

- Detecting meteors from sky footage using AI
- Predicting meteor trajectories in real time
- Processing astronomical video datasets
- Improving meteor analysis through computer vision techniques

The system combines deep learning, image preprocessing, and trajectory prediction methods to create an automated meteor analysis pipeline.

---

# Objectives

- Develop a meteor detection model using YOLOv8
- Predict meteor movement using trajectory estimation algorithms
- Reduce false positives from objects such as birds, planes, and satellites
- Build a preprocessing and annotation workflow for meteor datasets
- Evaluate the performance of meteor detection and prediction models

---

# Technologies Used

## Programming and AI

- Python
- PyTorch
- YOLOv8
- OpenCV

## Data Processing

- FFmpeg
- NumPy
- Pandas

## Annotation and Training

- Label Studio
- Google Colab

---

# Dataset

## NightSkyUCP Dataset

The project uses the NightSkyUCP meteor dataset for:

- Meteor video samples
- Non-meteor video samples
- Model training and validation
- Detection and trajectory analysis

The dataset contains real-world night-sky footage used to train and evaluate the AI model.

---

# System Workflow

```text
Raw Meteor Videos
        ↓
Frame Extraction (FFmpeg)
        ↓
Image Preprocessing (OpenCV)
        ↓
Meteor Detection (YOLOv8)
        ↓
Trajectory Prediction
(Kalman Filter / Regression)
        ↓
Visualization & Reporting


Core Features
Meteor Detection

Detect meteors from night-sky footage using YOLOv8 object detection.

Trajectory Prediction

Estimate meteor movement and future trajectory using:

Kalman Filter
Polynomial Regression
Data Preprocessing

Process raw videos through:

Frame extraction
Noise reduction
Brightness normalization
Visualization

Generate:

Bounding boxes
Detection overlays
Prediction paths
Reports and exports


Installation
Clone the Repository
git clone https://github.com/yourusername/meteor-detection-ai.git
cd meteor-detection-ai
Install Dependencies
pip install ultralytics
pip install opencv-python
pip install matplotlib
pip install numpy
pip install pandas
Install FFmpeg

Download FFmpeg from:

https://www.gyan.dev/ffmpeg/builds/

Verify installation:

ffmpeg -version
Frame Extraction

Example FFmpeg command:

ffmpeg -i meteor_video.mp4 -vf fps=5 frames/output_%04d.jpg
Dataset Annotation

This project uses Label Studio for image annotation.

Annotation workflow:

Import extracted frames
Draw bounding boxes around meteors
Export labels in YOLO format
Model Training

Train the YOLOv8 model using:

yolo detect train data=config.yaml model=yolov8n.pt epochs=50 imgsz=640
Evaluation Metrics
Detection Metrics
Precision
Recall
F1 Score
Mean Average Precision (mAP)
Trajectory Metrics
Root Mean Square Error (RMSE)
Mean Absolute Error (MAE)
Current Progress
Dataset collection completed
Frame extraction pipeline completed
FFmpeg preprocessing implemented
Annotation workflow prepared
YOLOv8 model training in progress
Trajectory prediction module under development
Future Improvements
Real-time meteor tracking
Web-based monitoring dashboard
Multi-camera trajectory estimation
Automated alert system
Improved detection accuracy
Research Contribution

This project contributes to:

AI-based meteor monitoring
Real-time trajectory prediction
Computer vision applications in astronomy
Automated space-event analysis systems
Author

Seleena Wrigge
BSc (Hons) Computer Science
Final Year Research Project

License

This project is developed for academic and research purposes.



