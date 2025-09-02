import React, { useState } from "react";
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

interface PoeRow {
  code: string;
  description: string;
}

const PoeCreate: React.FC = () => {
  const [rows, setRows] = useState<PoeRow[]>([
    { code: "", description: "" },
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
    setRows([...rows, { code: "", description: "" }]);
  };

  const handleChange = (index: number, field: keyof PoeRow, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting PEOs:", rows);
    // TODO: integrate with Django API (POST request)
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

      <div className="m-auto bg-slate-100 mt-[120px] p-2 shadow-lg bg-gradient-to-r from-[#FFF] to-[#dbeafe] rounded-lg w-11/12">
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
        <div className="absolute" style={{
          top: "90px",   // Y-coordinate
          left: "330px",  // X-coordinate
        }}>
          <img
            className="text-center p-6 mt-4 w-[550px] m-auto mb-6"
            src="/assets/Create Program Educational Objectives.png"
            alt="SyllabEase Logo"
          />

          <div className="mb-10 pb-10">
            <div className="ml-20 items-center">
              <form onSubmit={handleSubmit}>
                {rows.map((row, index) => (
                  <div key={index} className="flex items-center gap-2 my-4">
                    <input
                      placeholder={`PEO${index + 1}`}
                      type="text"
                      value={row.code}
                      onChange={(e) => handleChange(index, "code", e.target.value)}
                      className="text-center w-16 border-2 border-solid border-sePrimary"
                      required
                    />
                    <span>:</span>
                    <input
                      placeholder="e.g Graduates are proficient in the IT field and able to engage constantly..."
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      className="w-5/6 border-2 border-solid border-seSecondary"
                      required
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddRow}
                  className="p-2 text-black inline-flex items-center px-4 py-2 rounded m-2 mt-8 mb-4 bg-blue-500 border-2 border-black hover:bg-blue-400 hover:scale-105 transition"
                >
                  <svg
                    className="mr-2"
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12H9M12 9V15M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Add Row
                </button>

                <div className="text-center">
                  <button
                    type="submit"
                    className="text-black font-semibold px-6 py-2 rounded-lg m-2 mt-8 mb-4 bg-blue-500 border-2 border-black hover:bg-blue-400 hover:scale-105 transition"
                  >
                    Create Program Educational Objectives
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PoeCreate;
