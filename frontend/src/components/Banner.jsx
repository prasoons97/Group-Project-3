import { useState, useEffect } from "react";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";
import Btn from "./Btn";

function Banner({ onShopNow }) {
  const images = [banner1, banner2, banner3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner">
      <img
        src={images[currentIndex]}
        alt="banner"
        className="banner-image"
      />

      <Btn
        btnClassName="shopNowBtn"
        onClick={() => {
          onShopNow?.();
        }}
      >
        Shop now
      </Btn>

      <div className="banner-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`banner-dot ${currentIndex === index ? "active" : ""}`}
            aria-label={`Show banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;