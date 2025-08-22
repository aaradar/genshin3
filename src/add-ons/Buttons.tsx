// src/Side Pages/Button.js

import { useEffect, useRef, useState } from "react";
import styles from "./Buttons.module.scss";
import RaidenSound from "../sounds/Raiden_Shogun_Rain.wav";
import OrderSound from "../sounds/VO_Zhongli_After_the_Rain.wav";
import XiaoSound from "../sounds/VO_Xiao_After_the_Rain.wav";
import AyatoSound from "../sounds/VO_Kamisato_Ayato_When_It_Rains.wav";
import WriothesleySound from "../sounds/VO_Wriothesley_When_It_Rains.wav";
import RagnvindrSound from "../sounds/VO_Diluc_When_It_Rains_-_Cleansing.wav";
import ChatSound from "../sounds/Neuvillette_Rain.wav";
import WandererSound from "../sounds/VO_Wanderer_When_It_Rains.wav";
import AyakaSound from "../sounds/VO_Kamisato_Ayaka_When_It_Rains.wav";
import JeanSound from "../sounds/VO_Jean_When_It_Rains.wav";
import SucroseSound from "../sounds/VO_Sucrose_When_It_Rains.wav";
import ShenheSound from "../sounds/VO_Shenhe_When_It_Rains.wav";
import AratakiSound from "../sounds/VO_Arataki_Itto_When_It_Rains.wav";
import KaeyaSound from "../sounds/VO_Kaeya_When_It_Rains.wav";

export function Buttons() {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = (soundFile: string) => {
    if (isPlaying) return; // Ignore if a sound is already playing

    const audio = audioRef.current;
    audio.src = soundFile; // reuse the same element
    audio.currentTime = 0;

    setIsPlaying(true);
    audio.play();

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "w" || event.key === "W") handleButtonClick(OrderSound);
      if (event.key === "q" || event.key === "Q") handleButtonClick(RaidenSound);
      if (event.key === "e" || event.key === "E") handleButtonClick(XiaoSound);
      if (event.key === "r" || event.key === "R") handleButtonClick(AyatoSound);
      if (event.key === "t" || event.key === "T") handleButtonClick(WriothesleySound);
      if (event.key === "y" || event.key === "Y") handleButtonClick(RagnvindrSound);
      if (event.key === "u" || event.key === "U") handleButtonClick(ChatSound);
      if (event.key === "i" || event.key === "I") handleButtonClick(WandererSound);
      if (event.key === "o" || event.key === "O") handleButtonClick(AyakaSound);
      if (event.key === "p" || event.key === "P") handleButtonClick(JeanSound);
      if (event.key === "a" || event.key === "A") handleButtonClick(SucroseSound);
      if (event.key === "s" || event.key === "S") handleButtonClick(ShenheSound);
      if (event.key === "d" || event.key === "D") handleButtonClick(AratakiSound);
      if (event.key === "f" || event.key === "F") handleButtonClick(KaeyaSound);
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className={styles.ButtonsColumn}>
      <div className={styles.ButtonsRow}>
        <div
          className={`${styles.Button} ${styles.ElectroSigil}`}
          onClick={() => handleButtonClick(RaidenSound)}
        />
        <div
          className={`${styles.Button} ${styles.GeoSigil}`}
          onClick={() => handleButtonClick(OrderSound)}
        />
        <div
          className={`${styles.Button} ${styles.AnemoSigil}`}
          onClick={() => handleButtonClick(XiaoSound)}
        />
        <div
          className={`${styles.Button} ${styles.HydroSigil}`}
          onClick={() => handleButtonClick(AyatoSound)}
        />
        <div
          className={`${styles.Button} ${styles.CryoSigil}`}
          onClick={() => handleButtonClick(WriothesleySound)}
        />
        <div
          className={`${styles.Button} ${styles.PyroSigil}`}
          onClick={() => handleButtonClick(RagnvindrSound)}
        />
      </div>
      <div className={styles.ButtonsRow}>
        <div
          className={`${styles.Button} ${styles.Neuv}`}
          onClick={() => handleButtonClick(ChatSound)}
        />
        <div
          className={`${styles.Button} ${styles.Wanderer}`}
          onClick={() => handleButtonClick(WandererSound)}
        />
        <div
          className={`${styles.Button} ${styles.Ayaka}`}
          onClick={() => handleButtonClick(AyakaSound)}
        />
        <div
          className={`${styles.Button} ${styles.Jean}`}
          onClick={() => handleButtonClick(JeanSound)}
        />
        <div
          className={`${styles.Button} ${styles.Sucrose}`}
          onClick={() => handleButtonClick(SucroseSound)}
        />
        <div
          className={`${styles.Button} ${styles.Shenhe}`}
          onClick={() => handleButtonClick(ShenheSound)}
        />
      </div>
      <div className={styles.ButtonsRow}>
        <div
          className={`${styles.Button} ${styles.Arataki}`}
          onClick={() => handleButtonClick(AratakiSound)}
        />
        <div
          className={`${styles.Button} ${styles.Kaeya}`}
          onClick={() => handleButtonClick(KaeyaSound)}
        />
      </div>
    </div>
  );
}
