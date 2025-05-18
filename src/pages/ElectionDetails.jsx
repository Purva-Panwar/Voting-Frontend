import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ElectionCandidate from "../components/ElectionCandidate";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/ui-slice";
import AddCandidateModal from "../components/AddCandidateModal";
import axios from "axios";
import { voteActions } from "../store/vote-slice";

const ElectionDetails = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();
  //access control
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const [loading, setLoading] = useState(false);
  const [election, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

    const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

 

  const addCandidateModalShowing = useSelector(
    (state) => state.ui.addCandidateModalShowing
  );

  const getElection = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setElections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCandidates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCandidates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVoters = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${id}/voters`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVoters(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteElection = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/elections/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/elections");
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getElection();
    getCandidates();
    getVoters();
  }, []);
  const handleClick = () => {
    dispatch(UiActions.openUpdateElectionModal());
  };

  // open add candidate modal
  const openModal = () => {
    dispatch(UiActions.openAddCandidateModal());
    dispatch(voteActions.changeAddCandidateElectionId(id));
  };

  return (
    <>
      <section className="electionDetails">
        <div className="container electionDetails_container">
          <div className="c1">
            <div className="electionDetails_image">
              <img src={election.thumbnail} alt={election.title} />
            </div>
            <div className="head">
              <h2 className="tit">{election.title}</h2>
              <p className="des">{election.description}</p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="date">
                  Start Date : {election?.startDate?.split("T")[0] || "N/A"}
                </p>
                <p className="date">
                  Start Time : {election?.startTime?.split("T")[0] || "N/A"}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="date">
                  End Date : {election?.endDate?.split("T")[0] || "N/A"}
                </p>
                <p className="date">
                  End Time : {election?.endTime?.split("T")[0] || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <p className="date">
              Start Date : {election?.startDate?.split("T")[0] || "N/A"}
            </p>
            <p className="date">
              Start Time : {election?.startTime?.split("T")[0] || "N/A"}
            </p>
            <p className="date">
              End Date : {election?.endDate?.split("T")[0] || "N/A"}
            </p>
            <p className="date">
              End Time : {election?.endTime?.split("T")[0] || "N/A"}
            </p> */}
          </div>

          <menu className="electionDetails_candidates">
            <h1>Election CAndidates</h1>
            <div className="electionDetails_candidates1">
              {candidates.map((candidate) => (
                <ElectionCandidate key={candidate._id} {...candidate} />
              ))}
              {isAdmin && (
                <button className="add_candidate-btn" onClick={openModal}>
                  <IoAddOutline />
                </button>
              )}
            </div>
          </menu>

          <menu className="voters">
            <h2
              style={{
                background: " rgb(23, 23, 117)",
                color: "white",
                paddingBottom: "12px",
              }}
            >
              Voters
            </h2>
            <table className="voters_table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter) => (
                  <tr key={voter._id} className="bot">
                    <td>
                      <h5>{voter.fullName}</h5>
                    </td>
                    <td>{voter.email}</td>
                    <td>{voter.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </menu>
          <div className="election-actions">
            {isAdmin && (
              <>
                <button className="btn danger full" onClick={deleteElection}>
                  Delete Election
                </button>
              </>
            )}
          </div>
       
        </div>
      </section>

      {addCandidateModalShowing && <AddCandidateModal />}
    </>
  );
};

export default ElectionDetails;
