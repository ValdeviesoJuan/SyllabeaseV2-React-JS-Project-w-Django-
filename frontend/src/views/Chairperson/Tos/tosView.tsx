import React, { useState } from "react";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";
import Modal from "../../components/Modal";

// Mocked data (replace with backend API when available)
const tos = {
  tos_version: 1,
  effectivity_date: "2025-08-27",
  tos_term: "Midterm",
  course_code: "CS101",
  course_title: "Introduction to Programming",
  bg_school_year: "2024-2025",
  course_semester: "1st Semester",
  tos_cpys: "BSCS/2A",
  col_1_per: 25,
  col_2_per: 25,
  col_3_per: 25,
  col_4_per: 25,
  tos_id: 1,
  tos_no_items: 50,
  chair_returned_at: null, // or a date string if returned
  chair_approved_at: "2025-08-29", // or null if not approved
  chair_submitted_at: "2025-08-28",
};

const course_outcomes = [
  { syll_co_code: "CO1", syll_co_description: "Understand programming basics" },
  { syll_co_code: "CO2", syll_co_description: "Apply logic to solve problems" },
];

const tos_rows = [
  {
    tos_r_id: 1,
    tos_r_topic: "Variables and Data Types",
    tos_r_no_hours: 5,
    tos_r_percent: 10,
    tos_r_no_items: 5,
    tos_r_col_1: 2,
    tos_r_col_2: 1,
    tos_r_col_3: 1,
    tos_r_col_4: 1,
  },
  {
    tos_r_id: 2,
    tos_r_topic: "Control Structures",
    tos_r_no_hours: 6,
    tos_r_percent: 12,
    tos_r_no_items: 6,
    tos_r_col_1: 2,
    tos_r_col_2: 2,
    tos_r_col_3: 1,
    tos_r_col_4: 1,
  },
];

const bLeaders = [
  {
    prefix: "Mr.",
    firstname: "Juan",
    lastname: "Dela Cruz",
    suffix: "",
    signature: "juan_signature.png",
  },
];

const chair = {
  prefix: "Dr.",
  firstname: "Maria",
  lastname: "Santos",
  suffix: "",
  signature: "chair_signature.png",
};

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

// Calculate totals
const total_tos_r_col_1 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_1 || 0), 0);
const total_tos_r_col_2 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_2 || 0), 0);
const total_tos_r_col_3 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_3 || 0), 0);
const total_tos_r_col_4 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_4 || 0), 0);

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });
};

