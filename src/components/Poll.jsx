import React from "react";
import { useLocation } from "react-router-dom";
import CandidateRating from "./CandidateRating";
import "./Poll.css";
import CandidateRating2 from "./CandidateRating2";

const Poll = () => {
  const location = useLocation();
  const { electionCandidates, totalVotes, title } = location.state || {};

  if (!electionCandidates || electionCandidates.length === 0) {
    return <p>No results available. Please check again.</p>;
  }

  return (
    <div className="res">
      <div className="poll-container">
        <h2 className="poll-header">{title} - Election Results</h2>
        <div className="poll-box">
          <div className="poll-image">
            <img
              src={electionCandidates[0].image}
              alt={title}
              className="poll-thumbnail"
            />
          </div>
          <div>
            <h3 className="poll-winner">
              🏆 Winner: {electionCandidates[0].fullName}
            </h3>
            <p className="poll-votes">
              Votes: {electionCandidates[0].voteCount} / {totalVotes}
            </p>
          </div>
        </div>
      </div>
      <div className="table">
        <h1 className="table1">{/* Result Table */}</h1>
        <ul className="result_list ">
          <div className="result_candidate-info rci">
            <th>Image</th>
            <th>Full Name</th>
            <th>Total Votes</th>
            <th>Vote Percentage</th>
          </div>
          {electionCandidates.map((candidate) => (
            <CandidateRating
              key={candidate._id}
              {...candidate}
              totalVotes={totalVotes}
            />
          ))}
        </ul>
       
      </div>
      <style>
        {`
        /* Container styles for better spacing and focus */
.poll-container {
  background-color:rgb(244, 245, 247);
  padding: 10px 10px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 800px;
 /* Centered with margin for space */
  transition: all 0.3s ease;
}
.table{
  margin:10px 50px 10px 50px ;
  text-align: center;
  /* max-width: 800px; */
  /* background-color: ; */
}
/* Header styling for prominence */
.poll-header {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 25px;
  color: #222;
}

/* Layout for winner info, flex for responsiveness */
.poll-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  transition: transform 0.3s ease;
}

@media (min-width: 768px) {
  .poll-box {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

/* Image styling with focus and hover effects */
.poll-image {
  flex: 1;
  max-width: 250px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s, transform 0.3s;
}

.poll-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.poll-image:hover img {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* Winner details styling */
.winner-details {
  flex: 2;
  text-align: center;
  padding: 10px 20px;
}

.poll-winner {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.poll-winner::before {
  content: "";
  display: inline-block;
  margin-right: 8px;
  font-size: 2rem;
}

/* Votes info styling */
.poll-votes {
  font-size: 1.2rem;
  color: #555;
  margin-top: 8px;
}

/* Add some animation to highlight the winner section */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
  70% { box-shadow: 0 0 10px 10px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
}

/* Optional: highlight the winner container with a glow */
.winner-details {
  animation: pulse 2s infinite;
}
        `}
      </style>
    </div>
  );
};

export default Poll;
