import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Terms.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Terms = () => {
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
    <>
      <div className="">
      
        <div className="terms-content">
          <h2>Terms and Conditions of Online Voting System</h2>
          <ul>
            <li>
              <strong>1. Eligibility:</strong> Only registered voters with valid
              identification are allowed to participate. Users must not vote on
              behalf of others or use fraudulent methods.
            </li>
            <li>
              <strong>2. Voting Process:</strong> Each voter is allowed only one
              vote per election. Manipulation or tampering with votes is
              strictly prohibited. Once submitted, a vote cannot be changed or
              revoked.
            </li>
            <li>
              <strong>3. Data Privacy & Security:</strong> Personal voter data
              (such as name, email, voter ID) is securely stored and encrypted.
              Voting choices remain confidential.
            </li>
            <li>
              <strong>4. Prohibited Activities:</strong> Unauthorized access,
              hacking, and disruption of the system are illegal. Users must not
              spread false information.
            </li>
            <li>
              <strong>5. System Availability:</strong> The voting system aims to
              remain operational, but in case of technical issues, the election
              authority may extend or reschedule voting.
            </li>
            <li>
              <strong>6. Compliance with Laws:</strong> Users must follow
              election laws. Violations may lead to legal action or
              disqualification.
            </li>
            <li>
              <strong>7. Amendments to Terms:</strong> The election authority
              can modify these terms at any time, and users will be notified of
              major changes.
            </li>
            <li>
              <strong>8. Contact Information:</strong> For issues or assistance,
              users can contact the election authority through official
              channels.
            </li>
          </ul>
          <div className="buttons">
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
           
          </div>
        </div>
      </div>

   
    </>
  );
};

export default Terms;
