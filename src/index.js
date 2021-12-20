import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: 1, name: 'lololo', completed: false },
  { id: 2, name: 'fofofo', completed: true },
  { id: 3, name: 'sososo', completed: false }
]

ReactDOM.render(
  <App tasks={DATA} />,
  document.getElementById('root')
);
