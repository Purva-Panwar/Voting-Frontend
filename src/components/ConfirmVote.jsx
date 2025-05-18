import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/ui-slice";
import axios from "axios";
import { voteActions } from "../store/vote-slice";
import { useNavigate } from "react-router-dom";

const ConfirmVote = ({ selectedElection }) => {
  const [modalCandidate, setModalCandidate] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get token and voter info from Redux
  const selectedVoteCandidate = useSelector(
    (state) => state?.vote?.selectedVoteCandidate
  );
  // console.log(selectedVoteCandidate ,"cand");

  // const token = ""
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const currentVoter = useSelector((state) => state?.vote?.currentVoter);
  const currentVoterId = useSelector((state) => state?.vote?.currentVoter?.id);

  // Close modal
  const closeCandidateModal = () => {
    dispatch(UiActions.closeVoteCandidateModal());
  };

  // Fetch the selected candidate
  const fetchCandidate = async () => {
    if (!selectedVoteCandidate || !token) return; // Prevent unnecessary calls

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setModalCandidate(response.data);
    } catch (error) {
      console.error("Error fetching candidate:", error.response?.data || error);
    }
  };

  // Confirm vote

  const confirmVote = async () => {
    try {
      // console.log(selectedElection, "ele");

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
        { currentVoterId, selectedElection },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const voteResult = await response.data;
      console.log("Vote result:", voteResult);

      // Update voter state
      dispatch(
        voteActions.changeCurrentVoter({
          ...currentVoter,
          votedElections: voteResult,
          // selectedElection,
        })
      );

      // Navigate to congrats page
      navigate("/congrats");
    } catch (error) {
      console.error("Error confirming vote:", error.response?.data || error);
    }
  };

  // Fetch candidate on component mount
  useEffect(() => {
    // if (selectedVoteCandidate) {
    fetchCandidate();
    // }
  }, []); // ✅ Only fetch when the candidate ID changes

  return (
    <section className="modal">
      <div className="modal_content confirm_vote-content">
        <h5>Please confirm your vote</h5>
        {modalCandidate ? (
          <>
            <div className="confirm_vote-image">
              <img src={modalCandidate?.image} alt={modalCandidate?.fullName} />
            </div>
            <h2>
              {modalCandidate?.fullName?.length > 17
                ? modalCandidate?.fullName.substring(0, 17) + "..."
                : modalCandidate?.fullName}
            </h2>
            <p>
              {modalCandidate?.motto?.length > 34
                ? modalCandidate?.motto.substring(0, 45) + "..."
                : modalCandidate?.motto}
            </p>
            <div className="confirm_vote-cta">
              <button className="btn" onClick={closeCandidateModal}>
                Cancel
              </button>
              <button className="btn primary" onClick={confirmVote}>
                Confirm
              </button>
            </div>
          </>
        ) : (
          <p>Loading candidate details...</p>
        )}
      </div>
    </section>
  );
};

export default ConfirmVote;
