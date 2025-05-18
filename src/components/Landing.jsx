import React from "react";

import { motion } from "framer-motion"; // animation library

const Landing = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">🗳️ VoteOnline</div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#vote">Vote Now</a>
          </li>
        </ul>
      </nav>

      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Empowering Democracy, One Click at a Time</h1>
        <p>Secure • Reliable • Easy</p>
        <a href="#vote" className="btn">
          Get Started
        </a>
      </motion.div>

      <section id="features" className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <motion.div
            className="card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>Secure Voting</h3>
            <p>End-to-end encryption to keep your vote safe.</p>
          </motion.div>

          <motion.div
            className="card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>Real-Time Results</h3>
            <p>Instant updates once voting closes.</p>
          </motion.div>

          <motion.div
            className="card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>User Friendly</h3>
            <p>Simple and intuitive voting process.</p>
          </motion.div>
        </div>
      </section>
      <style>
        {`
        /* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: 'Poppins', sans-serif;
  scroll-behavior: smooth;
}

.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: rgba(0, 0, 0, 0.2);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 100px 20px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  background: #ff7e5f;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #feb47b;
}

/* Features Section */
.features {
  background: #fff;
  color: #333;
  padding: 60px 20px;
  text-align: center;
}

.features h2 {
  font-size: 36px;
  margin-bottom: 40px;
}

.feature-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 30px;
  width: 250px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card h3 {
  margin-bottom: 15px;
  color: #667eea;
}

.card p {
  font-size: 16px;
}
`}
      </style>
    </div>
  );
};

export default Landing;
