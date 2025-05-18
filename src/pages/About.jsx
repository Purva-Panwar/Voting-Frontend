import React from "react";
import { motion } from "framer-motion";
// import "../styles/About.css"; // Import the external CSS

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="main-title"
        >
          About Our Voting Platform
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="sub-title"
        >
          Secure | Transparent | Accessible
        </motion.h2>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <p>
            <strong>VoteOnline</strong> is a modern digital platform designed to{" "}
            <span className="highlight">simplify and secure</span> the voting
            process. Our mission is to empower every citizen by providing a
            reliable, transparent, and easily accessible online voting system.
          </p>

          <p>
            We integrate{" "}
            <span className="highlight">blockchain technology</span> and
            multi-layered encryption to ensure the authenticity and
            confidentiality of every single vote. Whether you're voting in a
            government election, university poll, or organizational event —
            VoteOnline provides a seamless experience.
          </p>

          <p>
            With a user-friendly interface and real-time result tracking, our
            platform promotes{" "}
            <span className="highlight">higher participation</span> and{" "}
            <span className="highlight">trust in democratic processes</span>.
          </p>
        </motion.div>

        {/* Belief Section */}
        <motion.div
          className="belief-box"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Our Vision</h3>
          <p>
            We envision a world where every individual has the power to
            participate in elections{" "}
            <span className="strong">freely, securely, and conveniently</span>,
            from anywhere in the world.
          </p>
        </motion.div>
      </div>
      <style>
        {`
        /* About Page Styling - Blue & Light Blue Theme */

.about-page {
  background: linear-gradient(to bottom right, #dbeafe, #eff6ff); /* light blue */
  min-height: 100vh;
  padding: 6rem 1.5rem 4rem;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1e40af; /* Deep Blue */
  margin-bottom: 1rem;
}

.sub-title {
  font-size: 1.8rem;
  color: #2563eb; /* Blue */
  font-weight: 600;
  margin-bottom: 2.5rem;
}

.about-content {
  color: #374151; /* Dark Gray Text */
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: 1rem;
}

.about-content p {
  margin-bottom: 1.8rem;
}

.highlight {
  color: #2563eb; /* Blue highlight */
  font-weight: 600;
}

.belief-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.belief-box h3 {
  font-size: 2rem;
  color: #1d4ed8;
  margin-bottom: 1rem;
}

.belief-box p {
  font-size: 1.1rem;
  color: #4b5563;
}

.strong {
  font-weight: bold;
  color: #1e3a8a; /* Darker Blue */
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.4rem;
  }

  .sub-title {
    font-size: 1.5rem;
  }

  .about-content {
    font-size: 1rem;
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }

  .sub-title {
    font-size: 1.3rem;
  }

  .belief-box h3 {
    font-size: 1.5rem;
  }
}
`}
      </style>
    </div>
  );
}
