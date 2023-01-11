import React, { useState } from "react";
import css from "./AudioControl.module.scss";
import musicIcon from "../../Images/musicIcon.svg";
import bgm from "../../Images/bgm.mp3";
import Loader from "../Loader";

type AudioControlPropTypes = {
  loading?: boolean;
};

const AudioControl: React.FC<AudioControlPropTypes> = ({ loading = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const bgmElement = document.getElementById(
    "backgroundMusic"
  ) as HTMLAudioElement;

  if (bgmElement) {
    bgmElement.onplay = () => {
      setIsPlaying(true);
    };
    bgmElement.onplaying = () => {
      setIsPlaying(true);
    };
    bgmElement.onpause = () => {
      setIsPlaying(false);
    };
    bgmElement.onerror = () => {
      setIsPlaying(false);
    };
    bgmElement.onabort = () => {
      setIsPlaying(false);
    };
    bgmElement.onended = () => {
      setIsPlaying(false);
    };
    bgmElement.onstalled = () => {
      setIsPlaying(false);
    };
    bgmElement.onwaiting = () => {
      setIsPlaying(false);
    };
  }

  return (
    <>
      <audio preload="auto" id="backgroundMusic" loop>
        <source src={bgm} type="audio/mpeg" />
      </audio>
      <div
        className={css.container}
        onClick={() => {
          if (!loading) {
            if (isPlaying) {
              bgmElement.pause();
            } else {
              bgmElement.play();
            }
          }
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={`${css.line} ${isPlaying ? css.hide : ""}`}></div>
            <img src={musicIcon} alt="audioControl" />
          </>
        )}
      </div>
    </>
  );
};

export default AudioControl;
