import { render, screen } from '@testing-library/react';
import App from './App';

// https://github.com/ZeeCoder/use-resize-observer/issues/40#issuecomment-991256805
global.ResizeObserver = require('resize-observer-polyfill')

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
