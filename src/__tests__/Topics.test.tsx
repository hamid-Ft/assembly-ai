import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Topics from '../components/Topics';
import { Transcript } from '../types/transcript';

describe('Topics component', () => {
    test('renders Topics component', () => {
        // Arrange
        const mockTranscript: Transcript = {
            id: '1',
            iab_categories_result: {
                status: 'success',
                results: [],
                summary: { topic: 1 },
            },
        };

        // Act
        render(<Topics transcript={mockTranscript} />);

        // Assert
        expect(screen.getByText(/Topics Detected:/i)).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        // Arrange
        const mockTranscript: Transcript = {
            id: '1',
            iab_categories_result: {
                status: 'success',
                results: [],
                summary: { topic: 1 },
            },
        };

        // Act
        const { asFragment } = render(<Topics transcript={mockTranscript} />);

        // Assert
        expect(asFragment()).toMatchSnapshot();
    });
});
