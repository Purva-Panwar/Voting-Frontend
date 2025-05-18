import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Candidate from "../components/Candidate";
import ConfirmVote from "../components/ConfirmVote";

const Candidates = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const { id: selectedElection } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [canVote, setCanVote] = useState(true);

  const voteCandidateModalShowing = useSelector(
    (state) => state.ui.voteCandidateModalShowing
  );

  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const votedElections = useSelector(
    (state) => state?.vote?.currentVoter?.votedElections
  );

  const getCandidates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  //chheck voter has already voted
  const getVoter = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const votedElections = await response.data.votedElections;
      if (votedElections.includes(selectedElection)) {
        setCanVote(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCandidates();
    getVoter();
    if (votedElections.includes(selectedElection)) {
      setCanVote(false);
    }
  }, []);

  const [isAccountVerified, setIsAccountVerified] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
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
  // ✅ Added dependencies

  return (
    <>
      <section className="candidates">
        {!canVote ? (
          <div className="can">
            <header className="already-voted-container">
              <h1>Already Voted</h1>
              <p>
                You are only permitted to vote once in this election. Please
                vote in another election or sign out.
              </p>
              <p>Thank you for participating in this election.</p>
            </header>
          </div>
        ) : (
          <>
            {candidates.length > 0 ? (
              <div className="can">
                {isAccountVerified ? (
                  <header className="already-voted-container ">
                    <h1>Vote for your candidate</h1>
                    <p>
                      These are the candidates for the selected election. Please
                      vote wisely, as you won’t be able to vote again in this
                      election.
                    </p>
                  </header>
                ) : (
                  <header className="already-voted-container ">
                    <h1>Vote for Election</h1>
                    <p>
                      Please firstly verify your Account for click above verify
                      email link .After OTP verification you are able to vote.
                    </p>
                  </header>
                )}
              </div>
            ) : (
              <header className="candidate_header">
                <h1>Inactive Election</h1>
                <p>
                  There are no candidates found for this election. Please check
                  back later.
                </p>
              </header>
            )}
            <div className="container candidates_container">
              {candidates.map((candidate) => (
                <Candidate key={candidate._id} {...candidate} />
              ))}
            </div>
          </>
        )}
      </section>
      {voteCandidateModalShowing && (
        <ConfirmVote selectedElection={selectedElection} />
      )}
    </>
  );
};

export default Candidates;
