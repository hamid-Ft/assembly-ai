/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
import { useRef, useEffect } from 'react';
import Status from './Status';
import Result from './Result';
import assemblyAPI from '../core/assemblyAPI';
import useAudioStore from '../audioStore';

const mimeType = process.env.VITE_MIMETYPE;

const AudioRecorder = () => {
    const {
        permission,
        setPermission,
        recordingStatus,
        setRecordingStatus,
        stream,
        setStream,
        audio,
        setAudio,
        audioChunks,
        setAudioChunks,
        isLoading,
        setIsLoading,
        transcript,
        setTranscript,
    } = useAudioStore();

    // const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<MediaRecorder | undefined>();
    // const [recordingStatus, setRecordingStatus] = useState('inactive');
    // const [stream, setStream] = useState<MediaStream>(new MediaStream());

    // /**  @description  { url: string; blob: Blob[] }[] */
    // const [audio, setAudio] = useState<{ url: string; blob: Blob }[]>([]);
    // const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    // const [isLoading, setIsLoading] = useState(false);

    // /** @details @problem must infer from assemblyAi itself ... ?! */
    // const [transcript, setTranscript] = useState<Transcript>({ id: '' });
    const getMicrophonePermission = async () => {
        if ('MediaRecorder' in window) {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                setPermission(true);
                setStream(mediaStream);
            } catch (err) {
                if (err instanceof Error) {
                    alert(err.message);
                }
            }
        } else {
            alert('The MediaRecorder API is not supported in your browser.');
        }
    };

    const startRecording = async () => {
        setRecordingStatus('recording');
        const media = new MediaRecorder(stream, {
            mimeType,
        });
        mediaRecorder.current = media;
        mediaRecorder.current.start();

        const localAudioChunks: Blob[] = [];

        mediaRecorder.current.ondataavailable = event => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus('inactive');
        mediaRecorder.current?.stop();
        mediaRecorder.current!.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            const newAudio = [...audio, { url: audioUrl, blob: audioBlob }];
            setAudio(newAudio);
            setAudioChunks([]);
        };
    };
    useEffect(() => {
        const interval = setInterval(async () => {
            if (
                transcript.id &&
                transcript.status !== 'completed' &&
                isLoading
            ) {
                try {
                    const { data: transcriptData } = await assemblyAPI.get(
                        `/transcript/${transcript.id}`,
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
    }, [isLoading, setIsLoading, setTranscript, transcript]);

    const handleRemoveAudio = (index: number) => {
        const updatedAudio = audio.splice(0);
        updatedAudio.splice(index, 1);
        setAudio(updatedAudio);
    };
    const handleUploadAudio = async (index: number) => {
        const selectedAudio = audio![index]?.blob;
        setIsLoading(true);
        const { data: uploadResponse } = await assemblyAPI.post(
            '/upload',
            selectedAudio,
        );
        const { data } = await assemblyAPI.post('/transcript', {
            audio_url: uploadResponse.upload_url,
            // features
            sentiment_analysis: true,
            entity_detection: true,
            iab_categories: true,
            speaker_labels: true,
        });
        setTranscript({ id: data.id });
    };

    return (
        <div data-testid="AudioRecorder">
            <div>
                {transcript.text && transcript.status === 'completed' ? (
                    <Result transcript={transcript} />
                ) : (
                    <Status
                        isLoading={isLoading}
                        status={transcript.status || ''}
                    />
                )}
            </div>
            <h2 className="font-extrabold py-2">Audio Recorder</h2>
            <main>
                <div style={{ marginBottom: '20px' }}>
                    {!permission ? (
                        <button
                            className="bg-slate-500 hover:bg-slate-400"
                            onClick={getMicrophonePermission}
                            type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && recordingStatus === 'inactive' ? (
                        <button
                            className="bg-slate-500 hover:bg-slate-400"
                            onClick={startRecording}
                            type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === 'recording' ? (
                        <button
                            className="bg-slate-500 hover:bg-slate-400"
                            onClick={stopRecording}
                            type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
                {audio.length > 0 && (
                    <div className="flex flex-col gap-8 items-center justify-center">
                        {audio.map((aud, index) => (
                            <div
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                style={{ display: 'flex', gap: '2rem' }}>
                                <button
                                    className="bg-slate-500 hover:bg-slate-400"
                                    type="button"
                                    onClick={async () =>
                                        handleUploadAudio(index)
                                    }>
                                    Upload
                                </button>
                                <audio key={index} src={aud.url} controls>
                                    {' '}
                                    <track kind="captions" />
                                </audio>
                                <button
                                    className="bg-slate-500 hover:bg-slate-400"
                                    type="button"
                                    onClick={() => handleRemoveAudio(index)}>
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
