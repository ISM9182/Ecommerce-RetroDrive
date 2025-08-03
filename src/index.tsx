import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';

import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento "root" não encontrado no DOM. Certifique-se de que o seu index.html contém um div com id="root".');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
