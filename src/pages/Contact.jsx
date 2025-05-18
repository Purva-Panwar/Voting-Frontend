import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaEnvelope,
  FaClock,
  FaPhone,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const email = useSelector((state) => state?.vote?.currentVoter?.email);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-page"
    >
      <div className="contact-container">
        <motion.div
          className="contact-image-container"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
            alt="Contact Support"
            className="contact-image"
          />
        </motion.div>

        <motion.div
          className="contact-details"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>CONTACT US</h2>
          <p className="intro-text">
            Do you have any further questions? We are more than happy to help
            you.
          </p>

          <div className="support-section">
            <h3>Contact our support</h3>

            <div className="contact-method">
              <FaEnvelope className="contact-icon" />
              <div>
                <strong>Email:</strong> help@onlinevoting.com
              </div>
            </div>

            <div className="contact-method">
              <FaClock className="contact-icon" />
              <div>
                <strong>Hours:</strong> Mon-Fri from 9:00 a.m. to 5 p.m.
              </div>
            </div>

            <div className="contact-method">
              <FaPhone className="contact-icon" />
              <div>
                <strong>Phone:</strong> 9876543210
              </div>
            </div>

            <div className="contact-method">
              <FaPhoneAlt className="contact-icon" />
              <div>
                <strong>Toll-Free:</strong> 1800-0000-0000
              </div>
            </div>
          </div>

          {/* {token && (
            <div className="verification-status">
              <h3>Account Status</h3>
              {isAccountVerified ? (
                <div className="verified">
                  <FaCheckCircle className="status-icon verified" />
                  <span>Your account is verified and ready for voting</span>
                </div>
              ) : (
                <div className="not-verified">
                  <div>
                    Your account needs verification to participate in elections
                  </div>
                </div>
              )}
            </div>
          )} */}
        </motion.div>
      </div>

      <style jsx>{`
        .contact-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          color: #333;
          margin-top: 70px;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 0 1rem;
        }

        .contact-header h1 {
          font-size: 2.2rem;
          color: #2c3e50;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .contact-header p {
          font-size: 1.1rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          background-color: #f9f9f9;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .contact-image-container {
          flex: 1;
          min-width: 300px;
          display: flex;
          justify-content: center;
        }

        .contact-image {
          max-width: 100%;
          max-height: 400px;
          border-radius: 10px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .contact-details {
          flex: 1;
          min-width: 300px;
          padding: 0 1rem;
        }

        .contact-details h2 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .intro-text {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .support-section {
          margin-bottom: 2rem;
        }

        .support-section h3 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
          display: inline-block;
        }

        .contact-method {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem;
          font-size: 1.1rem;
        }

        .contact-icon {
          margin-right: 1rem;
          color: #3498db;
          font-size: 1.3rem;
          min-width: 30px;
        }

        .verification-status {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1.5rem;
          margin-top: 2rem;
          border: 1px solid #e0e0e0;
        }

        .verification-status h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .verified {
          display: flex;
          align-items: center;
          color: #27ae60;
          font-weight: 500;
        }

        .not-verified {
          color: #e74c3c;
        }

        .status-icon {
          margin-right: 0.7rem;
          font-size: 1.3rem;
        }

        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
            padding: 1.5rem;
          }

          .contact-details {
            padding: 0;
          }

          .contact-header h1 {
            font-size: 1.8rem;
          }

          .contact-details h2 {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .contact-page {
            padding: 1rem;
          }

          .contact-header h1 {
            font-size: 1.6rem;
          }

          .contact-header p,
          .contact-method {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Contact;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// // import "./Contact.css";
// // import contactImage from "./contact.jpg"; // Replace with the correct image path

// const Contact = () => {
//   const [show, setShow] = useState(false);
//   const [isAccountVerified, setIsAccountVerified] = useState(false);
//   const navigate = useNavigate();
//   const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   const email = useSelector((state) => state?.vote?.currentVoter?.email);

//   const sendVerificationOtp = async (voterId, token) => {
//     if (!voterId) {
//       console.error("Voter email is missing.");
//       alert("Your email is missing. Please log in again.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/voters/send-otp`,
//         { voterId },
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.success) {
//         console.log(response.data.message);
//         navigate("/email-verify");
//       }
//     } catch (error) {
//       console.error(
//         "Error sending OTP:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   useEffect(() => {
//     const fetchVerificationStatus = async () => {
//       try {
//         if (!token || !voterId) {
//           console.log("Token or Voter ID not found");
//           return;
//         }

//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
//           {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setIsAccountVerified(response.data.isAccountVerified);
//       } catch (error) {
//         console.error("Error fetching verification status:", error);
//       }
//     };

//     fetchVerificationStatus();
//   }, [token, voterId]);
//   return (
//     <>
//       <div className="contact-container">
//         <div className="contact-image">
//           <img
//             src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1742066720~exp=1742070320~hmac=ce58f29e7e3aaec51c87a8b53bfa4ed1367636f8efeb1d1792d0de38640a893b&w=826"
//             alt="Contact Us"
//           />
//         </div>
//         <div className="contact-details">
//           <h2>CONTACT US</h2>
//           <p>
//             Do you have any further questions? We are more than happy to help
//             you.
//           </p>
//           <br />
//           <br />

//           <h3>Contact our support</h3>
//           <p>
//             📧 <strong>Email :</strong> help@onlinevoting.com
//           </p>
//           <p>
//             {" "}
//             ⏰ <strong>Time :</strong>Mon-Fri from 9:00 a.m. to 5 p.m.
//           </p>
//           <p>
//             📞 <strong>Phone :</strong> 9876543210
//           </p>
//           <p>
//             ☎️ <strong>Toll-Free :</strong> 1800-0000-0000
//           </p>
//           {/* <div className="buttons">
//             {!isAccountVerified && token && (
//               <NavLink
//                 className="btn btn-primary"
//                 to="/email-verify"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   sendVerificationOtp(voterId, token);
//                   // setShowNav(false);
//                 }}
//               >
//                 Start Now
//               </NavLink>
//             )}
//             {isAccountVerified && (
//               <a href="elections">
//                 <button className="btn btn-primary">Start now</button>
//               </a>
//             )}
//           </div> */}
//         </div>
//         <style>
//           {`
//           /* General container styles */
// .contact-container {

// margin-top:50px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 40px;
//   background-color: #f9f9f9;
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease-in-out;
// }

// .contact-container:hover {
//   transform: scale(1.02);
// }

// /* Animation for contact image */
// .contact-image img {
//   max-width: 100%;
//   max-height: 300px;
//   border-radius: 10px;
//   object-fit: cover;
//   animation: slideIn 1s ease-out;
// }

// @keyframes slideIn {
//   0% {
//     opacity: 0;
//     transform: translateX(-30px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// /* Contact details styles */
// .contact-details {
//   flex: 1;
//   padding-left: 20px;
//   text-align: left;
//   animation: fadeInUp 1s ease-out;
// }

// @keyframes fadeInUp {
//   0% {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// .contact-details h2 {
//   font-size: 2rem;
//   color: #333;
//   font-weight: bold;
//   margin-bottom: 20px;
//   transition: color 0.3s ease;
// }

// .contact-details h3 {
//   font-size: 1.5rem;
//   color: #555;
//   margin: 10px 0;
// }

// .contact-details p {
//   font-size: 1rem;
//   color: #666;
//   line-height: 1.5;
// }

// /* Button styles */
// .buttons .btn {
//   background-color: #007bff;
//   color: white;
//   font-size: 1rem;
//   padding: 10px 20px;
//   border-radius: 5px;
//   transition: background-color 0.3s ease, transform 0.3s ease;
//   cursor: pointer;
// }

// .buttons .btn:hover {
//   background-color: #0056b3;
//   transform: translateY(-3px);
// }

// .buttons .btn:active {
//   transform: translateY(1px);
// }

// /* Footer section (Uncomment if needed) */
// .footer-container {
//   display: flex;
//   justify-content: space-between;
//   padding: 40px;
//   background-color: #fff;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   margin-top: 40px;
//   animation: fadeInUp 1.5s ease-out;
// }

// .footer-section h3 {
//   font-size: 1.5rem;
//   margin-bottom: 10px;
// }

// .footer-section ul {
//   list-style-type: none;
//   padding: 0;
// }

// .footer-section ul li {
//   margin-bottom: 10px;
// }

// .follow a {
//   margin-right: 15px;
// }

// .certificates img {
//   width: 150px;
//   margin-top: 10px;
//   animation: fadeInUp 2s ease-out;
// }

// /* Footer bottom styles */
// .footer-bottom {
//   text-align: center;
//   font-size: 0.875rem;
//   color: #777;
//   padding: 20px;
// }
// `}
//         </style>
//       </div>
//       {/*
//       <footer className="footer">
//         <div className="footer-container">
//           <div className="footer-section">
//             <h3>Products</h3>
//             <ul>
//               <li>
//                 🗳️
//                 <a href="/home"> Online Voting</a>
//               </li>
//               <li>
//                 {" "}
//                 ⚙️
//                 <a href="/works"> How it works!</a>
//               </li>
//               <li>
//                 🔒
//                 <a href="/privacy">Privacy Policy</a>
//               </li>
//               <li>
//                 {" "}
//                 📜
//                 <a href="/terms">Terms and Condition</a>
//               </li>
//               <li>
//                 <span>📞 </span>
//                 <a href="/contact">Contact Us</a>
//               </li>
//             </ul>
//           </div>

//           <div className="footer-section follow">
//             <h3>Follow Us</h3>
//             <div className="flex logo space-x-4">
//               <a
//                 href="https://www.instagram.com/purvi.rajput17/?utm_source=qr&r=nametag"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FontAwesomeIcon
//                   icon={faInstagram}
//                   size="3x"
//                   style={{ color: "#E4405F" }}
//                 />
//               </a>
//               <br />
//               <a
//                 href="https://github.com/Purva-Panwar"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FontAwesomeIcon
//                   icon={faGithub}
//                   size="3x"
//                   style={{ color: "#333" }}
//                 />
//               </a>
//               <br />
//               <a
//                 href="https://www.linkedin.com/in/purva-panwar-797931293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FontAwesomeIcon
//                   icon={faLinkedin}
//                   size="3x"
//                   style={{ color: "#0077B5" }}
//                 />
//               </a>
//               <br />
//               <a
//                 href="https://youtube.com/@purvapanwar4273?si=VFG410iNRKscqVvc"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FontAwesomeIcon
//                   icon={faYoutube}
//                   size="3x"
//                   style={{ color: "#0088CC" }}
//                 />
//               </a>
//             </div>
//           </div>

//           <div className="footer-section">
//             <h3>Our certificates</h3>
//             <div className="certificates ">
//               <img
//                 className="image1"
//                 src="https://www.polyas.com/wp-content/uploads/2024/07/BSI-certificate-online-voting.png"
//                 alt="Certificate 1"
//               />
//               <img
//                 src="https://www.polyas.com/wp-content/uploads/2024/11/ISO-Logo-neu-freigestellt-2024.png"
//                 alt="Certificate 2"
//               />
//             </div>
//           </div>

//           <div className=" ftr">
//             <img
//               src="https://img.freepik.com/premium-vector/vote-india-general-election-political-background-with-hand-finger-lineart-design_586724-494.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
//               alt=""
//             />
//             <br />
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p>@panwarwpurva394@gmail.com</p>
//         </div>
//       </footer> */}
//     </>
//   );
// };

// export default Contact;
