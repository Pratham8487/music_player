import { useCallback, useRef, useState } from 'react';

export const usePictureInPicture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPiPActive, setIsPiPActive] = useState(false);

  const togglePictureInPicture = useCallback(async () => {
    try {
      if (!videoRef.current) return;

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } catch (error) {
      console.error('Failed to toggle Picture-in-Picture:', error);
    }
  }, []);

  return { videoRef, isPiPActive, togglePictureInPicture };
};