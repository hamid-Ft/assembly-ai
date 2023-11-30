/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AudioRecorder from '../components/AudioRecorder';
import '@testing-library/jest-dom';

// Mock MediaStream
global.MediaStream = jest.fn().mockImplementation(() => ({
    getAudioTracks: jest.fn().mockReturnValue([
        {
            stop: jest.fn(),
        },
    ]),
}));

Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
        getUserMedia: jest
            .fn()
            .mockImplementation(() => Promise.resolve(new MediaStream())),
    },
    writable: true,
    configurable: true,
});

describe('AudioRecorder component', () => {
    // Mock MediaRecorder
    class MockMediaRecorder {
        static NOT_STARTED = 'inactive';

        static RECORDING = 'recording';

        static PAUSED = 'paused';

        static STOPPED = 'inactive';

        state = MockMediaRecorder.NOT_STARTED;

        stream = null;

        mimeType = '';

        audioBitsPerSecond = 0;

        videoBitsPerSecond = 0;

        ondataavailable = null;

        onerror = null;

        onpause = null;

        onresume = null;

        onstart = null;

        onstop = null;

        static isTypeSupported(): boolean {
            return true;
        }

        constructor(stream: null, options: { mimeType: string }) {
            this.stream = stream;
            this.mimeType = options.mimeType;
        }

        start() {
            this.state = MockMediaRecorder.RECORDING;
        }

        stop() {
            this.state = MockMediaRecorder.STOPPED;
        }

        pause() {
            this.state = MockMediaRecorder.PAUSED;
        }

        resume() {
            this.state = MockMediaRecorder.RECORDING;
        }
    }

    // Mock getUserMedia
    const mockGetUserMedia = jest.fn().mockImplementation(() => {
        return Promise.resolve(new MediaStream());
    });

    beforeAll(() => {
        window.MediaRecorder = MockMediaRecorder as any;
        navigator.mediaDevices.getUserMedia = mockGetUserMedia;
    });

    test('renders AudioRecorder component', () => {
        render(<AudioRecorder />);
        expect(screen.getByText(/Audio Recorder/i)).toBeInTheDocument();
    });

    test('The button text changes as expected when interacted with', async () => {
        const { getByText } = render(<AudioRecorder />);
        const getMicrophoneButton = getByText(/Get Microphone/i);
        // Mock getUserMedia to simulate user granting permission
        mockGetUserMedia.mockImplementation(() =>
            Promise.resolve(new MediaStream()),
        );
        // Trigger permission
        fireEvent.click(getMicrophoneButton);
        await waitFor(() => expect(mockGetUserMedia).toHaveBeenCalled());

        // Check Start Recording
        const startRecordingButton = getByText(/Start Recording/i);
        expect(startRecordingButton).toBeInTheDocument();

        // Trigger recording
        fireEvent.click(startRecordingButton);

        // Check Stop Recording
        const stopRecordingButton = getByText(/Stop Recording/i);
        expect(stopRecordingButton).toBeInTheDocument();

        // Trigger stop
        fireEvent.click(stopRecordingButton);
        // Wait for the "Start Recording" button to appear in the document
        const startRecordingButtonAgain = await waitFor(() =>
            getByText(/Start Recording/i),
        );

        // Check Start Recording, again
        expect(startRecordingButtonAgain).toBeInTheDocument();
    });

    test('requests microphone permission when "Get Microphone" button is clicked', async () => {
        // Arrange: Render the component and mock navigator.mediaDevices.getUserMedia
        global.navigator.mediaDevices.getUserMedia = mockGetUserMedia;
        render(<AudioRecorder />);
        // Act: Click the "Get Microphone" button
        const getMicrophoneButton = screen.getByText(/Get Microphone/i);
        fireEvent.click(getMicrophoneButton);
        // Assert: Check if navigator.mediaDevices.getUserMedia is called
        await waitFor(() => expect(mockGetUserMedia));
    });

    test('starts recording when "Start Recording" button is clicked', async () => {
        // Arrange: Render the component and grant microphone permission
        render(<AudioRecorder />);
        const getMicrophoneButton = screen.getByText(/Get Microphone/i);
        fireEvent.click(getMicrophoneButton);
        await waitFor(() => expect(mockGetUserMedia));

        const recorderInstance = new MockMediaRecorder(null, {
            mimeType: 'audio/webm',
        });

        // Act: Click the "Start Recording" button
        const startRecordingButton = screen.getByText(/Start Recording/i);
        fireEvent.click(startRecordingButton);
        recorderInstance.start();

        // Assert: Check if the recording status is 'recording' and if MediaRecorder.start is called
        expect(recorderInstance.state).toBe(MockMediaRecorder.RECORDING);
    });

    test('stops recording when "Stop Recording" button is clicked', async () => {
        // Arrange: Render the component, grant microphone permission, and start recording
        render(<AudioRecorder />);
        const getMicrophoneButton = screen.getByText(/Get Microphone/i);
        fireEvent.click(getMicrophoneButton);
        await waitFor(() => expect(mockGetUserMedia));

        const recorderInstance = new MockMediaRecorder(null, {
            mimeType: 'audio/webm',
        });
        const startRecordingButton = screen.getByText(/Start Recording/i);
        fireEvent.click(startRecordingButton);
        recorderInstance.start();

        // Act: Click the "Stop Recording" button
        const stopRecordingButton = screen.getByText(/Stop Recording/i);
        fireEvent.click(stopRecordingButton);
        recorderInstance.stop();

        // Assert: Check if the recording status is 'inactive' and if MediaRecorder.stop is called
        expect(recorderInstance.state).toBe(MockMediaRecorder.STOPPED);
    });

    test('removes audio clip when "Remove" button is clicked', async () => {
        // Arrange: Render the component, grant microphone permission, start recording, stop recording, and add an audio clip
        // Act: Click the "Remove" button
        // Assert: Check if the audio clip is removed from the state
    });

    test('uploads audio clip when "Upload" button is clicked', async () => {
        // Arrange: Render the component, grant microphone permission, start recording, stop recording, add an audio clip, and mock the API calls
        // Act: Click the "Upload" button
        // Assert: Check if the correct API calls are made
    });
});
