import { useEffect, useState, useRef } from "react";
const Test = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const getMediaStream = async () => {
      try {
        if (!mediaStreamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          mediaStreamRef.current = stream;
          if (mounted) {
            setMediaStream(stream);
          }
        }
      } catch (error) {
        // Handle the error
      }
    };

    getMediaStream();

    return () => {
      mounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        mediaStreamRef.current = null;
        setMediaStream(null);
      }
    };
  }, []);

  return (
    <>
      <div>
        <h3>hi</h3>
        <video></video>
      </div>
    </>
  );
};

export default Test;
