import React, { useState } from "react";
import { Button } from "flowbite-react";
import ChairSidebar from "../../layouts/chairSidebar";
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

interface PoeData {
  poe_code: string;
  poe_description: string;
}

const PoeEdit: React.FC = () => {
  // Mock data from backend (to be replaced with API call later)
  const [poes, setPoes] = useState<PoeData[]>([
    { poe_code: "PEO1", poe_description: "Graduates are proficient in IT field..." },
    { poe_code: "PEO2", poe_description: "Graduates engage in lifelong learning..." },
  ]);

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

  const handleChange = (index: number, field: keyof PoeData, value: string) => {
    const updatedPoes = [...poes];
    updatedPoes[index][field] = value;
    setPoes(updatedPoes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated PEOs:", poes);
    // TODO: Send update request to Django backend when ready
  };

  return (
    <div>
      {/* Import Nav + Sidebar */}
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />
      <div className="p-4 mt-14 m-auto w-11/12 bg-gradient-to-r from-white to-blue-100 shadow-lg rounded-lg">
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
        <div className="absolute" style={{ top: "90px", left: "330px" }}>
          <img
            className="text-center p-6 mt-4 w-[550px] m-auto mb-6"
            src="/assets/Edit Program Educational Objectives.png"
            alt="SyllabEase Logo"
          />
          <div className="mb-10 pb-10">
            <div className="ml-20 items-center">
              <form onSubmit={handleSubmit}>
                <div id="input-container">
                  {poes.map((poe, index) => (
                    <div key={index} className="mb-5">
                      <input
                        type="text"
                        value={poe.poe_code}
                        onChange={(e) => handleChange(index, "poe_code", e.target.value)}
                        className="text-center w-14 border-2 border-sePrimary mr-2"
                        required
                      />
                      :
                      <input
                        type="text"
                        value={poe.poe_description}
                        onChange={(e) => handleChange(index, "poe_description", e.target.value)}
                        className="ml-2 w-5/6 border-2 border-seSecondary"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button type="submit" color="blue" className="font-semibold px-6 py-2 rounded-lg">
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PoeEdit;
