import { create } from 'zustand';
import { Transcript } from './types/transcript';

type State = {
    permission: boolean;
    recordingStatus: string;
    stream: MediaStream;
    audio: { url: string; blob: Blob }[];
    audioChunks: Blob[];
    isLoading: boolean;
    transcript: Transcript;
    setPermission: (value: boolean) => void;
    setRecordingStatus: (value: string) => void;
    setStream: (value: MediaStream) => void;
    setAudio: (value: { url: string; blob: Blob }[]) => void;
    setAudioChunks: (value: Blob[]) => void;
    setIsLoading: (value: boolean) => void;
    setTranscript: (value: Transcript) => void;
};

export default create<State>(set => ({
    permission: false,
    recordingStatus: 'inactive',
    stream: new MediaStream(),
    audio: [],
    audioChunks: [],
    isLoading: false,
    transcript: { id: '' },
    setPermission: value => set({ permission: value }),
    setRecordingStatus: value => set({ recordingStatus: value }),
    setStream: value => set({ stream: value }),
    setAudio: value => set({ audio: value }),
    setAudioChunks: value => set({ audioChunks: value }),
    setIsLoading: value => set({ isLoading: value }),
    setTranscript: value => set({ transcript: value }),
}));
