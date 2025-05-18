// import React, { useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { UiActions } from "../store/ui-slice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UpdateElectionModal = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [startTime, setStartTime] = useState(""); // Added start time
//   const [endDate, setEndDate] = useState("");
//   const [endTime, setEndTime] = useState(""); // Added end time

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   const idOfElectionToUpdate = useSelector(
//     (state) => state?.vote?.idOfElectionToUpdate
//   );

//   // Close Update Election Modal
//   const closeModal = () => {
//     dispatch(UiActions.closeUpdateElectionModal());
//   };

//   const fetchElection = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const election = response.data;
//       setTitle(election.title);
//       setDescription(election.description);
//       setStartDate(election.startDate.split("T")[0]); // Extract date part
//       setStartTime(election.startDate.split("T")[1]?.slice(0, 5) || ""); // Extract time part
//       setEndDate(election.endDate.split("T")[0]); // Extract date part
//       setEndTime(election.endDate.split("T")[1]?.slice(0, 5) || ""); // Extract time part
//     } catch (error) {
//       console.error("Error fetching election:", error);
//     }
//   };

//   useEffect(() => {
//     if (idOfElectionToUpdate && token) {
//       fetchElection();
//     }
//   }, [idOfElectionToUpdate, token]);

//   const updateElection = async (e) => {
//     e.preventDefault();
//     try {
//       const electionData = new FormData();
//       electionData.set("title", title);
//       electionData.set("description", description);
//       electionData.set("thumbnail", thumbnail);
//       electionData.set("startDate", `${startDate}T${startTime}`); // Combine date & time
//       electionData.set("endDate", `${endDate}T${endTime}`); // Combine date & time

//       await axios.patch(
//         `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,
//         electionData,
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       closeModal();
//       navigate(0);
//     } catch (error) {
//       console.error("Error updating election:", error);
//     }
//   };

//   return (
//     <section className="modal">
//       <div className="modal_content">
//         <header className="modal_header">
//           <h4>Edit Election</h4>
//           <button className="modal_close" onClick={closeModal}>
//             <IoMdClose />
//           </button>
//         </header>
//         <form onSubmit={updateElection}>
//           <div>
//             <h6>Election Title:</h6>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               name="title"
//               required
//             />
//           </div>
//           <div>
//             <h6>Election Description:</h6>
//             <input
//               type="text"
//               value={description}
//               name="description"
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <h6>Election Start Date:</h6>
//             <input
//               type="date"
//               value={startDate}
//               name="startDate"
//               onChange={(e) => setStartDate(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <h6>Election Start Time:</h6>
//             <input
//               type="time"
//               value={startTime}
//               name="startTime"
//               onChange={(e) => setStartTime(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <h6>Election End Date:</h6>
//             <input
//               type="date"
//               value={endDate}
//               name="endDate"
//               onChange={(e) => setEndDate(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <h6>Election End Time:</h6>
//             <input
//               type="time"
//               value={endTime}
//               name="endTime"
//               onChange={(e) => setEndTime(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <h6>Election Thumbnail:</h6>
//             <input
//               type="file"
//               onChange={(e) => setThumbnail(e.target.files[0])}
//               accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
//             />
//           </div>
//           <button type="submit" className="btn primary">
//             Update Election
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UpdateElectionModal;

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { UiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateElectionModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const idOfElectionToUpdate = useSelector(
    (state) => state?.vote?.idOfElectionToUpdate
  );

  const closeModal = () => {
    dispatch(UiActions.closeUpdateElectionModal());
  };

  const fetchElection = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle(data.title);
      setDescription(data.description);
      setStartDate(data.startDate?.slice(0, 10));
      setStartTime(data.startTime);
      setEndDate(data.endDate?.slice(0, 10));
      setEndTime(data.endTime);
    } catch (error) {
      console.error("Error fetching election:", error);
    }
  };

  useEffect(() => {
    fetchElection();
  }, []);

  const updateElection = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startDate", startDate);
      formData.append("startTime", startTime);
      formData.append("endDate", endDate);
      formData.append("endTime", endTime);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await axios.patch(
        `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeModal();
      navigate(0); // Refresh the page
    } catch (error) {
      console.error("Error updating election:", error);
    }
  };

  return (
    <section className="modal">
      <div className="modal_content">
        <header className="modal_header">
          <h4>Edit Election</h4>
          <button className="modal_close" onClick={closeModal}>
            <IoMdClose />
          </button>
        </header>
        <form onSubmit={updateElection}>
          <div>
            <h6>Election Title:</h6>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              required
            />
          </div>
          <div>
            <h6>Election Description:</h6>
            <input
              type="text"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election Start Date:</h6>
            <input
              type="date"
              value={startDate}
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election Start Time:</h6>
            <input
              type="time"
              value={startTime}
              name="startTime"
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election End Date:</h6>
            <input
              type="date"
              value={endDate}
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election End Time:</h6>
            <input
              type="time"
              value={endTime}
              name="endTime"
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election Thumbnail:</h6>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn primary">
            Update Election
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateElectionModal;
