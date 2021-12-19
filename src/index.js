import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: 1, name: 'lololo', completed: false }
]

ReactDOM.render(
  <App tasks={DATA} />,
  document.getElementById('root')
);
