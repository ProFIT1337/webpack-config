const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
const rootElement = ReactDOM.createRoot(root);

rootElement.render(<App />);