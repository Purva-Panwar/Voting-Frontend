// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   const [stats, setStats] = useState({
//     activeElections: 0,
//     votedElections: 0,
//     upcomingElections: 0,
//     verificationStatus: "Pending",
//   });

//   const [isAccountVerified, setIsAccountVerified] = useState(false);

//   useEffect(() => {
//     const fetchElectionData = async () => {
//       try {
//         if (!token || !voterId) return;

//         const electionsRes = await axios.get(
//           `${process.env.REACT_APP_API_URL}/elections`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );

//         const voterRes = await axios.get(
//           `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );

//         const currentDate = new Date();
//         const allElections = electionsRes.data;
//         const votedElectionIds = voterRes.data.votedElections || [];

//         const activeElections = allElections.filter((election) => {
//           const startDate = new Date(election.startDate);
//           const endDate = new Date(election.endDate);
//           return startDate <= currentDate && endDate >= currentDate;
//         }).length;

//         const upcomingElections = allElections.filter((election) => {
//           const startDate = new Date(election.startDate);
//           return startDate > currentDate;
//         }).length;

//         const votedElections = allElections.filter((election) =>
//           votedElectionIds.includes(election._id)
//         ).length;

//         setStats({
//           activeElections,
//           votedElections,
//           upcomingElections,
//           verificationStatus: voterRes.data.isAccountVerified
//             ? "Verified"
//             : "Pending",
//         });

//         setIsAccountVerified(voterRes.data.isAccountVerified);
//       } catch (error) {
//         console.error("Error fetching election data:", error);
//       }
//     };

//     fetchElectionData();
//   }, [token, voterId]);

//   // Button click handlers with verification check
//   const handleNavigation = (path) => {
//     if (!isAccountVerified) {
//       alert("Please verify your account to access this feature.");
//       return;
//     }
//     navigate(path);
//   };

//   return (
//     <div className="voting-dashboard-container">
//       {/* Welcome Message */}
//       <div className="dashboard-header">
//         <div className="welcome-section">
//           <h2 className="welcome-title">
//             Welcome <span className="highlight">Voter</span>!
//           </h2>
//           <h2 className="platform-title">Online Voting Platform</h2>
//           <p className="platform-description">
//             Participate in elections, track your voting history, and verify your
//             voter status all in one secure platform.
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         <div
//           className='stat-card active-elections'
//             //  ${!isAccountVerified ? "disabled" : ""}

//           onClick={() => handleNavigation("/activeElections")}
//         >
//           <div className="stat-value">{stats.activeElections}</div>
//           <div className="stat-label">Ongoing Elections</div>
//         </div>

//         <div
//           className={`stat-card voted-elections ${
//             !isAccountVerified ? "disabled" : ""
//           }`}
//           onClick={() => handleNavigation("/alreadyVotedElections")}
//         >
//           <div className="stat-value">{stats.votedElections}</div>
//           <div className="stat-label">Voted Elections</div>
//         </div>

//         <div
//           className={`stat-card upcoming-elections ${
//             !isAccountVerified ? "disabled" : ""
//           }`}
//           onClick={() => handleNavigation("/upcomingElections")}
//         >
//           <div className="stat-value">{stats.upcomingElections}</div>
//           <div className="stat-label">Upcoming Elections</div>
//         </div>

//         <div
//           className={`stat-card verification-status ${stats.verificationStatus.toLowerCase()}`}
//         >
//           <div className="stat-value">
//             {isAccountVerified ? "Verified" : "Pending"}
//           </div>
//           <div className="stat-label">Verification Status</div>
//         </div>
//       </div>

//       {/* Quick Vote & Verification */}
//       <div className="voting-actions">
//         <button
//           className="action-button quick-vote"
//           onClick={() => handleNavigation("/elections")}
//         >
//           <span>Quick Vote</span>
//           <span className="button-icon">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M5 12H19M19 12L12 5M19 12L12 19"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </span>
//         </button>

//         {!isAccountVerified && (
//           <button
//             className="action-button verify-identity"
//             onClick={() => navigate("/verification")}
//           >
//             <span>Verify Identity</span>
//             <span className="button-icon">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//           </button>
//         )}
//       </div>

