import React, { useEffect, useState } from "react";
import "flowbite"; // ✅ Flowbite

// ✅ Types
interface TOSRow {
  tos_r_topic: string;
  tos_r_no_hours: number;
  tos_r_percent: number;
  tos_r_no_items: number;
  tos_r_col_1: number;
  tos_r_col_2: number;
  tos_r_col_3: number;
  tos_r_col_4: number;
}

interface CourseOutcome {
  syll_co_code: string;
  syll_co_description: string;
}

interface Leader {
  prefix: string;
  firstname: string;
  lastname: string;
  suffix?: string;
  signature?: string;
}

interface Chair {
  prefix: string;
  firstname: string;
  lastname: string;
  suffix?: string;
  signature?: string;
}

interface TOS {
  tos_version: string;
  effectivity_date: string;
  tos_term: string;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: string;
  tos_cpys: string;
  tos_no_items: number;
  col_1_per: number;
  col_2_per: number;
  col_3_per: number;
  col_4_per: number;
  col_1_exp: number;
  col_2_exp: number;
  col_3_exp: number;
  col_4_exp: number;
  chair_submitted_at?: string | null;
  chair_approved_at?: string | null;
}

// ✅ Component
const TOSView: React.FC = () => {
  const [tos, setTos] = useState<TOS | null>(null);
  const [tosRows, setTosRows] = useState<TOSRow[]>([]);
  const [courseOutcomes, setCourseOutcomes] = useState<CourseOutcome[]>([]);
  const [bLeaders, setBLeaders] = useState<Leader[]>([]);
  const [chair, setChair] = useState<Chair | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🚧 Mock data for frontend testing
    const mockData = {
      tos: {
        tos_version: "01",
        effectivity_date: "2025-09-01",
        tos_term: "Midterm",
        course_code: "CS101",
        course_title: "Introduction to Computing",
        bg_school_year: "2025-2026",
        course_semester: "1st",
        tos_cpys: "BSCS 2A",
        tos_no_items: 50,
        col_1_per: 20,
        col_2_per: 30,
        col_3_per: 30,
        col_4_per: 20,
        col_1_exp: 10,
        col_2_exp: 15,
        col_3_exp: 15,
        col_4_exp: 10,
      },
      tosRows: [
        {
          tos_r_topic: "Introduction to Computers",
          tos_r_no_hours: 5,
          tos_r_percent: 10,
          tos_r_no_items: 5,
          tos_r_col_1: 2,
          tos_r_col_2: 2,
          tos_r_col_3: 1,
          tos_r_col_4: 0,
        },
        {
          tos_r_topic: "Programming Basics",
          tos_r_no_hours: 10,
          tos_r_percent: 20,
          tos_r_no_items: 10,
          tos_r_col_1: 2,
          tos_r_col_2: 3,
          tos_r_col_3: 3,
          tos_r_col_4: 2,
        },
      ],
      courseOutcomes: [
        { syll_co_code: "CO1", syll_co_description: "Understand basic computing concepts" },
        { syll_co_code: "CO2", syll_co_description: "Apply programming principles" },
      ],
      bLeaders: [
        { prefix: "Mr.", firstname: "John", lastname: "Doe", suffix: "", signature: "" },
      ],
      chair: { prefix: "Dr.", firstname: "Jane", lastname: "Smith", suffix: "", signature: "" },
    };

    // ✅ Simulate API fetch
    setTimeout(() => {
      setTos(mockData.tos);
      setTosRows(mockData.tosRows);
      setCourseOutcomes(mockData.courseOutcomes);
      setBLeaders(mockData.bLeaders);
      setChair(mockData.chair);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="p-10 text-center">Loading TOS...</div>;
  if (!tos) return <div className="p-10 text-center">No TOS data found.</div>;

  return (
    <div
      className="min-h-screen bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/assets/Wave.png)" }} // ✅ Public assets
    >
      <div className="mx-auto shadow-lg pb-20 border border-white bg-white w-[80%]">
        {/* HEADER */}
        <div className="mx-auto mt-6 w-11/12 border border-black bg-white font-serif text-sm p-4">
          <div className="flex justify-between items-start w-full max-w-5xl mx-auto mb-6">
            {/* LEFT: Logo + Campus Info */}
            <div className="flex items-start space-x-4 w-[70%]">
              <img
                src="/assets/ustplogo.png" // ✅ Public assets
                alt="USTP Logo"
                className="w-20 h-auto"
              />
              <div>
                <h1 className="text-md font-bold uppercase leading-tight p-2">
                  University of Science and Technology of Southern Philippines
                </h1>
                <p className="text-sm mt-1">
                  Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan |
                  Oroquieta | Panaon | Villanueva
                </p>
              </div>
            </div>

            {/* RIGHT: Document Info */}
            <table className="text-xs text-center border border-gray-400">
              <thead>
                <tr className="bg-[#5A6E99] text-white">
                  <th colSpan={3} className="border border-gray-400 px-3 py-1">
                    Document Code No.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={3}
                    className="border border-gray-400 py-1 text-sm font-bold text-gray-700"
                  >
                    FM-USTP-ACAD-12
                  </td>
                </tr>
                <tr className="bg-[#5A6E99] text-white">
                  <td className="border border-gray-400 px-2 py-1">Rev. No.</td>
                  <td className="border border-gray-400 px-2 py-1">
                    Effective Date
                  </td>
                  <td className="border border-gray-400 px-2 py-1">Page No.</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-2 py-1">
                    {tos.tos_version}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {tos.effectivity_date}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">#</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* COURSE INFO */}
          <div className="flex justify-end mr-12 pt-2 text-xl font-semibold space-y-2 flex-col">
            <div>
              <span className="font-bold">Term Examination: </span>
              <span className="border-b-2 border-black ml-2 w-[300px] inline-block">
                {tos.tos_term}
              </span>
            </div>
            <div>
              <span className="font-bold">Course Code: </span>
              <span className="border-b-2 border-black ml-2 w-[300px] inline-block">
                {tos.course_code}
              </span>
            </div>
            <div>
              <span className="font-bold">Course Title: </span>
              <span className="border-b-2 border-black ml-2 w-[300px] inline-block">
                {tos.course_title}
              </span>
            </div>
          </div>

          {/* TITLE */}
          <div className="flex justify-center mt-6 text-3xl font-bold">
            TABLE OF SPECIFICATION
          </div>

          {/* SCHOOL YEAR + SEMESTER */}
          <div className="flex justify-center mt-4 text-xl font-semibold space-x-6">
            <span>S.Y.:</span>
            <span className="border-b-2 border-black w-[150px] text-center">
              {tos.bg_school_year}
            </span>
            <span>Semester:</span>
            <span className="border-b-2 border-black w-[150px] text-center">
              {tos.course_semester}
            </span>
          </div>

          {/* CURRICULAR */}
          <div className="flex justify-start ml-14 pt-4 text-xl font-semibold">
            <span>Curricular Program/Year/Section:</span>
            <span className="border-b-2 border-black ml-2 w-[200px]">
              {tos.tos_cpys}
            </span>
          </div>

          {/* TABLES */}
          <div className="mt-10 flex justify-center gap-4">
            {/* COURSE OUTCOMES */}
            <table className="border-2 w-3/12 font-serif text-sm bg-white">
              <thead>
                <tr>
                  <th className="text-center font-bold">COURSE OUTCOMES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">
                    {courseOutcomes.map((co, idx) => (
                      <p key={idx}>
                        <span className="font-semibold">{co.syll_co_code}:</span>{" "}
                        {co.syll_co_description}
                      </p>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* TOPICS TABLE */}
            <table className="border-2 w-8/12 font-serif text-sm bg-white">
              <thead>
                <tr>
                  <th rowSpan={3}>Topics</th>
                  <th rowSpan={3}>No. of Hours Taught</th>
                  <th rowSpan={3}>%</th>
                  <th rowSpan={3}>No. of Test Items</th>
                  <th colSpan={4}>Cognitive Level</th>
                </tr>
                <tr>
                  <th>Knowledge</th>
                  <th>Comprehension</th>
                  <th>Application/Analysis</th>
                  <th>Synthesis/Evaluation</th>
                </tr>
                <tr>
                  <th>{tos.col_1_per}%</th>
                  <th>{tos.col_2_per}%</th>
                  <th>{tos.col_3_per}%</th>
                  <th>{tos.col_4_per}%</th>
                </tr>
              </thead>
              <tbody>
                {tosRows.length > 0 ? (
                  tosRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2 whitespace-pre-line">
                        {row.tos_r_topic}
                      </td>
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
                    <td colSpan={8} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="text-right font-bold p-2">Total:</td>
                  <td className="text-center font-bold p-2">
                    {tosRows.reduce((sum, r) => sum + r.tos_r_no_hours, 0)}
                  </td>
                  <td className="text-center font-bold p-2">
                    {tosRows.reduce((sum, r) => sum + r.tos_r_percent, 0)}
                  </td>
                  <td className="text-center font-bold p-2">{tos.tos_no_items}</td>
                  <td className="text-center font-bold p-2">{tos.col_1_exp}</td>
                  <td className="text-center font-bold p-2">{tos.col_2_exp}</td>
                  <td className="text-center font-bold p-2">{tos.col_3_exp}</td>
                  <td className="text-center font-bold p-2">{tos.col_4_exp}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SIGNATURES */}
          <div className="grid grid-cols-4 m-3 font-serif mt-10">
            {/* Prepared by */}
            <div className="flex justify-center items-center">Prepared by:</div>
            <div>
              {bLeaders.map((leader, idx) => (
                <div key={idx} className="mb-10 mt-5">
                  {leader.signature && (
                    <div className="flex justify-center">
                      <img
                        src={leader.signature}
                        alt="Instructor Signature"
                        className="h-16 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex justify-center font-semibold underline text-center">
                    {`${leader.prefix} ${leader.firstname} ${leader.lastname} ${
                      leader.suffix || ""
                    }`.toUpperCase()}
                  </div>
                  <div className="flex justify-center">Faculty</div>
                </div>
              ))}
            </div>

            {/* Approved by */}
            <div className="flex justify-center items-center">Approved by:</div>
            <div>
              {chair?.signature && (
                <div className="flex justify-center mt-10">
                  <img
                    src={chair.signature}
                    alt="Chair Signature"
                    className="h-16 object-contain"
                  />
                </div>
              )}
              <div className="flex justify-center font-semibold underline text-center">
                {chair
                  ? `${chair.prefix} ${chair.firstname} ${chair.lastname} ${
                      chair.suffix || ""
                    }`.toUpperCase()
                  : ""}
              </div>
              <div className="flex justify-center">Department Chair</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOSView;
