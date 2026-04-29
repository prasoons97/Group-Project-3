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
            setCurrentIndex(prev =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <img
                src={images[currentIndex]}
                alt="banner"
                style={{ width: "100%", display: "block" }}
            />
            <Btn btnClassName = "shopNowBtn"
    style={{
        position: "absolute",
        top: "200px",
        right: "120px",
        padding: "16px 22px",
        fontSize: "18px"
    
    }}
    onClick={() => {
        console.log("Shop now clicked");
        onShopNow?.();  //Won't crash if prop is missing
    }}
>
    Shop now
</Btn>

            <div
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                    background: "rgba(0,0,0,0.3)",
                    padding: "6px 10px",
                    borderRadius: "20px"
                }}
            >
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: currentIndex === index ? "white" : "gray",
                            cursor: "pointer"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;