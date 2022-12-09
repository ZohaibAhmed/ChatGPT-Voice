import React, { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';

import { Mic, StopCircle } from 'react-feather';

export default function Recorder(props) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    props.generate(results);
  }, [results])

  useEffect(() => {
    props.setInterimResultCallback(interimResult);
  }, [interimResult])

  useEffect(() => {
    props.setIsRecording(isRecording);
  }, [isRecording])


  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <button className="record-button" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? <StopCircle color='#FFF' size="42" /> : <Mic color='#FFF' size="42" />}
      </button>
    </div>
  );
}