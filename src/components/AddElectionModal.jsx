import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UiActions } from "../store/ui-slice";

const AddElectionModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(""); // New state for start time
  const [endTime, setEndTime] = useState(""); // New state for end time

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  // Close modal
  const closeModal = () => {
    dispatch(UiActions.closeElectionModal());
  };

  // Utility function to format date correctly
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  // Create new election
  const createElection = async (e) => {
    e.preventDefault();
    try {
      const electionData = new FormData();
      electionData.append("title", title);
      electionData.append("description", description);

      electionData.append("startDate", startDate);
      electionData.append("endDate", endDate);
      electionData.append("startTime", startTime); // Append start time
      electionData.append("endTime", endTime);
      electionData.append("thumbnail", thumbnail); // Append end time

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/elections`,
        electionData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Election created:", response.data);
      closeModal();
      navigate(0);
    } catch (error) {
      console.error(
        "Error creating election:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="modal">
      <div className="modal_content">
        <header className="modal_header">
          <h4>Create New Election</h4>
          <button className="modal_close" onClick={closeModal}>
            <IoMdClose />
          </button>
        </header>
        <form onSubmit={createElection}>
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
              value={formatDate(startDate)}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election Start Time:</h6>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election End Date:</h6>
            <input
              type="date"
              value={formatDate(endDate)}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election End Time:</h6>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Election Thumbnail:</h6>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
              required
            />
          </div>
          <button type="submit" className="btn primary but">
            Add Election
          </button>
        </form>
      </div>
    </section>
  );
};



export default AddElectionModal;
