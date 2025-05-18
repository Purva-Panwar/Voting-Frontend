import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Works.css";

import Spinner from "../assets/Screenshot 2025-05-17 215608.png";
import elec from "../assets/Screenshot 2025-05-17 215627.png";
import candi from "../assets/Screenshot 2025-05-17 215730.png";
import res from "../assets/Screenshot 2025-05-17 220621.png";
import thank from "../assets/thank.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// import { first } from "../assets/1.png";

const Works = () => {
  const [show, setShow] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const navigate = useNavigate();
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const email = useSelector((state) => state?.vote?.currentVoter?.email);

  const sendVerificationOtp = async (voterId, token) => {
    if (!voterId) {
      console.error("Voter email is missing.");
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
        console.log(response.data.message);
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
      try {
        if (!token || !voterId) {
          console.log("Token or Voter ID not found");
          return;
        }

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
    <div className="main">
      <section className="hero-container">
        {/* Left Section */}
        <div className="hero-text">
          <h3 className="subheading">
            Online voting : <span> How use This Platform</span>
          </h3>
          <h1 className="head">Only 3 steps – and you Vote for Election</h1>
          <ul className="features">
            <li>✅ First register and login for website.</li>
            <li>
              ✅ Choose one candidate for a particular election and give Vote.
            </li>
            <li>✅ See result after election end.</li>
          </ul>
          <div className="button">
            {!isAccountVerified && token && (
              <NavLink
                className="btn btn-primary"
                to="/email-verify"
                onClick={(e) => {
                  e.preventDefault();
                  sendVerificationOtp(voterId, token);
                  // setShowNav(false);
                }}
              >
                Start Now
              </NavLink>
            )}
            {isAccountVerified && (
              <a href="elections">
                <button className="btn btn-primary">Start now</button>
              </a>
            )}
          </div>
        </div>

        {/* Right Section - Images */}
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/accept-request-concept-illustration_114360-2964.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
            alt="Laptop and phone"
            className="responsive-img"
          />
        </div>
      </section>
      <div>
        <p className="steps">Steps for Vote</p>
        {/* <h1>
          After<span>Registration</span> and <span>Login OTP </span>
          verification
        </h1> */}
      </div>

      <section className="ballot-container one ste">
        {/* Left - Image Section */}

        <div className="ballot-image">
          <img
            src={Spinner} // Replace with actual image URL
            alt="Ballot creation"
            className="responsive-img"
          />
        </div>

        {/* Right - Text Section */}
        <div className="ballot-text">
          <h2 className="heading">1. Dashboard Page</h2>
          <p className="description">
            The Dashboard Page of an Online Voting System serves as the entry
            point for users, providing essential information and navigation
            options. It typically includes a welcome message, election details
            and instructions on how to vote. It may also display real-time
            updates, security guidelines, and FAQs to ensure a smooth voting
            experience.
          </p>
          <ul className="features">
            <li>✅ click 'Election' button and move to election page.</li>
          </ul>
        </div>
      </section>
      <section className="ballot-container two">
        {/* Left - Image Section */}

        {/* Right - Text Section */}
        <div className="ballot-text">
          <h2 className="heading">2. Election Page</h2>
          <p className="description">
            The Election Page of an Online Voting System displays active
            elections, candidate details, and voting options. Users can view
            election , select their preferred candidates, and submit their votes
            securely. The page may include a progress tracker, voting deadlines,
            and security measures to ensure a transparent and fair election
            process.
          </p>
          <ul className="features">
            <li>✅ Click to enter Elections button and move to next page.</li>
          </ul>
        </div>
        <div className="ballot-image">
          <img
            src={elec} // Replace with actual image URL
            alt="Ballot creation"
            className="responsive-img"
          />
        </div>
      </section>
      <section className="ballot-container one">
        {/* Left - Image Section */}
        <div className="ballot-image">
          <img
            src={candi} // Replace with actual image URL
            alt="Ballot creation"
            className="responsive-img"
          />
        </div>

        {/* Right - Text Section */}
        <div className="ballot-text">
          <h2 className="heading">3.Election Candidate page</h2>
          <p className="description">
            The Election Candidates Page of an Online Voting System provides a
            list of all candidates participating in an election. It includes
            candidate names, photos, party affiliations, and brief manifestos or
            agendas. Users can click to vote button vote are added to selected
            candidate.
          </p>
          <ul className="features">
            <li>
              ✅ Click to Vote button ,vote are successfully added to candidate
              and move to congrats page.
            </li>
          </ul>
        </div>
      </section>
      <section className="ballot-container two">
        {/* Left - Image Section */}

        {/* Right - Text Section */}
        <div className="ballot-text">
          <h2 className="heading">4. Thanks Page</h2>
          <p className="description">
            After you are successfully vote to selected candidate than we will
            move to thanks page .thanks page you are successfully voted to
            election and your vote are counted to candidate vote.
          </p>
        </div>
        <div className="ballot-image">
          <img
            src={thank} // Replace with actual image URL
            alt="Ballot creation"
            className="responsive-img"
          />
        </div>
      </section>
      <section className="ballot-container one">
        {/* Left - Image Section */}

        {/* Right - Text Section */}
        <div className="ballot-image">
          <img
            src={res} // Replace with actual image URL
            alt="Ballot creation"
            className="responsive-img"
          />
        </div>
        <div className="ballot-text">
          <h2 className="heading">5. Result Page</h2>
          <p className="description">
            The result page of an online voting system displays the final
            tallies of votes in a clear and organized manner. It typically
            includes candidate names, the number of votes received, and
            percentage calculations. The page may feature real-time updates,
            graphical representations like bar charts or pie charts, and options
            to filter.
          </p>
          <ul className="features">
            <li>✅ Shoe final output who can won the election.</li>
          </ul>
          <p>Stop</p>
        </div>
      </section>
    </div>
  );
};

export default Works;
