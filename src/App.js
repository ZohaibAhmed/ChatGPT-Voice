import './App.css';

import React, { useState } from 'react';
import Recorder from './Recorder';
import AudioVisualiser from './AudioVisualizer';
import { useMediaStream } from './contexts/MediaStreamContext';

function App() {
  const { stream, start, stop } = useMediaStream();
  const [gpt, setGPT] = useState("");
  const [results, setResults] = useState([]);
  const [interimResult, setInterimResult] = useState("");

  const setInterimResultCallback = (interimResult) => {
    setInterimResult(interimResult);
  }

  const generate = (results) => {
    if (results.length > 0) {
      setResults(results);
      console.log(results);
      let encoded = encodeURI(results[results.length - 1].transcript);
      fetch('http://localhost:5001/voice?q=' + encoded)
        .then((response) => response.text())
        .then((data) => {
          let snd = new Audio("data:audio/wav;base64," + data);
          snd.play();
        });
    }
  }
  
  const setIsRecording = (isRecording) => {
    if (isRecording === true) {
      start();
    }
  }

  return (
    <div className="App">
      <Recorder generate={generate} setInterimResultCallback={setInterimResultCallback} setIsRecording={setIsRecording} />
      <AudioVisualiser />

      <div className="results">
        { results.length > 0 && (
          <div className="speech-to-text child">
          <ul className="speech-bubbles">
            {results.slice(-3).map((result) => (
              <li key={result.timestamp}>{result.transcript}</li>
            ))}
            {interimResult && <li>{interimResult}</li>}
          </ul>
        </div>
        ) }
        
        { gpt && (
          <p className="gpt child">{gpt}</p>
        )}
      </div>

      
    </div>
  );
}

export default App;
