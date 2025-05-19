import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import {
  Activity,
  BarChart,
  BarChart2Icon,
  Clipboard,
  Grid,
  LogIn,
  LogOutIcon,
  PieChart,
  User,
} from "lucide-react";
import Register from "./Register";

function Sidebar({ selectedTab, setSelectedTab }) {
  const [isOpen, setIsOpen] = useState(false); // toggle sidebar on mobile
  const handleOnclick = (item) => {
    setSelectedTab(item);
    setIsOpen(false); // Close sidebar after click in mobile
  };
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div
        className="mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{ marginTop: "-14px" }}
      >
        {isOpen ? <AiOutlineClose size={30} /> : <HiOutlineBars3 size={30} />}
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Online Voting</span>
        </div>

        <ul className="sidebar-menu">
          <div className="sidebar-user">
            <NavLink className="profile-initial">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.145594747.1747650246&semt=ais_hybrid&w=740"
                alt="User"
              />
            </NavLink>
          </div>

          <li
            className={selectedTab === "Home" ? "active" : ""}
            onClick={() => handleOnclick("Home")}
          >
            <Link to="/dashboard" className="sidebar-link">
              <Grid />
              Dashboard
            </Link>
          </li>

          <li
            className={selectedTab === "Elections" ? "active" : ""}
            onClick={() => handleOnclick("Elections")}
          >
            <Link to="/elections" className="sidebar-link">
              <Clipboard />
              Elections
            </Link>
          </li>

          <li
            className={selectedTab === "Contact" ? "active" : ""}
            onClick={() => handleOnclick("Contact")}
          >
            <Link to="/results" className="sidebar-link">
              <PieChart />
              Results
            </Link>
          </li>

          <li
            className={selectedTab === "HowItWorks" ? "active" : ""}
            onClick={() => handleOnclick("HowItWorks")}
          >
            <Link to="/works" className="sidebar-link">
              <Activity />
              How it Works
            </Link>
          </li>
          <li
            className={selectedTab === "Logout" ? "active" : ""}
            onClick={() => handleOnclick("Logout")}
          >
            <Link to="/logout" className="sidebar-link">
              <LogOutIcon />
              Logout
            </Link>
          </li>

          <li
            className={selectedTab === "Profile" ? "active" : ""}
            onClick={() => handleOnclick("Profile")}
          >
            <Link to="/profile" className="sidebar-link">
              <User />
              See my Profile
            </Link>
          </li>
        </ul>

        {/* Social Links */}
        <div className="logo-section">
          <a
            href="https://www.instagram.com/purvi.rajput17/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              style={{ color: "#E4405F" }}
            />
          </a>
          <a
            href="https://github.com/Purva-Panwar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              style={{ color: "#333" }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/purva-panwar-797931293"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              style={{ color: "#0077B5" }}
            />
          </a>
          <a
            href="https://youtube.com/@purvapanwar4273"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              style={{ color: "#FF0000" }}
            />
          </a>
        </div>
      </div>

      {/* Sidebar Styles */}
      <style>
        <style>
          {`
    * {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .mobile-toggle {
      display: none;
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1000;
      background: #ffffff;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      cursor: pointer;
    }

    .sidebar {
      margin-top: 100px;
      width: 340px;
      background:rgb(233, 236, 240);
      color: #1f2937;
      padding: 20px;
      height: 82vh;
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      position: fixed;
      overflow-y: auto;
      transition: all 0.3s ease-in-out;
    }

    .sidebar-header {
      margin-bottom: 24px;
      text-align: center;
    }

    .sidebar-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #111827;
    }

    .sidebar-menu {
      list-style: none;
      padding: 0;
      flex-grow: 1;
    }

    .sidebar-menu li {
      margin: 8px 0;
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 10px;
      text-decoration: none;
      color: #374151;
      font-size: 1rem;
      font-weight: 500;
      transition: background 0.3s ease, color 0.3s ease;
    }

    .sidebar-link:hover,
    .sidebar-menu li.active .sidebar-link {
      background: #dbeafe;
      color: #1e40af;
    }

    .sidebar-user {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .sidebar-user img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid #e5e7eb;
    }

    .logo-section {
      display: flex;
      justify-content: space-evenly;
      margin-top: 20px;
      padding: 0 8px;
    }

    .logo-section a {
      transition: transform 0.2s ease;
    }

    .logo-section a:hover {
      transform: scale(1.1);
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .mobile-toggle {
        display: block;
        // margin-top:0px;
      }

      .sidebar {
        width: 75%;
        max-width: 300px;
        background: #ffffff;
        height: 100vh;
        top: 0;
        left: -100%;
        border-radius: 0;
        z-index: 1500;
        box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      }

      .sidebar.open {
        left: 0;
      }
    }

    @media (max-width: 400px) {
      .sidebar {
        width: 100%;
        padding: 16px;
      }
.mobile-toggle {
        display: block;
      }
      .sidebar-title {
        font-size: 1.5rem;
      }

      .sidebar-link {
        padding: 10px;
        font-size: 0.95rem;
      }

      .logo-section {
        justify-content: space-around;
      }
    }
  `}
        </style>
      </style>
    </>
  );
}

export default Sidebar;
