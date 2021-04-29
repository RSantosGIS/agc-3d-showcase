import { render, screen } from '@testing-library/react';
import App from './App';

test('Checks basic render of page', () => {
  render(<App />);
  const linkElement = document.getElementById('rootDiv');
  expect(linkElement).toBeInTheDocument();
});
