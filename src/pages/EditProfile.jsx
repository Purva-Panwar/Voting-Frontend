import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBirthdayCake,
  faIdCard,
  faVenusMars,
  faLock,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// import "./EditProfile.css";
const EditProfile = () => {
  const voter = useSelector((state) => state.vote.currentVoter);
  const token = voter?.token;
  const voterId = voter?.id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
    age: "",
    idnumber: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !voterId) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          age: response.data.age || "",
          idnumber: response.data.idnumber || "",
          gender: response.data.gender || "",
          password: "",
          password2: "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, voterId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password && formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password && formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Profile update failed.");
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="profile-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="profile-header" variants={item}>
          <h2>Edit Profile</h2>
          <div className="profile-image-container">
            <motion.img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              alt="Profile"
              className="profile-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>

        <form onSubmit={handleSave}>
          {error && (
            <motion.div
              className="error-message"
              variants={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="success-message"
              variants={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </motion.div>

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </motion.div>

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faBirthdayCake} />
            </div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </motion.div>

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faIdCard} />
            </div>
            <input
              type="text"
              name="idnumber"
              placeholder="ID Number"
              value={formData.idnumber}
              onChange={handleInputChange}
            />
          </motion.div>

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faVenusMars} />
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              name="password"
              placeholder="New Password (leave blank to keep current)"
              value={formData.password}
              onChange={handleInputChange}
            />
          </motion.div>

          <motion.div className="form-group" variants={item}>
            <div className="input-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              name="password2"
              placeholder="Confirm New Password"
              value={formData.password2}
              onChange={handleInputChange}
            />
          </motion.div>

          <motion.div className="form-actions" variants={item}>
            <motion.button
              type="submit"
              className="save-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </motion.button>
            <motion.button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </motion.button>
          </motion.div>
        </form>
      </motion.section>
      <style>
        {`
       
.profile-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 10px;
}

.profile-container {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  padding: 20px;
  overflow: hidden;
}

.profile-header {
  text-align: center;
  margin-bottom: 10px;
}

.profile-header h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.profile-image-container {
  margin: 0 auto 20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #3498db;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 16px;
}

input, select {
  width: 100%;
  padding: 7px 15px 7px 45px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.save-button, .cancel-button {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.save-button {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
}

.save-button:hover {
  background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
  box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
}

.cancel-button {
  background: white;
  color: #7f8c8d;
  border: 1px solid #dfe6e9;
}

.cancel-button:hover {
  background: #f5f5f5;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(52, 152, 219, 0.2);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}


@media (max-width: 768px) {
  .profile-container {
    padding: 30px 20px;
  }
  
  .profile-header h2 {
    font-size: 24px;
  }
  
  .profile-image-container {
    width: 100px;
    height: 100px;
  }
  
  input, select {
    padding: 12px 12px 12px 40px;
    font-size: 14px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .save-button, .cancel-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .profile-container {
    padding: 25px 15px;
  }
  
  .profile-header h2 {
    font-size: 22px;
  }
  
  .profile-image-container {
    width: 80px;
    height: 80px;
  }
}`}
      </style>
    </motion.div>
  );
};

export default EditProfile;