//       <style jsx>{`
//         .disabled {
//           opacity: 0.5;
//           pointer-events: none;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.vote?.currentVoter?.id);
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const [stats, setStats] = useState({
    activeElections: 0,
    votedElections: 0,
    upcomingElections: 0,
    verificationStatus: "Pending",
  });

  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [profile, setProfile] = useState(null);

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
    const fetchElectionData = async () => {
      try {
        if (!token || !voterId) return;

        // Fetch all elections
        const electionsRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/elections`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        // Fetch voter's voted elections
        const voterRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const currentDate = new Date();
        const allElections = electionsRes.data;
        const votedElectionIds = voterRes.data.votedElections || [];

        // Calculate counts
        const activeElections = allElections.filter((election) => {
          const startDate = new Date(election.startDate);
          const endDate = new Date(election.endDate);
          return startDate <= currentDate && endDate >= currentDate;
        }).length;

        const upcomingElections = allElections.filter((election) => {
          const startDate = new Date(election.startDate);
          return startDate > currentDate;
        }).length;

        const votedElections = allElections.filter((election) =>
          votedElectionIds.includes(election._id)
        ).length;

        setStats({
          activeElections,
          votedElections,
          upcomingElections,
          verificationStatus: voterRes.data.isAccountVerified
            ? "Verified"
            : "Pending",
        });

        setIsAccountVerified(voterRes.data.isAccountVerified);
        setProfile(voterRes.data);
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    };

    fetchElectionData();
  }, [token, voterId]);

  const handleActiveElectionsClick = () => {
    navigate("/activeElections");
  };

  const handleVotedElectionsClick = () => {
    navigate("/alreadyVotedElections");
  };

  const handleUpComingElectionsClick = () => {
    navigate("/upcomingElections");
  };

  return (
    <div className="voting-dashboard-container">
      {/* Welcome Message */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h2 className="welcome-title">
            Welcome <span className="highlight">Voter</span>!
          </h2>
          <h2 className="platform-title">Online Voting Platform</h2>
          <p className="platform-description">
            Participate in elections, track your voting history, and verify your
            voter status all in one secure platform.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {/* {isAccountVerified && ( */}
      <div className="stats-grid">
        <div
          className="stat-card active-elections"
          onClick={handleActiveElectionsClick}
        >
          <div className="stat-value">{stats.activeElections}</div>
          <div className="stat-label">Ongoing Elections</div>
          <div className="card-hover-effect"></div>
        </div>

        <div
          className="stat-card voted-elections"
          onClick={handleVotedElectionsClick}
        >
          <div className="stat-value">{stats.votedElections}</div>
          <div className="stat-label">Voted Elections</div>
          <div className="card-hover-effect"></div>
        </div>

        <div
          className="stat-card upcoming-elections"
          onClick={handleUpComingElectionsClick}
        >
          <div className="stat-value">{stats.upcomingElections}</div>
          <div className="stat-label">Upcoming Elections</div>
          <div className="card-hover-effect"></div>
        </div>

        {!isAccountVerified && token ? (
          <NavLink
            to="/email-verify"
            onClick={(e) => {
              e.preventDefault();
              sendVerificationOtp(voterId, token);

              // setShowNav(false);
            }}
          >
            <div
              className={`stat-card verification-status ${stats.verificationStatus.toLowerCase()}`}
            >
              <div className="stat-value">
                {isAccountVerified ? "Verified" : "Pending"}
              </div>
              <div className="stat-label">Verification Status</div>
              <div className="card-hover-effect"></div>
            </div>
          </NavLink>
        ) : (
          <>
            {" "}
            <div
              className={`stat-card verification-status ${stats.verificationStatus.toLowerCase()}`}
            >
              <div className="stat-value">
                {isAccountVerified ? "Verified" : "Pending"}
              </div>
              <div className="stat-label">Verification Status</div>
              <div className="card-hover-effect"></div>
            </div>
          </>
        )}
      </div>
      {/* )} */}

      {/* Additional Voting Sections */}
      <div className="voting-actions">
        <button
          className="action-button quick-vote"
          onClick={() => navigate("/elections")}
        >
          <span>Quick Vote</span>
          <span className="button-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {!isAccountVerified && (
          <button
            className="action-button verify-identity"
            to="/email-verify"
            onClick={(e) => {
              e.preventDefault();
              sendVerificationOtp(voterId, token);
            }}
            // onClick={() => navigate("/verification")}
          >
            <span>Verify Identity</span>
            <span className="button-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        )}
        {/* {!isAccountVerified && token && (
          <>
            <NavLink
              to="/email-verify"
              onClick={(e) => {
                e.preventDefault();
                sendVerificationOtp(voterId, token);

                // setShowNav(false);
              }}
            >
              Verify Email
            </NavLink>
          </>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;

// CSS Styles (same as before)
const styles = `
.voting-dashboard-container {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  max-width: 1200px;
  margin: 7rem auto;
  padding: 0 2rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dashboard-header {
  margin-bottom: 4rem;
  text-align: center;
}

.welcome-section {
  max-width: 700px;
  margin: 0 auto;
}

.welcome-title {
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color:rgb(52, 42, 147);
  line-height: 1.2;
}

.highlight {
  color:rgb(32, 16, 213);
  font-weight: 800;
}

.platform-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #374151;
}

.platform-description {
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 580px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 1.75rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
}

.card-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(79, 70, 229, 0.01) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.stat-card:hover .card-hover-effect {
  opacity: 1;
}

.active-elections {
  border-top: 3px solid #4f46e5;
}

.voted-elections {
  border-top: 3px solid #10b981;
}

.upcoming-elections {
  border-top: 3px solid #f59e0b;
}

.verification-status {
  border-top: 3px solid #6b7280;
}

.verification-status.verified {
  border-top: 3px solid #10b981;
  color: #10b981;
}

.verification-status.pending {
  border-top: 3px solid #ef4444;
  color:red;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color:rgb(14, 53, 130);
  transition: color 0.3s ease;
}


.stat-card:hover .stat-value {
  color: #4f46e5;
}

.voted-elections:hover .stat-value {
  color: #10b981;
}

.upcoming-elections:hover .stat-value {
  color: #f59e0b;
}

.verification-status:hover .stat-value {
  color: #6b7280;
}

.verification-status.verified:hover .stat-value {
  color: #10b981;
}

.verification-status.pending:hover .stat-value {
  color: #ef4444;
}

.stat-label {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.3s ease;
}

.voting-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.action-button {
  padding: 0.9rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: white;
  color: #4f46e5;
  border: 1px solid #e5e7eb;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #4f46e5;
  z-index: -1;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-button:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.action-button:hover {
  color: white;
  border-color: #4f46e5;
}

.verify-identity {
  color: #10b981;
  border-color: #d1fae5;
}

.verify-identity::before {
  background: #10b981;
}

.verify-identity:hover {
  border-color: #10b981;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.action-button:hover .button-icon {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .voting-dashboard-container {
    padding: 0 1.5rem;
    margin: 3rem auto;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .platform-title {
    font-size: 1.3rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .voting-actions {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
  
  .action-button {
    width: 100%;
    justify-content: center;
  }
}
  
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
