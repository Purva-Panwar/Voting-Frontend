import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/ui-slice";
import { voteActions } from "../store/vote-slice";
import axios from "axios";
const Candidate = ({ image, _id: id, fullName, motto }) => {
  const dispatch = useDispatch();
  // const isVoted = useSelector((state) => state?.vote?.currentVoter?.isVoted);
  const [isVoted, setIsVoted] = useState(false);

  //confirm vote modal
  const openCandidateModal = () => {
    if (isVoted) {
      setIsVoted(true);
      return;
    }
    dispatch(UiActions.openVoteCandidateModal());
    dispatch(voteActions.changeSelectedVoteCandidate(id));
  };
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
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
  return (
    <>
      <article className="candidate">
        <div className="candidate-image">
          <img src={image} alt={fullName} />
        </div>
        <h5>
          {fullName?.length > 20
            ? fullName.substring(0, 20) < +"..."
            : fullName}
        </h5>
        <small>
          {motto?.length > 25 ? motto.substring(0, 25) + "..." : motto}
        </small>
        {isAccountVerified && (
        <button className="btn primary" onClick={openCandidateModal}>
          Vote
        </button>)}
      </article>
      
    </>
  );
};

export default Candidate;
