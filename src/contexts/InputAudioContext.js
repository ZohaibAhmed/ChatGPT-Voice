import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useMediaStream } from './MediaStreamContext';


const InputAudioContext = createContext({
  audioCtx: undefined,
  source: undefined,
});

export const useInputAudio = () => useContext(InputAudioContext);

export const InputAudioProvider = ({ children }) => {
  const [context, setContext] = useState();
  const [source, setSource] = useState();
  const { stream } = useMediaStream();

  const stop = useCallback(async () => {
    try {
      if (context) {
        await context.close();
        setContext(undefined);
      }
      if (source) {
        source.disconnect();
        setSource(undefined);
      }
    } catch(e) {
      console.error(e.name, e.message);
    }
  }, [context, source]);

  useEffect(() => {
    if (stream) {
      const audioCtx = new AudioContext();
      setSource(audioCtx.createMediaStreamSource(stream));
      setContext(audioCtx);
    }
  }, [stream]);

  useEffect(() => {
    if (!stream) {
      stop();
    }

    return () => {
      stop();
    }
  }, [stream, stop]);

  return (
    <InputAudioContext.Provider value={{ audioCtx: context, source }}>
      {children}
    </InputAudioContext.Provider>
  )
}

export default InputAudioContext;