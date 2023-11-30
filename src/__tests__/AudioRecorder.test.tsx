import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioRecorder from '../components/AudioRecorder';

describe('<AudioRecorder />', () => {
    test('it should mount', () => {
        render(<AudioRecorder />);

        const audioRecorder = screen.getByTestId('AudioRecorder');

        expect(audioRecorder).toBeInTheDocument();
    });
});
