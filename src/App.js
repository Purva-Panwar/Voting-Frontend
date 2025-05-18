import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Elections from "./pages/Elections";
import ElectionDetails from "./pages/ElectionDetails";
import Candidates from "./pages/Candidates";
import Congrats from "./pages/Congrats";
import Logout from "./pages/Logout";
import { ToastContainer } from 'react-toastify';
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Works from "./pages/Works";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Poll from './components/Poll';
import Profile from './components/Profile';
import EditProfile from "./pages/EditProfile";
import Sidebar from "./pages/Sidebar";
import Footer from './pages/Footer';
import Landing from "./components/Landing";
import About from "./pages/About";

import Features from "./pages/Features";
import Dashboard from './pages/Dashboard';
import ActiveElections from "./pages/ActiveElection";
import AlreadyVotedElections from "./pages/AlreadyVotedElection";
import UpElections from "./pages/UpElections";

const router = createBrowserRouter([
  //emailV
  <ToastContainer />,
  {

    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "email-verify",
        element: <EmailVerify />,
      },

  
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "poll/:id",
        element: <Poll />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
     
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
     
      {
        path: "elections",
        element: <Elections />,
      },
      {
        path: "activeElections",
        element: <ActiveElections />,
      },
      {
        path: "alreadyVotedElections",
        element: <AlreadyVotedElections />,
      },
      {
        path: "upcomingElections",
        element: <UpElections />,
      },
      {
        path: "elections/:id",
        element: <ElectionDetails />,
      },
      {
        path: "elections/:id/candidates",
        element: <Candidates />,
      },
      {
        path: "congrats",
        element: <Congrats />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "sidebar",
        element: <Sidebar />,
      },
      {
        path: "footer",
        element: <Footer />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

