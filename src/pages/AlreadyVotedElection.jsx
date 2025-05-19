import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Election from "../components/Election";
import AddElectionModal from "../components/AddElectionModal";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/ui-slice";
import UpdateElectionModal from "../components/UpdateElectionModal";
import axios from "axios";
import Loader from "./../components/Loader";
import { useNavigate } from "react-router-dom";

const AlreadyVotedElections = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();

  // Access control
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const electionModalShowing = useSelector(
    (state) => state.ui.electionModalShowing
  );
  const updateElectionModalShowing = useSelector(
    (state) => state.ui.updateElectionModalShowing
  );

  const openModal = () => {
    dispatch(UiActions.openElectionModal());
  };

  const getElections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections`,
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const now = new Date();
      const activeElections = response.data.filter((election) => {
        const start = new Date(election.startDate);
        const end = new Date(election.endDate);
        return start <= now && end >= now;
      });

      const alreadyVotedElections = activeElections.filter(
        (election) => election.voters.includes(voterId) // Assuming `election.voters` contains an array of voter IDs
      );

      setElections(alreadyVotedElections);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
  }, [token, voterId]); // ✅ Include voterId in dependencies

  useEffect(() => {
    getElections();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="elections-page"
    >
      <section className="elections">
        <div className="container elections_container">
          <header className="elections_header">
            <div className="ver">
              {!isAccountVerified && (
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Please verify your Account for Vote Election
                </motion.h3>
              )}
            </div>

            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn primary"
                onClick={openModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Create New Election
              </motion.button>
            )}
          </header>

          {loading ? (
            <Loader />
          ) : (
            <div className="elections_grid">
              <AnimatePresence>
                {elections.map((election, index) => (
                  <motion.div
                    key={election._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <Election {...election} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {elections.length === 0 && !loading && (
            <motion.div
              className="no-elections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>You are Vote any election...</p>
            </motion.div>
          )}
        </div>
      </section>

      {electionModalShowing && <AddElectionModal />}
      {updateElectionModalShowing && <UpdateElectionModal />}

      <style jsx>{`
        /* Base Styles */
        .elections-page {
          min-height: calc(100vh - 80px);
          padding: 1rem 0;
          background: rgb(228, 231, 235);
          margin: 0;
        }

        .container {
          max-width: 1000px;
          // margin: 0 auto;
          padding: 0 0rem;
        }

        /* Header Styles */
        .elections_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .elections_header h1 {
          font-size: 2rem;
          color: rgb(33, 53, 87);
          font-weight: 700;
          margin: 0;
          flex-grow: 1;
          text-align: left;
        }
        .elections_header h3 {
          margin: 0;
          flex-grow: 1;
          text-align: left;
          color: rgb(225, 33, 33);
          font-size: 27px;
          padding-bottom: 5px;
        }
        /* Button Styles */
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          outline: none;
        }

        .btn.primary {
          background-color: #3b82f6;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
        }

        .btn.primary:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
        }

        /* Elections Grid */
        .elections_grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1rem;
          margin-top: 1.2rem;
        }

        /* No Elections Message */
        .no-elections {
          text-align: center;
          padding: 3rem;
          background: rgb(241, 241, 241);
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .no-elections p {
          font-size: 1.1rem;
          color: #64748b;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .elections_header h1 {
            font-size: 1.75rem;
          }

          .btn.primary {
            padding: 0.7rem 1.4rem;
          }
        }

        @media (max-width: 768px) {
          .elections_header {
            flex-direction: column;
            align-items: flex-start;
          }

          .elections_grid {
            grid-template-columns: 1fr;
          }

          .elections_header h1 {
            font-size: 1.5rem;
            text-align: center;
            margin-bottom: 1rem;
          }

          .btn.primary {
            padding: 0.6rem 1.2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .elections_header h1 {
            font-size: 1.2rem;
          }

          .btn.primary {
            padding: 0.5rem 1.1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AlreadyVotedElections;
