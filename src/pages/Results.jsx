import React, { useEffect, useState } from "react";
import ResultElection from "../components/ResultElection";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [elections, setElections] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const getElections = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/elections`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setElections(response.data);
    } catch (error) {
      console.error(
        "Error fetching elections:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      getElections();
    }
  }, [token]);

  // Filter elections whose end date has passed
  const now = new Date();
  const endedElections = elections.filter((election) => {
    const endDate = new Date(election.endDate);
    return endDate <= now;
  });

  return (
    <section className="results">
      <div className="container results_container">
        {endedElections.length > 0 ? (
          endedElections.map((election) => (
            <ResultElection key={election._id} {...election} />
          ))
        ) : (
          <p>No completed elections to show results for.</p>
        )}
      </div>
    </section>
  );
};

export default Results;

// import React, { useEffect, useState } from "react";
// import ResultElection from "../components/ResultElection";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Results = () => {
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   const navigate = useNavigate();
//   //access control
//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   });
//   const [elections, setElections] = useState([]);
//   const API_URL = process.env.REACT_APP_API_URL;
//   const getElections = async () => {
//     if (!token) return; // Prevent API call if no token

//     try {
//       const response = await axios.get(`${API_URL}/elections`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true, // Remove if unnecessary
//       });

//       setElections(response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching elections:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getElections();
//     }
//   }, [token]);

//   return (
//     <>
//       <section className="results">
//         <div className="container results_container">
//           {elections.map((election) => (
//             <ResultElection key={election._id} {...election} />
//           ))}

//         </div>
//       </section>
//     </>
//   );
// };

// export default Results;
