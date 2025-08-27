import React, { useState } from "react";
import { Button, Alert } from "flowbite-react";
import ChairSidebar from "../layouts/chairSidebar";
import ChairpersonNav from "../layouts/chairpersonNav";
import BayanihanTeams from "../components/BayanihanTeams";

const IconUsers = () => (
  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Notification {
  id: string;
  data: {
    for: string;
    course_code: string;
    bg_school_year: string;
    message: string;
    action_url: string;
  };
  created_at: Date;
}

const mockUser: User = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    data: {
      for: "CS",
      course_code: "CS101",
      bg_school_year: "2024-2025",
      message: "New syllabus submitted for review",
      action_url: "/syllabus/1",
    },
    created_at: new Date("2024-01-15T10:30:00"),
  },
];

const Home: React.FC = () => {
  const [user] = useState<User>(mockUser);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [activeRoute, setActiveRoute] = useState("home");
  const [missingSignature] = useState(true);

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleCreateBayanihanTeam = () => {
    console.log("Creating Bayanihan Team...");
  };

  return (
    <div className="min-h-screen bg-transparent">
      <style>{`
        body {
          background-image: url('/assets/Wave.png');
          background-repeat: no-repeat;
          background-position: top;
          background-attachment: fixed;
          background-size: cover;
          background-color: transparent;
        }
      `}</style>

      {missingSignature && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-[500px] z-50">
          <Alert
            color="warning"
            className="border border-yellow-400 bg-yellow-50 text-green-600"
            additionalContent={
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">
                  <strong>Missing Signature:</strong> You haven't uploaded your signature yet.
                </div>
                <Button
                  size="sm"
                  className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
                  onClick={() => handleRouteChange("profile.edit")}
                >
                  Go to Profile
                </Button>
              </div>
            }
          />
        </div>
      )}

      {/* Import Nav + Sidebar */}
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />

      {/* Main Content */}
      <div
        className="w-full max-w-6xl absolute p-6 pl-3 pr-3 shadow bg-white border-dashed rounded-lg dark:border-gray-700 w-[1080px] h-2/3"
        style={{
          top: "150px",   // Y-coordinate
          left: "320px",  // X-coordinate
        }}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-bold text-4xl text-blue-900">Bayanihan Teams</h1>
            <Button
              onClick={handleCreateBayanihanTeam}
              className="bg-blue-100 hover:bg-blue-200 text-black font-semibold border-none hover:scale-105 transition-all"
              size="sm"
            >
              <div className="mr-2">
                <IconPlus />
              </div>
              Create Bayanihan Team
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="p-8 text-center rounded-lg bg-gray-50">
          </div>

          {/* Placeholder */}
          <BayanihanTeams />
        </div>
      </div>
    </div>
  );
};

export default Home;