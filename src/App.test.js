import { render } from '@testing-library/react';
import App from './App';

test('Checks basic render of page', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass('mapDiv');
});
