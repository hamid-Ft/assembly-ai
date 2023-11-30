import { render, screen } from '@testing-library/react';
import Status from '../components/Status';
import '@testing-library/jest-dom';

test('renders correct text when isLoading is true', () => {
    render(<Status isLoading status="uploading" />);
    const linkElement = screen.getByText(/Calculating...uploading.../i);
    expect(linkElement).toBeInTheDocument();
});

test('renders correct text when isLoading is false', () => {
    render(<Status isLoading={false} status="" />);
    const linkElement = screen.getByText(/Give me audio!/i);
    expect(linkElement).toBeInTheDocument();
});

test('matches snapshot when isLoading is true', () => {
    const { asFragment } = render(<Status isLoading status="uploading" />);
    expect(asFragment()).toMatchSnapshot();
});

test('matches snapshot when isLoading is false', () => {
    const { asFragment } = render(<Status isLoading={false} status="" />);
    expect(asFragment()).toMatchSnapshot();
});
