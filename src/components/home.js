import React, { useState, useEffect } from "react";
import { Ship, Anchor, MapPin, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

const MaritimeLanding = ({ setUser, user }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", width: "100%" }}>
      {/* Navbar */}
      <Navbar setUser={setUser} user={user} />

      {/* Hero Section */}
      <div style={{ 
        position: "relative",
        background: "linear-gradient(135deg, #0a4d68 0%, #088395 50%, #0d7c92 100%)",
        overflow: "hidden"
      }}>
        {/* Decorative Wave Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4
        }}></div>

        <div style={{ 
          padding: "40px 20px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h1 style={{
              fontSize: "56px",
              fontWeight: "900",
              color: "white",
              marginBottom: "24px",
              textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              letterSpacing: "-1.5px",
              lineHeight: "1.2"
            }}>
              Pakistan's Leading Maritime<br/>Information Platform
            </h1>
            <p style={{ 
              fontSize: "24px", 
              color: "rgba(255,255,255,0.95)",
              maxWidth: "800px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
              fontWeight: "400"
            }}>
              Access real-time vessel tracking, port operations, and comprehensive maritime data for Karachi Port Trust and Port Qasim.
            </p>

            {/* CTA Buttons */}
            {!user && (
              <div style={{ 
                display: "flex", 
                gap: "20px", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px"
              }}>
                <button
                  onClick={() => window.location.href = '/signup'}
                  style={{
                    background: "#ef605c",
                    color: "#FFFFFF",
                    padding: "18px 48px",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "20px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                  }}
                >
                  {/* <Ship size={24} />   */}
                  Create Free Account
                </button>
                
                <button
                  onClick={() => window.location.href = '/signin'}
                  style={{
                    background: "transparent",
                    color: "#fff",
                    padding: "18px 40px",
                    border: "3px solid white",
                    borderRadius: "12px",
                    fontSize: "20px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "#0a4d68";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#fff";
                  }}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Feature Cards */}
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginTop: "60px"
          }}>
            {[
              { icon: Anchor, title: "Live Vessel Tracking", desc: "Monitor vessel movements in real-time" },
              { icon: MapPin, title: "Port Operations", desc: "Complete port activity insights" },
              { icon: TrendingUp, title: "Maritime Analytics", desc: "Data-driven shipping intelligence" }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.2)",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                <feature.icon size={48} color="white" style={{ marginBottom: "16px" }} />
                <h3 style={{ color: "white", fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px", lineHeight: "1.5" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave */}
        <div style={{
          position: "absolute",
          bottom: "-2px",
          left: 0,
          width: "100%",
          height: "100px",
          background: "#f8fafc",
          clipPath: "ellipse(75% 50% at 50% 100%)",
          zIndex: 1
        }}></div>
      </div>

      {/* Image Carousel Section */}
      <div style={{ 
        padding: "80px 40px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <div
          style={{
            width: "100%",
            height: "550px",
            overflow: "hidden",
            position: "relative",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
          }}
        >
          <img
            src={images[slide].url}
            alt="Maritime Operations"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.8s ease-in-out",
            }}
          />

          {/* Gradient Overlay */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(10,77,104,0.85) 0%, transparent 60%)"
          }}></div>

          {/* Text Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "60px",
              right: "60px",
              color: "white",
              zIndex: 2
            }}
          >
            <h2 style={{ 
              fontSize: "42px", 
              marginBottom: "16px",
              fontWeight: "800",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              lineHeight: "1.2"
            }}>
              {images[slide].title}
            </h2>
            <p style={{ 
              fontSize: "22px",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              maxWidth: "700px"
            }}>
              {images[slide].subtitle}
            </p>

            {/* Slide Indicators */}
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              marginTop: "30px" 
            }}>
              {images.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setSlide(idx)}
                  style={{
                    width: slide === idx ? "40px" : "12px",
                    height: "12px",
                    borderRadius: "6px",
                    background: slide === idx ? "white" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      {!user && (
        <div style={{
          background: "linear-gradient(135deg, #0a4d68 0%, #088395 100%)",
          padding: "60px 40px",
          textAlign: "center",
          marginTop: "40px"
        }}>
          <h2 style={{ 
            color: "white", 
            fontSize: "38px", 
            fontWeight: "800",
            marginBottom: "20px" 
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ 
            color: "rgba(255,255,255,0.9)", 
            fontSize: "20px",
            marginBottom: "35px",
            maxWidth: "600px",
            margin: "0 auto 35px"
          }}>
            Join thousands of maritime professionals accessing real-time shipping data.
          </p>
          <button
            onClick={() => window.location.href = '/signup'}
            style={{
              background: "#fff",
              color: "#0a4d68",
              padding: "18px 50px",
              border: "none",
              borderRadius: "12px",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
            }}
          >
            Create Your Free Account Now
          </button>
        </div>
      )}
      
    <Footer />
    </div>
  );
};

export default MaritimeLanding;