import React, { FC, useEffect, useState } from "react";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";
import Modal from "../../components/Modal";
import ChairTos from "../../components/chair-tos";

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

// Page component that replaces the Blade view
const ChairpersonTosPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    document.title = "SyllabEase - Table of Specification";
  }, []);

  return (
    <>
      {/* Import Nav + Sidebar */}
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />
        {/* Modal included (keeps parity with @include('layouts.modal')) */}
        <Modal
          show={isModalOpen}
          title="Modal"
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        >
          {/* Modal body placeholder - put modal content here if needed */}
          <div />
        </Modal>

        {/* Page content (converted from Blade view) */}
        <div
          className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14"
          style={{
            backgroundImage: `url(/assets/Wave.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundColor: "transparent",
            minHeight: "100vh" // ensures it fills the screen
          }}
        > 
          <h1 className="absolute font-bold text-[#201B50]" style={{ top: "90px", left: "280px", fontSize: "2rem" }}>
            Table of Specification
          </h1>

          {/* The converted Livewire component lives at frontend/src/views/components/chair-tos.tsx */}
          <ChairTos />
        </div>
    </>
  );
};

export default ChairpersonTosPage;