const TosView: React.FC = () => {
  // Modal state (for future use)
  const [user] = useState<User>(mockUser);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeRoute, setActiveRoute] = useState<string>("curricula");

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div>
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />
      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />

      <Modal
        show={isModalOpen}
        title="TOS Modal"
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
      >
        {/* Modal content here */}
      </Modal>
      <div
        className="absolute min-h-screen pt-14"
        style={{
          top: "60px",
          left: "350px",
          right: "50px",
          bottom: "200px",
        }}
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
        {/* Notices */}
        {tos.chair_returned_at ? (
          <div className="flex flex-col items-center justify-center border-2 border-yellow-400 bg-opacity-75 w-[500px] lg:w-[800px] rounded-lg bg-white py-6 mt-6 mx-auto">
            <div className="flex items-center mb-4">
              <svg fill="#facc15" width="40px" height="40px" viewBox="0 0 32 32">
                <path d="M15.5 3c-7.456 0-13.5 6.044-13.5 13.5s6.044 13.5 13.5 13.5 13.5-6.044 13.5-13.5-6.044-13.5-13.5-13.5zM15.5 27c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zM15.5 10c-0.828 0-1.5 0.671-1.5 1.5v5.062c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v-5.062c0-0.829-0.672-1.5-1.5-1.5zM15.5 20c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5z"></path>
              </svg>
              <div className="ml-3">
                <span className="font-semibold">Notice:</span> This TOS has been returned by the chair for further revision.
              </div>
            </div>
          </div>
        ) : tos.chair_approved_at ? (
          <div className="flex flex-col items-center justify-center border-2 border-[#22c55e] bg-opacity-75 w-[500px] lg:w-[800px] rounded-lg bg-white py-6 mt-6 mx-auto">
            <div className="flex items-center mb-4">
              <svg fill="#22c55e" width="40px" height="40px" viewBox="0 0 32 32">
                <path d="M15.5 3c-7.456 0-13.5 6.044-13.5 13.5s6.044 13.5 13.5 13.5 13.5-6.044 13.5-13.5-6.044-13.5-13.5-13.5zM15.5 27c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zM15.5 10c-0.828 0-1.5 0.671-1.5 1.5v5.062c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v-5.062c0-0.829-0.672-1.5-1.5-1.5zM15.5 20c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5z"></path>
              </svg>
              <div className="ml-3">
                <span className="font-semibold">Notice:</span> This TOS has already been <span className="text-[#22c55e] font-bold">approved</span> by the chair; further edits are no longer permitted.
              </div>
            </div>
            <div className="text-center">
              <a
                href="#"
                className="text-blue-600 hover:underline font-bold"
                onClick={() => alert("Export as docx (no backend yet)")}
              >
                Export as docx
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-end h-full items-end mt-10 mb-2 mr-[9.5%]">
            <div className="mx-2 my-2 p-1 bg-green-600 rounded justify-center items-center hover:scale-105 w-[200px] h-[47px] shadow-lg">
              <button
                type="button"
                className="ml-[23%] mt-[3px] flex items-center justify-center text-white"
                onClick={() => alert("Approve TOS (no backend yet)")}
              >
                <svg width="30px" height="30px" viewBox="0 0 1024 1024">
                  <path d="M905.92 237.76a32 32 0 0 0-52.48 36.48A416 416 0 1 1 96 512a418.56 418.56 0 0 1 297.28-398.72 32 32 0 1 0-18.24-61.44A480 480 0 1 0 992 512a477.12 477.12 0 0 0-86.08-274.24z" fill="#31a858" />
                  <path d="M630.72 113.28A413.76 413.76 0 0 1 768 185.28a32 32 0 0 0 39.68-50.24 476.8 476.8 0 0 0-160-83.2 32 32 0 0 0-18.24 61.44zM489.28 86.72a36.8 36.8 0 0 0 10.56 6.72 30.08 30.08 0 0 0 24.32 0 37.12 37.12 0 0 0 10.56-6.72A32 32 0 0 0 544 64a33.6 33.6 0 0 0-9.28-22.72A32 32 0 0 0 505.6 32a20.8 20.8 0 0 0-5.76 1.92 23.68 23.68 0 0 0-5.76 2.88l-4.8 3.84a32 32 0 0 0-6.72 10.56A32 32 0 0 0 480 64a32 32 0 0 0 2.56 12.16 37.12 37.12 0 0 0 6.72 10.56zM230.08 467.84a36.48 36.48 0 0 0 0 51.84L413.12 704a36.48 36.48 0 0 0 51.84 0l328.96-330.56A36.48 36.48 0 0 0 742.08 320l-303.36 303.36-156.8-155.52a36.8 36.8 0 0 0-51.84 0z" fill="#31a858" />
                </svg>
                <div className="m-1 mx-2 text-white text-center">Approve</div>
              </button>
            </div>
            <div className="mx-2 my-2 p-1 bg-pink-400 rounded justify-center items-center hover:scale-105 shadow-lg">
              <button
                type="button"
                className="mt-[2px] flex items-center justify-center text-white"
                onClick={() => alert("Return for Revision (no backend yet)")}
              >
                <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none">
                  <path d="M12.9998 8L6 14L12.9998 21" stroke="#fb6a5e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fb6a5e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="m-1 mx-2 text-white text-center">Return for Revision</div>
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center mb-20 w-full">
          <div className="mt-4 mx-auto shadow-lg pb-20 border border-white bg-white w-[80%]">
            {/* OUTER CONTAINER */}
            <div className="mx-auto mt-6 w-11/12 border-[1px] border-black bg-white font-serif text-sm p-4">
              {/* HEADER SECTION */}
              <div className="flex justify-center items-start mb-4">
                <div className="flex justify-between items-start w-full max-w-5xl">
                  {/* LEFT: Logo + Campus Info */}
                  <div className="flex items-start space-x-4 w-[70%]">
                    <div className="-ml-6">
                      <img src="/assets/ustplogo.png" alt="USTP Logo" className="w-20 h-auto" />
                    </div>
                    <div>
                      <h1 className="text-md font-bold uppercase leading-tight ml-11 p-2">
                        University of Science and Technology of Southern Philippines
                      </h1>
                      <p className="text-sm mt-1 ml-11">
                        Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
                      </p>
                    </div>
                  </div>
                  {/* RIGHT: Document Info Table */}
                  <table className="text-xs text-center border border-gray-400 ml-20">
                    <thead>
                      <tr className="bg-black-100 text-black">
                        <th colSpan={3} className="border border-gray-400 px-3 py-1 text-xs font-semibold">
                          Document Code No.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={3} className="border border-gray-400 py-1 text-sm font-bold text-gray-700">
                          FM-USTP-ACAD-12
                        </td>
                      </tr>
                      <tr className="bg-[#5A6E99] text-black">
                        <td className="border border-gray-400 px-2 py-1 font-medium">Rev. No.</td>
                        <td className="border border-gray-400 px-2 py-1 font-medium">Effective Date</td>
                        <td className="border border-gray-400 px-2 py-1 font-medium">Page No.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 px-2 py-1">{tos.tos_version}</td>
                        <td className="border border-gray-400 px-2 py-1">{formatDate(tos.effectivity_date)}</td>
                        <td className="border border-gray-400 px-2 py-1">#</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* TOS Info */}
              <div className="flex justify-end ml-12 mt-2 mr-12 pt-14 pl-6 text-xl font-semibold">
                <span className="font-bold">Term Examination: </span>
                <span className="ml-2 border-b-2 border-black pb-1 w-[300px]">{tos.tos_term}</span>
              </div>
              <div className="flex justify-end ml-12 mr-12 pt-1 text-xl font-semibold">
                <span className="font-bold">Course Code: </span>
                <span className="ml-2 border-b-2 border-black pb-1 w-[300px]">{tos.course_code}</span>
              </div>
              <div className="flex justify-end ml-12 mr-12 pt-1 text-xl font-semibold">
                <span className="font-bold">Course Title: </span>
                <span className="ml-2 border-b-2 border-black pb-1 w-[300px]">{tos.course_title}</span>
              </div>
              <div className="flex sticky justify-center ml-12 pt-6 text-3xl font-bold">
                TABLE OF SPECIFICATION
              </div>
              <div className="flex justify-center ml-12 mt-4 pt-2 text-xl font-semibold">
                <span className="font-bold text-center">S.Y.: </span>
                <span className="ml-2 border-b-2 border-black pb-1 w-[150px]">{tos.bg_school_year}</span>
                <span className="font-bold text-center ml-8">Semester: </span>
                <span className="ml-2 border-b-2 border-black pb-1 w-[150px]">{tos.course_semester}</span>
              </div>
              <div className="flex justify-left ml-14 pt-4 text-xl font-semibold">
                <span className="font-bold">Curricular Program/Year/Section: </span>
                <span className="ml-2 border-b-2 border-black pb-1 w-[200px]">{tos.tos_cpys}</span>
              </div>
              {/* Table Section */}
              <div className="mt-10 flex justify-center">
                {/* Course Outcomes Table */}
                <table className="mt-2 w-3/12 font-serif border-2 text-sm bg-white">
                  <tbody>
                    <tr>
                      <td>
                        <div className="mb-8">
                          <div className="text-center">
                            <span className="font-bold">COURSE OUTCOMES<br /><br /></span>
                          </div>
                          {course_outcomes.map((co, idx) => (
                            <div className="mb-2" key={idx}>
                              <p>
                                <span className="font-semibold p-4">{co.syll_co_code} : </span>
                                {co.syll_co_description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Main TOS Table */}
                <table className="mt-2 ml-4 border-2 border-solid w-8/12 font-serif text-sm bg-white">
                  <thead>
                    <tr>
                      <th rowSpan={3}>Topics</th>
                      <th rowSpan={3}>No. of <br /> Hours <br /> Taught</th>
                      <th rowSpan={3}>%</th>
                      <th rowSpan={3}>No. of <br />Test <br />Items</th>
                      <th colSpan={4} className="py-2">Cognitive Level</th>
                    </tr>
                    <tr>
                      <th>Knowledge</th>
                      <th>Comprehension</th>
                      <th>Application/ <br />Analysis</th>
                      <th>Synthesis/ <br /> Evaluation</th>
                    </tr>
                    <tr>
                      <th className="py-2 px-1">{tos.col_1_per}%</th>
                      <th>{tos.col_2_per}%</th>
                      <th>{tos.col_3_per}%</th>
                      <th>{tos.col_4_per}%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tos_rows.length > 0 ? (
                      tos_rows.map((row) => (
                        <tr key={row.tos_r_id}>
                          <td className="text-center p-2">{row.tos_r_topic}</td>
                          <td className="text-center">{row.tos_r_no_hours}</td>
                          <td className="text-center">{row.tos_r_percent}</td>
                          <td className="text-center">{row.tos_r_no_items}</td>
                          <td className="text-center">{row.tos_r_col_1}</td>
                          <td className="text-center">{row.tos_r_col_2}</td>
                          <td className="text-center">{row.tos_r_col_3}</td>
                          <td className="text-center">{row.tos_r_col_4}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8}>No data available</td>
                      </tr>
                    )}
                    <tr>
                      <td className="text-right font-bold">Total:</td>
                      <td></td>
                      <td></td>
                      <td className="text-center font-bold p-2">{tos.tos_no_items}</td>
                      <td className="text-center font-bold p-2">{total_tos_r_col_1}</td>
                      <td className="text-center font-bold p-2">{total_tos_r_col_2}</td>
                      <td className="text-center font-bold p-2">{total_tos_r_col_3}</td>
                      <td className="text-center font-bold p-2">{total_tos_r_col_4}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Signatories */}
              <div className="grid grid-cols-4 m-3 font-serif">
                <div className="flex justify-center items-center">
                  <div className="flex justify-center">Prepared by:</div>
                </div>
                <div>
                  {bLeaders.map((bLeader, idx) => (
                    <div className="mb-10 mt-5" key={idx}>
                      <div className="flex justify-center">
                        {tos.chair_submitted_at && bLeader.signature && (
                          <img
                            src={`/assets/signatures/${bLeader.signature}`}
                            alt="Instructor Signature"
                            className="h-16 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex justify-center font-semibold underline text-center">
                        {`${bLeader.prefix.toUpperCase()} ${bLeader.firstname.toUpperCase()} ${bLeader.lastname.toUpperCase()} ${bLeader.suffix.toUpperCase()}`}
                      </div>
                      <div className="flex justify-center">Faculty</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex justify-center">Approved by:</div>
                </div>
                <div>
                  <div className="flex justify-center items-center mt-10">
                    {tos.chair_approved_at && chair.signature && (
                      <img
                        src={`/assets/signatures/${chair.signature}`}
                        alt="Chairperson Signature"
                        className="h-16 object-contain"
                      />
                    )}
                  </div>
                  <div className="flex justify-center font-semibold underline text-center">
                    {`${chair.prefix.toUpperCase()} ${chair.firstname.toUpperCase()} ${chair.lastname.toUpperCase()} ${chair.suffix.toUpperCase()}`}
                  </div>
                  <div className="flex justify-center">Department Chair</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TosView;