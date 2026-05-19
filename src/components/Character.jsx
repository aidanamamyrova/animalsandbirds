import React, { useEffect, useRef } from "react";
import "./Character.css";

const Character = ({ state }) => {
  const videoRef = useRef(null);

  const getVideoSrc = () => {
    switch (state) {
      case "talk":
        return "/videos/talk.mp4";
      case "success":
        return "/videos/success.mp4";
      case "error":
        return "/videos/error.mp4";
      default:
        return "/videos/idle.mp4";
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [state]);

  return (
    <div className="character-container">
      <video
        ref={videoRef}
        autoPlay
        muted={state !== "talk"}
        className="character-video"
      >
        <source src={getVideoSrc()} type="video/mp4" />
      </video>
    </div>
  );
};

export default Character;