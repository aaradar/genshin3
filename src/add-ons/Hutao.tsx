import { useCallback, useEffect, useRef } from "react";

import OrderSound from "../sounds/Order.wav";
import ChevreuseSound from "../sounds/crimes.wav";
import styles from "./Hutao.module.scss";

export function Hutao() {
  const hutaoDiv = useRef<HTMLDivElement>(null);
  const chevreuseDiv = useRef<HTMLDivElement>(null);

  const playSoundAndShowImage = useCallback(
    (element: HTMLDivElement, sound: any) => {
      const audio = new Audio(sound); // Create an Audio object using the imported audio file
      audio.play(); // Play the sound

      // Add a CSS class to the body to display the image using CSS
      element.classList.add(styles.Open);

      // Add event listener to remove the CSS class when the animation ends
      element.addEventListener(
        "animationend",
        () => {
          element.classList.remove(styles.Open);
        },
        { once: true }
      ); // { once: true } ensures that the event listener is removed after it's triggered once
    },
    []
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "h" || event.key === "H") {
        if (!hutaoDiv.current) {
          return;
        }

        playSoundAndShowImage(hutaoDiv.current, OrderSound);
      }

      if (event.key === "," || event.key === ".") {
        if (!chevreuseDiv.current) {
          return;
        }

        playSoundAndShowImage(chevreuseDiv.current, ChevreuseSound);
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [playSoundAndShowImage]);

  return (
    <>
      <div ref={hutaoDiv} className={styles.Hutao} />
      <div ref={chevreuseDiv} className={styles.Chevreuse} />
    </>
  );
}
