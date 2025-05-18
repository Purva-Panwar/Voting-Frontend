import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UiActions } from "../store/ui-slice";
import { voteActions } from "../store/vote-slice";
import axios from "axios";

const Election = ({
  _id: id,
  title,
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  dispatch(voteActions.changeIdOfElectionToUpdate(id));

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  startDate = startDate.split("T")[0];
  endDate = endDate.split("T")[0];
  const now = new Date();
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  const isActive = now >= start && now <= end;
  const isLoggedIn = !!token; // Check if token exists

  const handleClick = () => {
    // dispatch(voteActions.changeIdOfElectionToUpdate(id));
    // dispatch(UiActions.openUpdateElectionModal());
    dispatch(UiActions.openUpdateElectionModal());
     dispatch(voteActions.changeIdOfElectionToUpdate(id));
    
  };

  // useEffect(() => {
  //   const fetchVerificationStatus = async () => {
  //     try {
  //       if (!token || !voterId) {
  //         console.log("Token or Voter ID not found");
  //         return;
  //       }

  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
  //         {
  //           withCredentials: true,
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       setIsAccountVerified(response.data.isAccountVerified);
  //     } catch (error) {
  //       console.error("Error fetching verification status:", error);
  //     }
  //   };

  //   fetchVerificationStatus();
  // }, [token, voterId]); // ✅ Include voterId in dependencies

  return (
    <article className={`election ${isActive ? "active" : "inactive"}`}>
      <div className="election_info">
        <Link to={`/elections/${id}`}>
          <h4>{title}</h4>
        </Link>

        <p>
          <b>Start Date:</b> {startDate}
          <br />
          <b>Start Time:</b> {startTime}
        </p>
        <p>
          <b>End date:</b> {endDate}
          <br />
          <b>End Time:</b> {endTime}
        </p>

        <p className={`status ${isActive ? "active" : "inactive"}`}>
          <b>Status:</b> {isActive ? " ✅ Active " : "🚫 Inactive"}
        </p>

        <div className="election_cta">
          <Link to={`/elections/${id}`} className="btn sm view-btn">
            View Details
          </Link>

          {/* Only show Enter Election button if logged in AND election is active */}

          <Link
            to={`/elections/${id}/candidates`}
            className={`btn danger sm ${!isActive ? "disabled" : ""}`}
            style={{
              pointerEvents: isActive ? "auto" : "none",
              opacity: isActive ? 1 : 0.5,
            }}
          >
            Enter Election
          </Link>

          {isAdmin && (
            <button className="btn sm primary" onClick={handleClick}>
              Edit
            </button>
          )}
        </div>
      </div>
      <style>
        {`
          /* Modern Election Card Styling */
          .election {
            display: flex;
            // flex-direction: column;
            align-items:left;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            padding: 5px 8px;
            margin: 0  auto 18px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            max-width: 700px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            overflow: hidden;
            position: relative;
            marginTop:0;
          }

          .election::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, #4361ee, #3a0ca3);
            transition: width 0.3s ease;
          }

          .election:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
            border-color: rgba(0, 0, 0, 0.1);
          }

          .election:hover::before {
            width: 6px;
          }

          /* Info Section */
          .election_info {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .election_info h4 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2b2d42;
            margin: 0;
            line-height: 1.3;
            transition: color 0.3s ease;
          }

          .election_info h4:hover {
            color: #4361ee;
          }

          .election_info p {
            color: #6c757d;
            font-size: 1rem;
            line-height: 1.6;
            margin: 0;
          }

          .status.active {
            color: #2e7d32;
          }

          .status.inactive {
            color:rgb(223, 91, 91);
          }

          /* Call to Action */
          .election_cta {
            margin-top: 24px;

            display: flex;
            gap: 16px;
            opacity: 0;
            animation: fadeInUp 0.6s 0.3s forwards cubic-bezier(0.22, 1, 0.36, 1);
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .election_cta .btn {
            padding: 5px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: none;
            position: relative;
            overflow: hidden;
            z-index: 1;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            width:100px;
          }

          .election_cta .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            z-index: -1;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.4s ease;
          }

          .election_cta .btn:hover::before {
            transform: scaleX(1);
            transform-origin: left;
          }

          .election_cta .view-btn {
            background: linear-gradient(135deg,rgb(33, 6, 88),rgb(99, 99, 225));
            color: white;
            box-shadow: 0 4px 12px rgba(76, 201, 240, 0.3);
          }

          .election_cta .view-btn:hover {
            box-shadow: 0 8px 20px rgba(76, 201, 240, 0.4);
            transform: translateY(-2px);
          }

          .election_cta .btn.primary {
            background: linear-gradient(135deg,rgb(88, 89, 96),rgb(34, 29, 47));
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
          }

          .election_cta .btn.primary:hover {
            box-shadow: 0 8px 20px rgba(92, 94, 101, 0.4);
            transform: translateY(-2px);
          }

          .election_cta .btn.danger {
            background: linear-gradient(135deg,rgb(247, 11, 11),rgb(232, 47, 47));
            color: white;
            box-shadow: 0 4px 12px rgba(247, 37, 133, 0.3);
          }

          .election_cta .btn.danger:hover {
            box-shadow: 0 8px 20px rgba(247, 37, 133, 0.4);
            transform: translateY(-2px);
          }

          .election_cta .btn.disabled {
            cursor: not-allowed;
          }
        `}
      </style>
    </article>
  );
};

export default Election;
