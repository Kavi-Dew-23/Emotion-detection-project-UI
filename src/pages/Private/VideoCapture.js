import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const VideoCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/models/emotion_detection_model.json");
        setModel(loadedModel);
      } catch (error) {
        console.error("Failed to load model: ", error);
      }
    };

    const startStream = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    loadModels();
    startStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    const detectFaces = async () => {
      if (videoRef.current && videoRef.current.readyState === 4 && model) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);

        const inputTensor = tf.browser.fromPixels(imageData).resizeBilinear([224, 224]).expandDims(0).div(255.0);
        const predictions = await model.predict(inputTensor).data();
        
        const emotions = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];
        const maxIndex = predictions.indexOf(Math.max(...predictions));
        const emotion = emotions[maxIndex];


        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        context.font = "24px Arial";
        context.fillStyle = "red";
        context.fillText(`Emotion: ${emotion}`, 50, 50);
        };
      }
       

    let interval;
    if (videoRef.current) {
      videoRef.current.addEventListener("play", () => {
        interval = setInterval(detectFaces, 100);
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, [model]);

  const startRecording = () => {
    if (stream) {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          setVideoBlob(event.data);
        }
      };
      recorder.onstop = () => {
        console.log("Recording stopped");
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">Video Capture</h1>
      <div className="relative w-full max-w-md">
        <video ref={videoRef} width={500} height={500} autoPlay muted className="mb-4" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: 'transparent' }} />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={recording}
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-500 text-white rounded"
          disabled={!recording}
        >
          Stop Recording
        </button>
      </div>
      {videoBlob && (
        <video
          src={URL.createObjectURL(videoBlob)}
          controls
          autoPlay
          loop
          className="mt-4 w-full max-w-md"
        ></video>
      )}
    </div>
  );
};

export default VideoCapture;