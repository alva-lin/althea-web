import { useCallback, useRef, useState } from "react";

const useMediaRecorder = () => {
  const [ url, setUrl ] = useState<string>("");
  
  const stream = useRef<MediaStream>();
  const recorder = useRef<MediaRecorder>();
  const blobs = useRef<Blob[]>([]);
  
  const startRecordAsync = useCallback(async () => {
    stream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    
    recorder.current = new MediaRecorder(stream.current);
    recorder.current.ondataavailable = (event) => {
      blobs.current.push(event.data);
    };
    recorder.current.onstop = () => {
      const blob = new Blob(blobs.current, { type: "audio/webm" });
      setUrl(URL.createObjectURL(blob));
    };
    
    recorder.current?.start();
  }, [ setUrl ]);
  
  const pauseRecordAsync = useCallback(async () => {
    recorder.current?.pause();
  }, []);
  
  const resumeRecordAsync = useCallback(async () => {
    recorder.current?.resume();
  }, []);
  
  const stopRecordAsync = useCallback(async () => {
    recorder.current?.stop();
    stream.current?.getTracks().forEach(track => track.stop());
    blobs.current = [];
  }, []);
  
  return {
    mediaUrl: url,
    startRecordAsync,
    pauseRecordAsync,
    resumeRecordAsync,
    stopRecordAsync,
  };
};

export default useMediaRecorder;
