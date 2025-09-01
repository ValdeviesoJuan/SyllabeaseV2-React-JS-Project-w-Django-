import React, { useState } from "react";
import { Button } from "flowbite-react";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";

// Mock data
interface ProgramOutcome {
  po_id: number;
  po_letter: string;
  po_description: string;
}

const MOCK_PROGRAM_OUTCOMES: ProgramOutcome[] = [
  { po_id: 1, po_letter: "A", po_description: "Apply knowledge of computing fundamentals." },
  { po_id: 2, po_letter: "B", po_description: "Analyze a complex computing problem." },
  { po_id: 3, po_letter: "C", po_description: "Design, implement, and evaluate computing solutions." },
];

const department_name = "Computer Science";

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

const ProgramOutcomeList: React.FC = () => {
  const [programOutcomes, setProgramOutcomes] = useState<ProgramOutcome[]>(MOCK_PROGRAM_OUTCOMES);
  const [showDelete, setShowDelete] = useState(false);
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

  // Handlers
  const handleDelete = (po_id: number) => {
    setProgramOutcomes(programOutcomes.filter(po => po.po_id !== po_id));
    alert(`Program Outcome ${po_id} deleted (mock)!`);
  };

  const handleAdd = () => {
    alert("Navigate to Add Program Outcome (mock)");
  };

  const handleEdit = () => {
    alert("Navigate to Edit Program Outcome (mock)");
  };

  return (
    <div>
      <style>{`
        body {
          background-image: url('/assets/Wave1.png');
          background-repeat: no-repeat;
          background-position: top;
          background-attachment: fixed;
          min-width: 100vh;
          background-size: contain;
        }
      `}</style>
      {/* Import Nav + Sidebar */}
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />

      <div className="absolute" style={{
          top: "120px",   // Y-coordinate
          left: "330px",  // X-coordinate
        }}>

          <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14 opacity-80">
            <h1 className="font-semibold text-xl flex justify-center pt-5">Program Outcomes</h1>
            <div>
              <p className="ml-5 tracking-wide text-lg">
                <br />
                Upon completion of the <span className="font-bold">{department_name}</span> program, graduates are able to:
              </p>
              <div className="mb-10 pb-10">
                {programOutcomes.map(po => (
                  <div key={po.po_id} className="ml-20 flex items-center tracking-wide leading-relaxed">
                    <p>
                      {po.po_letter} : {po.po_description}
                    </p>
                    {showDelete && (
                      <div className="w-10 color-sePrimary deleteButtonContainer">
                        <Button
                          color="failure"
                          size="xs"
                          className="w-6 inline-flex items-center ml-2 deleteButton"
                          onClick={() => handleDelete(po.po_id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="18" height="18">
                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                          </svg>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <br />
            <br />
            <br />
            <div className="ml-10 mt-2 pt-2 w-max hover:scale-105 transition ease-in-out py-2 text-white rounded-lg">
              <Button
                color="light"
                className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3] max-w-full"
                style={{ background: "#d7ecf9" }}
                onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "#c3dff3")}
                onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "#d7ecf9")}
                onClick={handleAdd}
              >
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="px-2 text-black">Add Program Outcome</div>
              </Button>
            </div>
            <div className="ml-10 mt-2 pt-2 w-max hover:scale-105 transition ease-in-out py-2 text-white rounded-lg">
              <Button
                color="light"
                className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3] max-w-full"
                style={{ background: "#d7ecf9" }}
                onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "#c3dff3")}
                onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "#d7ecf9")}
                onClick={handleEdit}
              >
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                    stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="px-2 text-black">Edit Program Outcome</div>
              </Button>
            </div>
            <div className="flex ml-10 mt-2 pt-2 w-max hover:scale-105 transition ease-in-out py-2 text-white rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  className="rounded-full mr-2"
                  type="checkbox"
                  checked={showDelete}
                  onChange={e => setShowDelete(e.target.checked)}
                />
                <span className="px-2 text-black">Show Delete Button</span>
              </label>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProgramOutcomeList;