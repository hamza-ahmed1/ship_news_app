import React, { useState, useEffect } from "react";
import { Ship } from "lucide-react";
import Navbar from "./Navbar";

const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1661963559074-9655a9404f1a?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Real-Time Maritime Intelligence",
    subtitle: "Get accurate vessel & port insights instantly."
  },
  {
    url: "https://images.unsplash.com/photo-1613690399151-65ea69478674?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Port Operations Monitoring",
    subtitle: "Stay updated with live port operations across Pakistan."
  },
  {
    url: "https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cargo Movement Tracking",
    subtitle: "Track shipments with reliable and verified data."
  }
];

const MaritimeLanding = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "white", minHeight: "100vh", width: "100%" }}>
      {/* import navbar */}
      <Navbar />

   {/* ==================== THIRD ROW: HEADING ==================== */}
      <div style={{ 
        padding: "100px 20px 120px", 
        textAlign: "center",
        background: "linear-gradient(135deg, #0a4d68 0%, #1a75a8 50%, #81C2FA 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated waves background */}
        <div style={{
          position: "absolute",
          bottom: "-5px",
          left: 0,
          width: "100%",
          height: "100px",
          background: "white",
          clipPath: "ellipse(70% 50% at 50% 100%)",
          zIndex: 1
        }}></div>
        
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              fontSize: "52px",
              fontWeight: "900",
              color: "white",
              marginBottom: "20px",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              letterSpacing: "-1px"
            }}
          >
            Pakistan's #1 Maritime Information Platform
          </h2>
          <p style={{ 
            fontSize: "22px", 
            color: "rgba(255,255,255,0.95)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Real-time vessel data, port operations, and the latest maritime updates.
          </p>
        </div>
      </div>

      {/* ==================== FOURTH ROW: BUTTON ==================== */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button
          style={{
            background: "#2C5D08FF",
            color: "white",
            padding: "14px 32px",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            marginTop: "20px"
          }}
        >
          Create your free Account
        </button>
      </div>

      {/* ==================== FIFTH ROW: IMAGE SLIDER ==================== */}
      <div
        style={{
          width: "100%",
          height: "450px",
          overflow: "hidden",
          position: "relative"
          
        }}
      >
        <img
          src={images[slide].url}
          alt="slider"
          style={{
            width: "100%",
            height: "450px",
            objectFit: "cover",
            transition: "0.6s ease-in-out",
          }}
        />

        {/* TEXT OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "white",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          backgroundColor: "rgba(255, 223, 0, 0.5)", // warm, vibrant yellow

            padding: "30px 40px",
            borderRadius: "10px",
            maxWidth: "80%"


          }}
        >
          <h2 style={{ fontSize: "38px", marginBottom: "12px" }}>
            {images[slide].title}
          </h2>
          <p style={{ fontSize: "20px" }}>{images[slide].subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default MaritimeLanding;