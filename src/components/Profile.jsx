import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Pro.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const voter = useSelector((state) => state.vote.currentVoter);
  const token = voter?.token;
  const voterId = voter?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !voterId) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, voterId]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Error loading profile</p>;

  return (
    <div className="profile-container">
      <h2>Voter Profile</h2>
      <div className="profile-details">
        <div className="div">
          <img
            // src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.145594747.1747650246&semt=ais_hybrid&w=740"
            alt="Profile"
            className="profile-img"
          />
        </div>

        {/* {female && (
          <div className="div">
            <img
              // src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.346386233.1742042256&semt=ais_hybrid"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPnPkTLcuXp0GiFvrerIVIMH-vxCRFl1SlgQ&s"
              alt="Profile"
              className="profile-img"
            />
          </div>
        )} */}
        <div className="details">
          <p>
            <strong>Name:</strong> {profile.fullName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Aadhar Number:</strong> {profile.idnumber}
          </p>
          <p>
            <strong>Verified:</strong>{" "}
            {profile.isAccountVerified ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>Age:</strong> {profile.age || "Not provided"}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender || "Not provided"}
          </p>
        </div>
      </div>

      <div>
        <Link to="/edit-profile" className="edit-pro">
          {" "}
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
