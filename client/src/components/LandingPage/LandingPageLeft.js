import React, { useState, useEffect } from "react";
import styles from "./LandingPageLeft.module.css";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import logo from "../../assets/logo-standard-OVERWORLD.png";

export const LandingPageLeft = () => {
  const images = [bg1, bg2];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(bg1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2000);
    return () => clearInterval(interval);
  });

  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      const nextIndex = selectedIndex === 0 ? 1 : 0;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  return (
    <div className={styles.left}>
      <img
        className={loaded ? `${styles.fade} ${styles.img} ` : ` ${styles.img}`}
        src={`${selectedImage}`}
        alt="bg-img"
        onLoad={() => setLoaded(true)}
      />
      <img className={styles.logo} src={logo} alt="" />
      <p>Part1</p>
    </div>
  );
};
