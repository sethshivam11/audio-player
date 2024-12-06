import {
  ChevronLeft,
  FastForward,
  Heart,
  Pause,
  Play,
  Rewind,
  Share2,
  Volume2,
  VolumeOff,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Player() {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [track, setTrack] = useState({
    _id: "",
    title: "",
    image: "",
    url: "",
    duration: 0,
  });
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  function handlePlayPause() {
    if (paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPaused(!paused);
  }
  function handleBackSkip() {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const newTime = Math.max(current - 10, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
  function handleForwardSkip() {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const newTime = Math.max(current + 10, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
  function handleGoback() {
    navigate(-1);
  }
  function handleTimeUpdate(e) {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }
  function handleEnded() {
    setPaused(true);
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  }
  function handleSeek(e) {
    if (!audioRef.current) return;
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  }

  useEffect(() => {
    if (!audioId) return;
    else console.log(audioId);
    fetch(`/api/v1/track/${audioId}`)
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res?.success) {
          setTrack(res.data);
        }
      });
  }, [setTrack, audioId]);
  useEffect(() => {
    const audio = audioRef.current;
    const handleCanPlayThrough = () => {
      audio.play();
      setPaused(false);
    };

    if (audio) {
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
    }

    function handleKey(e) {
      if (e.code === "Space") {
        handlePlayPause();
      } else if (e.code === "ArrowRight") {
        handleForwardSkip();
      } else if (e.code === "ArrowLeft") {
        handleBackSkip();
      }
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      if (audio) {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      }
    };
  }, [handlePlayPause, handleForwardSkip, handleBackSkip, audioRef.current]);

  return (
    <div className="flex flex-col sm:gap-5 gap-3 items-center min-h-[100dvh] bg-gradient-to-b from-[#F87B40] to-white font-serif max-sm:px-6">
      <div className="w-full text-center">
        <div className="flex items-center justify-between w-full sm:w-4/6 mx-auto">
          <button className="p-4" onClick={handleGoback}>
            <ChevronLeft />
          </button>
          <Link to="/" className="p-4">
            <X />
          </Link>
        </div>

        <h1 className="sm:text-4xl text-3xl text-extrabold tracking-tight sm:mb-4">
          {track.title}
        </h1>
        <p>Feel better by listening to this</p>
      </div>
      <img
        src={track.image}
        alt=""
        className="sm:w-96 sm:h-96 w-80 h-80 object-cover rounded-xl shadow-lg"
      />
      <div className="sm:w-4/6 w-full mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl text-bold tracking-tight">{track.title}</h3>
            <p className="text-stone-600">Shree Ram</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeOff /> : <Volume2 />}
            </button>
            <button>
              <Share2 />
            </button>
            <button>
              <Heart />
            </button>
          </div>
        </div>
        <input
          type="range"
          className="w-full"
          value={currentTime}
          step={1}
          min={0}
          max={track.duration}
          onChange={handleSeek}
        />
        <audio
          src={track.url}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          muted={isMuted}
        />
        <div className="flex items-center justify-between font-sans">
          <span>
            {Math.floor(currentTime / 60)}:
            {currentTime % 60 < 10
              ? `0${Math.floor(currentTime % 60)}`
              : Math.floor(currentTime % 60)}
          </span>
          <span>
            {Math.floor(track.duration / 60)}:
            {track.duration % 60 < 10
              ? `0${track.duration % 60}`
              : track.duration % 60}
          </span>
        </div>
        <div className="flex gap-2 items-center justify-evenly py-4">
          <button className="p-3 rounded-full" onClick={handleBackSkip}>
            <Rewind fill="currentColor" />
          </button>
          <button
            onClick={handlePlayPause}
            className="bg-[#F87B40] p-3 rounded-full text-white"
          >
            {paused ? (
              <Play fill="currentColor" />
            ) : (
              <Pause fill="currentColor" />
            )}
          </button>
          <button className="p-3 rounded-full" onClick={handleForwardSkip}>
            <FastForward fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
