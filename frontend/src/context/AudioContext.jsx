import { createContext, useState, useRef, useEffect, useCallback } from "react";
import { playlist } from "../data/playlist";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Playback prevented:", e));
    }
  }, [currentTrackIndex]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback prevented:", e));
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(p => (p + 1) % playlist.length);
  }, []);

  const toggleOpen = useCallback(() => setIsOpen(p => !p), []);

  return (
    <AudioContext.Provider
      value={{
        currentTrackIndex,
        isPlaying,
        isOpen,
        setIsOpen,
        audioRef,
        togglePlay,
        nextTrack,
        toggleOpen,
        playlist,
        setIsPlaying
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
