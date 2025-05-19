import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosMoon } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import "../store/vote-slice";
import { Home, Info, LogOut, Phone, LogIn, Layers, Mail } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(window.innerWidth >= 700);
  const [isAccountVerified, setIsAccountVerified] = useState(false);

  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  // Update showNav on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeNavMenu = () => {
    if (window.innerWidth < 700) {
      setShowNav(false);
    }
  };

  const sendVerificationOtp = async (voterId, token) => {
    if (!voterId) {
      alert("Your email is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/send-otp`,
        { voterId },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        navigate("/email-verify");
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!token || !voterId) return;

      try {
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
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8487/8487642.png"
            alt=""
          />
          e-Votehub
        </Link>

        <div>
          {showNav && (
            <menu>
              <NavLink to="/" onClick={closeNavMenu}>
                <Home />
                <br />
                Home
              </NavLink>
              <NavLink to="/about" onClick={closeNavMenu}>
                <Info />
                <br />
                About
              </NavLink>
              <NavLink to="/contact" onClick={closeNavMenu}>
                <Phone />
                <br />
                Contact
              </NavLink>
              <NavLink to="/features" onClick={closeNavMenu}>
                <Layers />
                <br />
                Features
              </NavLink>

              {token ? (
                <>
                  {!isAccountVerified && (
                    <NavLink
                      to="/email-verify"
                      onClick={(e) => {
                        e.preventDefault();
                        sendVerificationOtp(voterId, token);
                      }}
                    >
                      <Mail />
                      <br />
                      Verify Email
                    </NavLink>
                  )}
                  <NavLink to="/logout" onClick={closeNavMenu}>
                    <LogOut />
                    <br />
                    Logout
                  </NavLink>
                  <div className="profile-contain">
                    <NavLink
                      to="/profile"
                      onClick={closeNavMenu}
                      className="profile-initial"
                    >
                      <img
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.145594747.1747650246&semt=ais_hybrid&w=740"
                        alt="Profile"
                      />
                    </NavLink>
                  </div>
                </>
              ) : (
                <NavLink to="/login" onClick={closeNavMenu}>
                  <LogIn />
                  <br />
                  Login
                </NavLink>
              )}
            </menu>
          )}

          <button
            className="nav_toggle-btn"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>

      <style>
        {`
          .verify-btn-nav {
            background-color: orange;
            padding: 7px 10px;
            border-radius: 7px;
          }

          .profile-contain {
            position: relative;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
            background-color: rgb(14, 14, 90);
            border-radius: 50%;
          }

          .profile-initial {
            width: 50px;
            height: 50px;
            color: white;
            font-size: 30px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .profile-initial img {
            border-radius: 50%;
          }

          @media (max-width: 768px) {
            .profile-contain {
              width: 20px;
              height: 20px;
              margin: 25px;
            }

            .profile-initial {
              width: 20px;
              height: 20px;
            }

            .profile-initial img {
              width: 50px;
              height: 50px;
            }
            .container{
            padding-left:40px;}
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
