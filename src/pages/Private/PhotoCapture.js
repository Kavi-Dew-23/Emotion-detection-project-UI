/*import React, { useEffect, useRef } from "react";

const VideoCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  }, []);

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">Video Capture</h1>
      <video ref={videoRef} autoPlay className="mb-4 w-full max-w-md"></video>
      <button
        onClick={capturePhoto}
        className="px-4 py-2 mb-4 bg-[#2A2B27] text-white rounded"
      >
        Capture Video
      </button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        className="hidden"
      ></canvas>
    </div>
  );
};
export default VideoCapture;

/*
VideoCapture.js
import React, { useEffect, useRef, useState } from "react";

const VideoCapture = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  useEffect(() => {
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

    startStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
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
      <video ref={videoRef} width={500} height={500} autoPlay controls className="mb-4" />
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
*/