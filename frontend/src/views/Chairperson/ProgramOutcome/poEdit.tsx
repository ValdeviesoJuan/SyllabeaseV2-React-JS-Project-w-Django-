// File: Syllabease/frontend/src/views/Chairperson/ProgramOutcome/PoEdit.tsx
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

type PoEditProps = {
  initialOutcomes?: ProgramOutcome[]; // you can provide this from API later
};

export default function PoEdit({ initialOutcomes = [] }: PoEditProps) {
  const [outcomes, setOutcomes] = useState<ProgramOutcome[]>(
    initialOutcomes.length > 0
      ? initialOutcomes
      : [{ letter: "", description: "" }]
  );

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
    console.log("Updated Program Outcomes:", outcomes);
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
        className="mt-14 p-4 pb-10 m-auto w-11/12 bg-gradient-to-r from-[#FFF] to-[#dbeafe] shadow-lg rounded-lg"
      >
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
            className="edit_user_img text-center p-6 mt-4 w-[400px] m-auto mb-6"
            src="/assets/Edit Program Outcomes.png"
            alt="SyllabEase Logo"
          />

          <form onSubmit={handleSubmit}>
            <div className="ml-20 space-y-4">
              {outcomes.map((po, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Small input */}
                  <input
                    placeholder="a."
                    type="text"
                    value={po.letter}
                    onChange={(e) => handleChange(index, "letter", e.target.value)}
                    className="w-12 border-2 border-sePrimary text-center py-2"
                    required
                  />
                  <span className="font-bold">:</span>
                  {/* Large input */}
                  <input
                    placeholder="e.g Apply knowledge of computing, science..."
                    type="text"
                    value={po.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="flex-1 border-2 border-seSecondary py-2"
                    required
                  />
                </div>
              ))}

              <div className="text-center">
                <Button type="submit" color="blue" className="mt-6">
                  Update Program Outcomes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
