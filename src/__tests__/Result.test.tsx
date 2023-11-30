import { render, screen } from '@testing-library/react';
import Speakers from '../components/Speakers';
import { Transcript, Utterance } from '../types/transcript';
import '@testing-library/jest-dom';

describe('Speakers component', () => {
    test('renders Speakers component', () => {
        // Arrange
        const mockTranscript: Transcript = {
            id: '1',
            utterances: [
                {
                    confidence: 0.9,
                    end: 10,
                    speaker: 'Speaker 1',
                    start: 0,
                    text: 'Test text',
                    words: [],
                },
            ] as Utterance[],
        };

        // Act
        render(<Speakers transcript={mockTranscript} />);

        // Assert
        expect(screen.getByText(/Speakers:/i)).toBeInTheDocument();
        expect(screen.getByText(/Speaker 1: Test text/i)).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        // Arrange
        const mockTranscript: Transcript = {
            id: '1',
            utterances: [
                {
                    confidence: 0.9,
                    end: 10,
                    speaker: 'Speaker 1',
                    start: 0,
                    text: 'Test text',
                    words: [],
                },
            ] as Utterance[],
        };

        // Act
        const { asFragment } = render(<Speakers transcript={mockTranscript} />);

        // Assert
        expect(asFragment()).toMatchSnapshot();
    });
});
