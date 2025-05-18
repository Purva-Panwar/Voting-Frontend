import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { voteActions } from "../store/vote-slice";
import { useNavigate } from "react-router-dom";
// import CandidateRating from "./CandidateRating";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(voteActions.changeCurrentVoter(null));
    localStorage.removeItem("currentUser");
    navigate("/");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
