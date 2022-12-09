import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';


const MediaStreamContext = createContext({
  stream: undefined,
  start: () => {},
  stop: () => {},
});

export const useMediaStream = () => useContext(MediaStreamContext);


export const MediaStreamProvider = ({ children, audio, video }) => {
  const [stream, setStream] = useState();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [stream]);

  const start = useCallback(async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio, video });
    setStream(mediaStream);
  }, [audio, video]);

  const stop = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(undefined);
    }
  }, [stream]);

  return (
    <MediaStreamContext.Provider value={{ stream, start, stop }}>
      {children}
    </MediaStreamContext.Provider>
  );
}

export default MediaStreamContext;