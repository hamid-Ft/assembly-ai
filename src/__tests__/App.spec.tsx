import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// Mock MediaStream
global.MediaStream = jest.fn();

test('demo', () => {
    expect(true).toBe(true);
});

test('Renders the main page', () => {
    render(<App />);
    expect(true).toBeTruthy();
});
