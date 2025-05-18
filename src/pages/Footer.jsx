import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faTelegram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Products</h3>
            <ul>
              <li>
                🗳️
                <a href="/"> Online Voting</a>
              </li>
              <li>
                {" "}
                ⚙️
                <a href="/works"> How it works!</a>
              </li>
              <li>
                🔒
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                {" "}
                📜
                <a href="/terms">Terms and Condition</a>
              </li>
              <li>
                <span>📞 </span>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-section follow">
            <h3>Follow Us</h3>
            <div className="flex logo space-x-4 logo">
              <a
                href="https://www.instagram.com/purvi.rajput17/?utm_source=qr&r=nametag"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="3x"
                  style={{ color: "#E4405F" }}
                />
              </a>
              <br />
              <a
                href="https://github.com/Purva-Panwar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  size="3x"
                  style={{ color: "#333" }}
                />
              </a>
              <br />
              <a
                href="https://www.linkedin.com/in/purva-panwar-797931293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="3x"
                  style={{ color: "#0077B5" }}
                />
              </a>
              <br />
              <a
                href="https://youtube.com/@purvapanwar4273?si=VFG410iNRKscqVvc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="3x"
                  style={{ color: "#0088CC" }}
                />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Our certificates</h3>
            <div className="certificates ">
              <img
                className="image1"
                src="https://www.polyas.com/wp-content/uploads/2024/07/BSI-certificate-online-voting.png"
                alt="Certificate 1"
              />
              <img
                src="https://www.polyas.com/wp-content/uploads/2024/11/ISO-Logo-neu-freigestellt-2024.png"
                alt="Certificate 2"
              />
            </div>
          </div>

          <div className=" ftr">
            <img
              style={{ height: "200px" }}
              src="https://img.freepik.com/premium-vector/vote-india-general-election-political-background-with-hand-finger-lineart-design_586724-494.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
              alt=""
            />
            <br />
          </div>
         
        </div>
      </footer>
    </div>
  );
};

export default Footer;
