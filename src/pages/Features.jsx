import React from "react";
import { motion } from "framer-motion";
// import "../styles/Features.css"; // External CSS

const features = [
  {
    title: "Secure Online Voting",
    description:
      "Cast your vote safely from anywhere using advanced encryption and secure authentication.",
  },
  {
    title: "Real-time Vote Counting",
    description:
      "Monitor election progress with real-time, transparent vote counting and instant result updates.",
  },
  {
    title: "Voter Authentication",
    description:
      "Authenticate voters using secure login systems to ensure one-person, one-vote integrity.",
  },
  {
    title: "Mobile Friendly",
    description:
      "Vote easily on any device — desktop, tablet, or smartphone — with our fully responsive design.",
  },
  {
    title: "Anonymous Voting",
    description:
      "We guarantee voter privacy with fully anonymous and encrypted ballot submission.",
  },
  {
    title: "Admin Dashboard",
    description:
      "Admins can create elections, manage candidates, and monitor voting activity in real-time.",
  },
];

export default function Features() {
  return (
    <div className="features-page">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="features-title"
        >
          Key Features of VoteOnline
        </motion.h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="feature-card"
            >
              <h3 className="feature-heading">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>
        {`
        /* Features Page Styling - Blue & Light Blue Theme */

.features-page {
  background: linear-gradient(to bottom right, #dbeafe, #eff6ff);
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

.features-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1d4ed8;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.feature-heading {
  font-size: 1.5rem;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 1rem;
}

.feature-desc {
  font-size: 1.05rem;
  color: #374151;
  line-height: 1.6;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .features-title {
    font-size: 2.3rem;
  }
}

@media (max-width: 480px) {
  .features-title {
    font-size: 2rem;
  }

  .feature-heading {
    font-size: 1.3rem;
  }
}
`}
      </style>
    </div>
  );
}
