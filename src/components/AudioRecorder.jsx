import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Status from "./Status";
import Result from "./Result";

const assemblyAPI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: import.meta.env.VITE_API_KEY,
    "content-type": "application/json",
  },
});

const mimeType = "audio/webm";

const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef(null);

  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [stream, setStream] = useState(null);

  const [audio, setAudio] = useState([]);

  const [audioChunks, setAudioChunks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [transcript, setTranscript] = useState({ id: "" });

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio((audio) => [...audio, { url: audioUrl, blob: audioBlob }]);

      setAudioChunks([]);
    };
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      if (transcript.id && transcript.status !== "completed" && isLoading) {
        try {
          const { data: transcriptData } = await assemblyAPI.get(
            `/transcript/${transcript.id}`
          );
          setTranscript({ ...transcript, ...transcriptData });
        } catch (error) {
          console.error(error);
        }
      } else {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, transcript]);

  const handleRemoveAudio = (index) => {
    const updatedAudio = [...audio];
    updatedAudio.splice(index, 1);
    setAudio(updatedAudio);
  };
  const handleUploadAudio = async (index) => {
    const selectedAudio = audio[index]?.blob;
    setIsLoading(true);

    const { data: uploadResponse } = await assemblyAPI.post(
      "/upload",
      selectedAudio
    );
    const { data } = await assemblyAPI.post("/transcript", {
      audio_url: uploadResponse.upload_url,
      //features
      sentiment_analysis: true,
      entity_detection: true,
      iab_categories: true,
      speaker_labels: true,
    });
    setTranscript({ id: data.id });
  };

  return (
    <div>
      <div>
        {transcript.text && transcript.status === "completed" ? (
          <Result transcript={transcript} />
        ) : (
          <Status isLoading={isLoading} status={transcript.status} />
        )}
      </div>
      <h2>Audio Recorder</h2>
      <main>
        <div style={{ marginBottom: "20px" }}>
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio.length > 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {audio.map((aud, index) => (
              <div key={index} style={{ display: "flex", gap: "2rem" }}>
                <button type="button" onClick={() => handleUploadAudio(index)}>
                  Upload
                </button>

                <audio key={index} src={aud.url} controls></audio>

                <button type="button" onClick={() => handleRemoveAudio(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AudioRecorder;
