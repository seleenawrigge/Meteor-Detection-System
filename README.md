AI-Driven Meteor Detection and Trajectory Prediction using Computer Vision
Overview

This project focuses on the development of an AI-powered system capable of detecting meteors from night-sky video footage and predicting their trajectories in real time using computer vision and machine learning techniques.

The system combines:

YOLOv8 for meteor detection
Kalman Filter / Polynomial Regression for trajectory prediction
OpenCV + FFmpeg for preprocessing
Synthetic data generation using Stellarium and Blender
Real-world meteor datasets such as NightSkyUCP and NASA CAMS

The goal of this research is to improve meteor monitoring systems by providing accurate, automated, and scalable detection and prediction capabilities.

Features
Meteor detection from sky footage
Frame extraction and preprocessing
Real-time object detection using YOLOv8
Trajectory prediction and path estimation
Synthetic meteor data generation
Bounding box visualization
Detection confidence scoring
Exportable reports and prediction outputs
Dataset augmentation and annotation pipeline
Tech Stack
Category	Technology
Programming Language	Python
Deep Learning	PyTorch
Object Detection	YOLOv8
Computer Vision	OpenCV
Video Processing	FFmpeg
Annotation Tool	Label Studio
Development Environment	Google Colab / VS Code
Dataset	NightSkyUCP + Synthetic Data
Visualization	Matplotlib

Project Architecture

Raw Meteor Videos
        ↓
Frame Extraction (FFmpeg)
        ↓
Preprocessing (OpenCV)
        ↓
YOLOv8 Meteor Detection
        ↓
Trajectory Prediction
(Kalman Filter / Regression)
        ↓
Visualization & Reporting

Dataset
NightSkyUCP Dataset


Installation

Clone Repository
git clone https://github.com/yourusername/meteor-detection-ai.git
cd meteor-detection-ai

Install Dependencies

pip install ultralytics
pip install opencv-python
pip install matplotlib
pip install numpy
pip install pandas


Install FFmpeg
Windows

Download FFmpeg from:

FFmpeg Official Builds

Add the bin folder to Environment Variables.

Verify installation:

ffmpeg -version

Frame Extraction

Example FFmpeg command:

ffmpeg -i meteor_video.mp4 -vf fps=5 frames/output_%04d.jpg


Labeling Dataset

This project uses:

Label Studio

For annotation:

Import extracted frames
Draw bounding boxes around meteors
Export labels in YOLO format
Model Training

Train YOLOv8 model:

yolo detect train data=config.yaml model=yolov8n.pt epochs=50 imgsz=640
Trajectory Prediction

Trajectory prediction is performed using:

Kalman Filter
Polynomial Regression

Input:

Detected meteor coordinates (x, y, t)

Output:

Predicted meteor path
Future position estimation
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
Annotation workflow established
YOLOv8 training preparation in progress
Synthetic data pipeline under development
Future Improvements
Real-time live meteor tracking
Improved synthetic data realism
Multi-camera trajectory estimation
Automated alert system
Deployment as a web-based monitoring platform
Research Contribution

This research contributes to:

AI-driven meteor monitoring
Real-time trajectory prediction
Automated space-event analysis systems

Author

Seleena Wrigge
BSc (Hons) Computer Science
Final Year Research Project



