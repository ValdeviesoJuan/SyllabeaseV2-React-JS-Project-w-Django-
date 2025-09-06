// File: Syllabease/frontend/src/views/Chairperson/ProgramOutcome/PoCreate.tsx
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

export type ProgramOutcome = {
  letter: string;
  description: string;
};

export default function PoCreate() {
  const [outcomes, setOutcomes] = useState<ProgramOutcome[]>([
    { letter: "", description: "" },
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

  const handleAddRow = () => {
    setOutcomes([...outcomes, { letter: "", description: "" }]);
  };

  const handleChange = (
    index: number,
    field: keyof ProgramOutcome,
    value: string
  ) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index][field] = value;
    setOutcomes(newOutcomes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", outcomes);
    alert("Submit to backend when ready!");
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
      <div
        className="m-auto bg-slate-100 mt-[120px] p-2 shadow-lg bg-gradient-to-r from-[#FFF] to-[#dbeafe] rounded-lg w-11/12" 
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
        <div className="absolute" style={{
          top: "90px",   // Y-coordinate
          left: "330px",  // X-coordinate
        }}>
          <img
            className="edit_user_img text-center p-6 mt-4 w-[400px] m-auto mb-6"
            src="/assets/Create Program Outcomes.png"
            alt="SyllabEase Logo"
          />

          <form onSubmit={handleSubmit}>
            <div className="ml-20 space-y-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    placeholder="a."
                    type="text"
                    value={outcome.letter}
                    onChange={(e) =>
                      handleChange(index, "letter", e.target.value)
                    }
                    className="w-9 border-2 border-solid border-sePrimary text-center"
                    required
                  />
                  <span>:</span>
                  <input
                    placeholder="e.g Apply knowledge of computing, science..."
                    type="text"
                    value={outcome.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    className="w-5/6 border-2 border-solid border-seSecondary"
                    required
                  />
                </div>
              ))}

              <Button
                type="button"
                color="blue"
                onClick={handleAddRow}
                className="flex items-center gap-2 mt-4"
              >
                <svg
                  className="-mb-2"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Add Row</span>
              </Button>

              <div className="text-center">
                <Button type="submit" color="blue" className="mt-6">
                  Create Program Outcomes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
