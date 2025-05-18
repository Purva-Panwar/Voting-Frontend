import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "axios";

const RootLayout = () => {
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const [selectedTab, setSelectedTab] = useState("Home");
  const [isVoterRegistered, setIsVoterRegistered] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = windowWidth <= 700;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check voter registration
  useEffect(() => {
    const registered = localStorage.getItem("voterRegistered");
    if (registered === "true") {
      setIsVoterRegistered(true);
    }
  }, []);

  // Fetch account verification status
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        if (!token || !voterId) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsAccountVerified(response.data.isAccountVerified);
      } catch (error) {
        console.error("Error fetching verification status:", error);
      }
    };

    fetchVerificationStatus();
  }, [token, voterId]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "calc(100vh - 160px)",
        }}
      >
        {/* Sidebar on left (desktop) or top (mobile) */}
        {token && (
          <aside
            style={{
              width: isMobile ? "100%" : "20%",
              // margin: isMobile ? "0 0 0px 0" : "0 0px 0 0px",
            }}
          >
            <Sidebar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </aside>
        )}

        {/* Outlet Content */}
        <main
          style={{
            flex: 1,
            padding: "10px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Outlet />
          {!token && <Footer />}
        </main>
      </div>
    </>
  );
};

export default RootLayout;
