import React, { useEffect, useState } from "react";
import "./Home.css";
// import votingImage from "../assets/flag1.jpg"; // Replace with your actual image file
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";




const Home = () => {
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
      <div className="banner-container">
        <div className="banner-content">
          <h4 className="banner-title">Smart-Vote Online Voting System</h4>
          <h2 className="banner-heading">
            Digitalize your decision-making processes with our Online Voting
            System
          </h2>
          <ul className="banner-list">
            <li>Set up your online voting in less than an hour</li>
            <li>
              Benefit from our easy-to-use and secure online voting system
            </li>
            <li>
              Take a step closer to digital democracy with just one mouse click
            </li>
          </ul>
          <div className="banner-buttons">
            {/* <a href="elections">
              <button >Start now</button>
            </a> */}
            {isAccountVerified && (
              <a href="elections">
                <button className="start-button">Start now</button>
              </a>
            )}
            {!token ? (
              <>
                <NavLink className="start-button" to="/register">
                  Register
                </NavLink>
                <NavLink className="start-button" to="/login">
                  Login
                </NavLink>
              </>
            ) : (
              <>
                {!isAccountVerified && token && (
                  <NavLink
                    className="start-button"
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
               
              </>
            )}
            {/*  */}

            {/*  */}
          </div>
        </div>
        <div className="voting-left">
          <img
            src="https://img.freepik.com/free-vector/international-day-democracy_23-2148608691.jpg?ga=GA1.1.370840.1738764703&semt=ais_hybrid"
            alt="Voting"
            className="voting-img"
          />
        </div>
      </div>
      <div className="steps-container">
        <div className="voting-left">
          <img
            src="https://www.polyas.de/wp-content/uploads/2021/08/DSCF5516_bearb_5.jpg.webp"
            alt="Voting process"
          />
        </div>
        <div className="steps-content">
          <h2 className="steps-heading">Easy Online Voting in just 3 steps</h2>
          <p>
            1. The Online Voting System is extremely easy to use and navigate.
            Simply create an account and get started with your first online
            voting.
          </p>
          <br />
          <p>
            2. After a quick registration, all you need to do is choose the
            preferred type of online voting . Then, depending on the option you
            have chosen, you can create digital ballot papers, your electoral
            register, voter groups , list of candidates for a nomination, or
            customize your voter invitations . Moreover, you can track the voter
            turnout of your online voting in real time, customize the design and
            interface, and even develop additional individual features
          </p>
          <br />
          <p>
            3. Once you have set up your online voting, you can also conduct a
            test voting with up to 5 voters at no charge and get a better
            impression of how the Online Voting System works. More information
            about how it works .
          </p>
        </div>
      </div>
      <div className="vote-container">
        <div className="vote-content">
          <h2 className="vote-heading">Vote online anywhere and any time</h2>
          <p>
            Years of our experience in the Online Voting market have shown that
            digital voting reduces costs, provides greater accessibility and
            easier election management for both voters and election organizers,
            and minimizes potential mistakes from manual vote counting (as used
            in postal voting). Most importantly, it maximizes the adherence to
            democratic principles through secure voting software and, as a
            result, you increase voter turnout. To find out even more about the
            benefits of our Online Voting System
            <br />
            Our voting system is compatible with most Internet browsers and is
            available in 4 languages: German, English, French, and Italian. If
            you have any questions about how to use our Online Voting System,
            our will clarify every step necessary to take before, during, and
            after your online voting. Have you taken a thorough look through our
            Help Centre in all languages and you still have questions? Our
            exceptional Election Managers have the answers and can offer you
            individual consultation if you plan to organize a complex type of
            election. Find out more or contact us directly{" "}
          </p>
        </div>
        <div className="vote-image">
          <img
            src="https://www.polyas.de/wp-content/uploads/2021/08/Online-Buergerbeteiligung-mit-POLYAS-14-03-02-728.jpg.webp"
            alt="Voting online"
          />
        </div>
      </div>

      <div className="voting-container ">
        <div className="voting-left">
          <img
            src="https://www.polyas.de/wp-content/uploads/2021/10/Bildschirmfoto-2021-06-24-um-13.53.25.png.webp"
            alt=""
          />
        </div>
        <div className="voting-right">
          <h2>One Voting System – many ways to use it</h2>
          <p>
            Unsure about what type of voting your organization needs? Our Online
            Voting System can be used in many different ways and for many
            occasions:
          </p>
          <p>
            If you are looking for a way to elect management boards, advisory
            committees, or gender equality officers, you might go for a simple
            Online Election Getting immediate results – all at the same time?
            Choosing the right candidate, putting forward a whole list of
            candidates, or willing to nominate yourself?
          </p>
          <p>Vote – from any device and from anywhere in the world!</p>
        </div>
      </div>
     
    </>
  );
};

export default Home;
