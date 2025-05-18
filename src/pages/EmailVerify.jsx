import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
 
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/verify-otp`,
        { voterId, otp },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="email-verify-container">
      {" "}
      <div className="alert">
        <p>📩 Verification code has been sent to your email ID.</p>
      </div>
      <br />
      <div className="email-verify-box">
        <form onSubmit={onSubmitHandler}>
          <h1>Email Verification</h1>
          <p>Enter the 6-digit code sent to your email.</p>
          <div className="otp-input-container" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="otp-input"
                />
              ))}
          </div>
          <button type="submit" className="verify-btn">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
