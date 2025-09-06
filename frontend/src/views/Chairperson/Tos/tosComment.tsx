import React, { useState } from "react";
import ChairSidebar from "../../layouts/chairSidebar";
import Modal from "../../components/Modal";

// Mocked data (replace with backend API when available)
const tos = {
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

// Calculate totals
const total_tos_r_col_1 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_1 || 0), 0);
const total_tos_r_col_2 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_2 || 0), 0);
const total_tos_r_col_3 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_3 || 0), 0);
const total_tos_r_col_4 = tos_rows.reduce((sum, row) => sum + (row.tos_r_col_4 || 0), 0);

const TosComment: React.FC = () => {
  // Modal state (for future use)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>("curricula");
  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  return (
    <div>
      {/* Sidebar */}
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
        className="min-h-screen pt-14"
        style={{
          backgroundImage: "url(/assets/Wave.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className="flex flex-col justify-center mb-20 w-full mt-14">
          <div className="flex justify-end">
            <button
              className="mt-10 bg-green-600 rounded w-[100px] flex justify-center items-center text-white py-2 hover:bg-green-700 transition"
              onClick={() => (window.location.href = "/chairperson/tos")}
            >
              Finish
            </button>
          </div>
          <div className="mt-24 mx-auto shadow-lg pb-10 border border-white bg-white w-[80%]">
            {/* Header Info */}
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
            <div className="flex justify-center ml-12 pt-6 text-3xl font-bold">
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
              <table className="mt-2 w-3/12 font-serif text-sm bg-white border border-gray-300">
                <tbody>
                  <tr>
                    <td>
                      <div className="mb-8">
                        <div className="text-center font-bold">
                          COURSE OUTCOMES
                          <br />
                          <br />
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
                    <th rowSpan={3}>
                      No. of <br /> Hours <br /> Taught
                    </th>
                    <th rowSpan={3}>%</th>
                    <th rowSpan={3}>
                      No. of <br />
                      Test <br />
                      Items
                    </th>
                    <th colSpan={4} className="py-2">
                      Cognitive Level
                    </th>
                  </tr>
                  <tr>
                    <th>Knowledge</th>
                    <th>Comprehension</th>
                    <th>
                      Application/ <br />
                      Analysis
                    </th>
                    <th>
                      Synthesis/ <br />
                      Evaluation
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <div className="text-center mb-2 -mt-1">{tos.col_1_per}%</div>
                    </th>
                    <th>
                      <div className="text-center mb-2 -mt-1">{tos.col_2_per}%</div>
                    </th>
                    <th>
                      <div className="text-center mb-2 -mt-1">{tos.col_3_per}%</div>
                    </th>
                    <th>
                      <div className="text-center mb-2 -mt-1">{tos.col_4_per}%</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tos_rows.length > 0 ? (
                    tos_rows.map((row) => (
                      <tr key={row.tos_r_id}>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_topic}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_no_hours}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_percent}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_no_items}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_col_1}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_col_2}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_col_3}</div>
                        </td>
                        <td>
                          <div className="text-center mb-2 -mt-1">{row.tos_r_col_4}</div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                  {/* Totals Row */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TosComment;