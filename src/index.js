import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Define a variável CSS para a imagem de fundo
document.documentElement.style.setProperty('--background-image', `url(${process.env.PUBLIC_URL}/background.jpg)`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
