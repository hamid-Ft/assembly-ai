import { render, screen } from '@testing-library/react';
import Speakers from '../components/Speakers';
import '@testing-library/jest-dom';

test('renders Speakers component', async () => {
    const mockTranscript = {
        id: '001',
        utterances: [
            {
                start: 0,
                speaker: 'A',
                text: 'Hello',
                confidence: 0.86,
                end: 1.2234,
                words: [
                    {
                        text: 'Hello',
                        start: 0,
                        end: 1.2234,
                        confidence: 0.86,
                        speaker: 'A',
                    },
                ],
            },
            {
                start: 1.3483,
                speaker: 'B',
                text: 'Hi',
                confidence: 0.82,
                end: 2.2489,
                words: [
                    {
                        text: 'Hi',
                        start: 1.3483,
                        end: 2.2489,
                        confidence: 0.82,
                        speaker: 'B',
                    },
                ],
            },
        ],
    };
    render(<Speakers transcript={mockTranscript} />);

    const speaker1Element = await screen.findByText(/A: Hello/i);
    const speaker2Element = await screen.findByText(/B: Hi/i);

    expect(speaker1Element).toBeInTheDocument();
    expect(speaker2Element).toBeInTheDocument();
});

test('matches snapshot', () => {
    const mockTranscript = {
        id: '001',
        utterances: [
            {
                start: 0,
                speaker: 'A',
                text: 'Hello',
                confidence: 0.86,
                end: 1.2234,
                words: [
                    {
                        text: 'Hello',
                        start: 0,
                        end: 1.2234,
                        confidence: 0.86,
                        speaker: 'A',
                    },
                ],
            },
            {
                start: 1.3483,
                speaker: 'B',
                text: 'Hi',
                confidence: 0.82,
                end: 2.2489,
                words: [
                    {
                        text: 'Hi',
                        start: 1.3483,
                        end: 2.2489,
                        confidence: 0.82,
                        speaker: 'B',
                    },
                ],
            },
        ],
    };
    const { asFragment } = render(<Speakers transcript={mockTranscript} />);
    expect(asFragment()).toMatchSnapshot();
});
