import React, { useState } from "react";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";
import ChairSyllabusTable from "../../components/chair-syllabus-table";

// === Sample dummy data ===
const dummySyllabi = [
  {
    syll_id: 1,
    course_title: "Intro to CS",
    course_code: "CS101",
    bg_school_year: "2023-2024",
    course_semester: "1st Semester",
    chair_submitted_at: "2024-08-01",
    dean_approved_at: "2024-08-05",
    version: 1,
    status: "Draft",
  },
  {
    syll_id: 2,
    course_title: "Data Structures",
    course_code: "CS102",
    bg_school_year: "2023-2024",
    course_semester: "1st Semester",
    chair_submitted_at: "2024-08-02",
    dean_approved_at: "2024-08-06",
    version: 1,
    status: "Pending Chair Review",
  },
];

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

const dummyDepartments = ["CS", "IT", "EE"];
// === End dummy data ===

const SyllList: React.FC = () => {
  const [user] = useState<User>(mockUser);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [activeRoute, setActiveRoute] = useState("home");

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen flex">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />

        <main className="absolute p-4 mt-14 flex min-h-screen w-full" style={{
          top: "150px",   // Y-coordinate
          left: "280px",  // X-coordinate
        }}>
          <div className="absolute top-20 left-64 p-6 pl-3 pr-3 shadow bg-white border-dashed rounded-lg dark:border-gray-700 w-[1080px] h-2/3">
            <h1 className="font-bold text-4xl text-[#201B50] mb-8 text-left">
            List of Syllabus
            </h1>
            <ChairSyllabusTable syllabi={dummySyllabi} departments={dummyDepartments} />
        </div>
        </main>
      </div>
    </div>
  );
};

export default SyllList;