import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const navElement = screen.getByText(/About/i);
  expect(navElement).toBeInTheDocument();
});
