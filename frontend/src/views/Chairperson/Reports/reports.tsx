import React, { useState } from "react";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairReports from "../../components/chair-reports";
import ChairpersonNav from "../../layouts/chairpersonNav";

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

const ChairReportsPage: React.FC = () => {
   const [user] = useState<User>(mockUser);
      const [notifications] = useState<Notification[]>(mockNotifications);
  const [activeRoute, setActiveRoute] = useState<string>("curricula");
  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-top bg-fixed bg-contain"
      style={{ backgroundImage: "url('/assets/Wave.png')" }}
    >
      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

        <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14">
          <ChairReports />
        </div>
    </div>
  );
};

export default ChairReportsPage;