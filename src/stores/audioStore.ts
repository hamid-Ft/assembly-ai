import { createSelectors } from "./../utils/createSelector";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
type TAudioStore = {
  permission: boolean;
  recordingStatus: "inactive" | "recording";
  stream: MediaStream;
  // audio: { url: string; blob: Blob[] }[];
  // audioChunks: Blob[];
  // isLoading: boolean;
  // transcript: any;

  getMicrophonePermission: () => void;
  startRecording: () => void;
  // stopRecording: () => void;
  // handleRemoveAudio: () => void;
  // handleUploadAudio: () => void;
};

export const useAudioStore = createSelectors(
  create<TAudioStore>()(
    immer((set, get) => ({
      permission: false,
      recordingStatus: "inactive",
      stream: new MediaStream(),
      getMicrophonePermission: () => async () => {
        if ("MediaRecorder" in window) {
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            set({
              permission: true,
              stream: mediaStream,
            });
          } catch (err) {
            alert(err.message);
          }
        } else {
          alert("The MediaRecorder API is not supported in your browser.");
        }
      },
      startRecording: () => {
        set({ recordingStatus: "recording" });
        const media = new MediaRecorder(get().stream, {
          mimeType: "audio/webm",
        });
        // mediaRecorder.current = media;
        // mediaRecorder.current.start();
      },
    }))
  )
);
