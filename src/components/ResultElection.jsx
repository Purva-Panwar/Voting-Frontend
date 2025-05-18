import React, { useEffect, useState } from "react";
import CandidateRating from "./CandidateRating";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ResultElection = ({ _id: id, thumbnail, title, startDate, endDate }) => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();

  // Convert startDate and endDate into Date objects
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Election visibility conditions
  const isElectionStarted = now >= start;
  const isElectionEnded = now > end;

  const getCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let candidates = await response.data;

      // Sort candidates by vote count in descending order
      candidates.sort((a, b) => b.voteCount - a.voteCount);

      setElectionCandidates(candidates);

      // Calculate total votes
      const total = candidates.reduce(
        (sum, candidate) => sum + candidate.voteCount,
        0
      );
      setTotalVotes(total);
    } catch (error) {
      console.error(
        "Error fetching candidates:",
        error.response?.data || error.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id && token) {
      getCandidates();
    }
  }, [id, token]);

  return (
    <>
      {loading && <Loader />}
      <article className="result">
        {/* Show results only if the election has started */}
        {isElectionStarted ? (
          <>
            <header className="result_header">
              <h4>{title}</h4>
              <div className="result_header-image">
                <img src={thumbnail} alt={title} />
              </div>
            </header>

            <div>
              {electionCandidates.length > 0 && isElectionEnded && (
                <div className="winner-section">
                  <h2>🏆 Election Winner</h2>
                  <div className="winner-details">
                    <img
                      src={electionCandidates[0].image}
                      alt={electionCandidates[0].fullName}
                    />
                    <h3>{electionCandidates[0].fullName}</h3>
                    <p>
                      Total Votes:{" "}
                      <strong>
                        {electionCandidates[0].voteCount}/{totalVotes}
                      </strong>
                    </p>
                  </div>
                </div>
              )}

              <button
                className="enter-election-btn"
                onClick={() =>
                  navigate(`/poll/${id}`, {
                    state: { electionCandidates, totalVotes, title, thumbnail },
                  })
                }
              >
                Result
              </button>
            </div>
          </>
        ) : (
          <p>🕒 Election results will be available after the end date.</p>
        )}
      </article>
    </>
  );
};

export default ResultElection;
