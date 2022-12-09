import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MediaStreamProvider } from './contexts/MediaStreamContext';
import { AudioAnalyserProvider } from './contexts/AudioAnalyserContext';
import { InputAudioProvider } from './contexts/InputAudioContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MediaStreamProvider video={false} audio={true}>
      <InputAudioProvider>
        <AudioAnalyserProvider>
          <App />
        </AudioAnalyserProvider>
      </InputAudioProvider>
    </MediaStreamProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
