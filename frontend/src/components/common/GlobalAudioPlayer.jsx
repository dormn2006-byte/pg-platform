import { useState, useRef, useEffect, useCallback } from "react";
import { Music, Pause, Play, SkipForward } from "lucide-react";
import { playlist } from "../../data/playlist";

const GlobalAudioPlayer = () => {
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
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(e => console.error("Playback prevented:", e));
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(p => (p + 1) % playlist.length);
  }, []);

  const toggleOpen = useCallback(() => setIsOpen(p => !p), []);

  if (playlist.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 lg:top-auto lg:bottom-6 lg:right-6 z-50 flex items-center gap-3">
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        preload="none"
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {isOpen && (
        <div className="flex animate-[fadeIn_0.2s_ease-out_forwards] items-center gap-3 rounded-full border border-gray-200 bg-white p-2 shadow-lg">
          <div className="px-3 flex flex-col justify-center max-w-[120px] sm:max-w-[200px]">
            <p className="truncate text-xs font-bold text-[#0D3A1D]">
              {playlist[currentTrackIndex].split("/").pop().replace(".mp3", "")}
            </p>
            <p className="text-[10px] text-gray-500">Playing {currentTrackIndex + 1} of {playlist.length}</p>
          </div>
          <button
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#93B733]/10 text-[#93B733] hover:bg-[#93B733] hover:text-white transition-colors"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            title="Next Track"
          >
            <SkipForward size={14} />
          </button>
        </div>
      )}

      <button
        onClick={toggleOpen}
        aria-label={isOpen ? "Close music player" : "Open music player"}
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isPlaying
            ? "bg-[#93B733] text-white shadow-[#93B733]/40 hover:scale-105"
            : "bg-white text-[#93B733] border-2 border-[#93B733]/20 hover:border-[#93B733] hover:scale-105"
        }`}
        title="Background Music"
      >
        <Music size={20} className={isPlaying ? "animate-spin-slow" : ""} />
      </button>

      <style>{`@keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.animate-spin-slow{animation:spin-slow 4s linear infinite}`}</style>
    </div>
  );
};

export default GlobalAudioPlayer;
