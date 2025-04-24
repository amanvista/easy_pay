import { useEffect } from 'react';
import bellSound from '../../assets/bell.mp3';

const NotificationPlay = () => {
  const playSound = () => {
    const audio = new Audio(bellSound); // Make sure 'ting.mp3' is in the public folder
    audio.play();
    document.removeEventListener('click', playSound); // Remove the event listener after the sound plays
  };

  useEffect(() => {
    document.addEventListener('click', playSound); // Listen for the first click
    return () => {
      document.removeEventListener('click', playSound); // Clean up the listener on component unmount
    };
  }, []);

  return null; // No UI needed
};

export default NotificationPlay;
