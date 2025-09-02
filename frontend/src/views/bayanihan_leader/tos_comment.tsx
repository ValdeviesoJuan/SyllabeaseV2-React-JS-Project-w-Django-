// src/views/bayanihan_leader/tos_view.tsx
import React, { useEffect, useMemo, useState } from "react";
import "flowbite"; // Flowbite styles/scripts if integrated
// No direct static imports for assets so this works with CRA/Vite public folder: /assets/...

// -------------------- Types --------------------
type TOSRow = {
  tos_r_id: number;
  tos_r_topic: string;
  tos_r_no_hours: number;
  tos_r_percent: number;
  tos_r_no_items: number;
  tos_r_col_1: number;
  tos_r_col_2: number;
  tos_r_col_3: number;
  tos_r_col_4: number;
};

type CourseOutcome = {
  syll_co_code: string;
  syll_co_description: string;
};

type Leader = {
  prefix: string;
  firstname: string;
  lastname: string;
  suffix?: string;
  signature?: string; // url path relative to public e.g. '/assets/signatures/john.png'
};

type Chair = {
  prefix: string;
  firstname: string;
  lastname: string;
  suffix?: string;
  signature?: string;
};

type TOS = {
  tos_id: number;
  tos_version?: string;
  effectivity_date?: string;
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
};

// -------------------- Mock fallback data (frontend-only) --------------------
const MOCK_TOS: TOS = {
  tos_id: 1,
  tos_term: "Midterm",
  course_code: "CS101",
  course_title: "Introduction to Computer Science",
  bg_school_year: "2024-2025",
  course_semester: "1st",
  tos_cpys: "BSCS / 1 / A",
  tos_no_items: 20,
  col_1_per: 25,
  col_2_per: 25,
  col_3_per: 25,
  col_4_per: 25,
  col_1_exp: 5,
  col_2_exp: 5,
  col_3_exp: 5,
  col_4_exp: 5,
};

const MOCK_TOS_ROWS: TOSRow[] = [
  {
    tos_r_id: 1,
    tos_r_topic: "Intro & History",
    tos_r_no_hours: 2,
    tos_r_percent: 10,
    tos_r_no_items: 2,
    tos_r_col_1: 1,
    tos_r_col_2: 0,
    tos_r_col_3: 1,
    tos_r_col_4: 0,
  },
  {
    tos_r_id: 2,
    tos_r_topic: "Variables & Types",
    tos_r_no_hours: 4,
    tos_r_percent: 20,
    tos_r_no_items: 4,
    tos_r_col_1: 1,
    tos_r_col_2: 1,
    tos_r_col_3: 2,
    tos_r_col_4: 0,
  },
];

const MOCK_COURSE_OUTCOMES: CourseOutcome[] = [
  { syll_co_code: "CO1", syll_co_description: "Understand basics" },
  { syll_co_code: "CO2", syll_co_description: "Apply concepts" },
];

const MOCK_BLEADERS: Leader[] = [
  { prefix: "Dr.", firstname: "John", lastname: "Doe", signature: "/assets/signatures/john.png" },
];

const MOCK_CHAIR: Chair = {
  prefix: "Prof.",
  firstname: "Jane",
  lastname: "Smith",
  signature: "/assets/signatures/jane.png",
};

// -------------------- Component --------------------
const TOSView: React.FC = () => {
  const [tos, setTos] = useState<TOS | null>(null);
  const [tosRows, setTosRows] = useState<TOSRow[]>([]);
  const [courseOutcomes, setCourseOutcomes] = useState<CourseOutcome[]>([]);
  const [bLeaders, setBLeaders] = useState<Leader[]>([]);
  const [chair, setChair] = useState<Chair | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Attempt to fetch real data from backend; if it fails use mock data so frontend works standalone.
    const fetchData = async () => {
      try {
        const resp = await fetch("/api/tos-view"); // replace with real API when available
        if (!resp.ok) throw new Error("API not available");
        const data = await resp.json();

        // expect shape: { tos, tosRows, courseOutcomes, bLeaders, chair }
        setTos(data.tos ?? MOCK_TOS);
        setTosRows(data.tosRows ?? MOCK_TOS_ROWS);
        setCourseOutcomes(data.courseOutcomes ?? MOCK_COURSE_OUTCOMES);
        setBLeaders(data.bLeaders ?? MOCK_BLEADERS);
        setChair(data.chair ?? MOCK_CHAIR);
      } catch (err) {
        // fallback to mock data
        console.warn("TOS API not reachable — using mock frontend-only data.", err);
        setTos(MOCK_TOS);
        setTosRows(MOCK_TOS_ROWS);
        setCourseOutcomes(MOCK_COURSE_OUTCOMES);
        setBLeaders(MOCK_BLEADERS);
        setChair(MOCK_CHAIR);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totals = useMemo(() => {
    const totals = {
      totalHours: tosRows.reduce((s, r) => s + (r.tos_r_no_hours || 0), 0),
      totalPercent: tosRows.reduce((s, r) => s + (r.tos_r_percent || 0), 0),
      totalItems: tosRows.reduce((s, r) => s + (r.tos_r_no_items || 0), 0),
      totalCol1: tosRows.reduce((s, r) => s + (r.tos_r_col_1 || 0), 0),
      totalCol2: tosRows.reduce((s, r) => s + (r.tos_r_col_2 || 0), 0),
      totalCol3: tosRows.reduce((s, r) => s + (r.tos_r_col_3 || 0), 0),
      totalCol4: tosRows.reduce((s, r) => s + (r.tos_r_col_4 || 0), 0),
    };
    return totals;
  }, [tosRows]);

  if (loading) {
    return <div className="p-8 text-center">Loading TOS view...</div>;
  }

  if (!tos) {
    return <div className="p-8 text-center">No TOS data found.</div>;
  }

  return (
    <div
      className="flex flex-col justify-center mb-20 w-screen min-h-screen"
      style={{
        backgroundImage: `url(/assets/Wave.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div className="mt-24 mx-auto shadow-lg pb-10 border border-white bg-white w-[80%]">
        {/* Header / meta info */}
        <div className="flex justify-end ml-12 mt-2 mr-12 pt-14 pl-6 text-xl font-semibold">
          <span className="font-sans font-bold">Term Examination: </span>
          <span className="ml-2" style={{ borderBottom: "2px solid #000", paddingBottom: 4, width: 300 }}>
            {tos.tos_term}
          </span>
        </div>

        <div className="flex justify-end ml-12 mr-12 pt-1 text-xl font-semibold">
          <span className="font-sans font-bold">Course Code: </span>
          <span className="ml-2" style={{ borderBottom: "2px solid #000", paddingBottom: 4, width: 300 }}>
            {tos.course_code}
          </span>
        </div>

        <div className="flex justify-end ml-12 mr-12 pt-1 text-xl font-semibold">
          <span className="font-sans font-bold">Course Title: </span>
          <span className="ml-2" style={{ borderBottom: "2px solid #000", paddingBottom: 4, width: 300 }}>
            {tos.course_title}
          </span>
        </div>

        <div className="flex justify-center ml-12 pt-6 text-3xl font-bold">TABLE OF SPECIFICATION</div>

        <div className="flex justify-center ml-12 mt-4 pt-2 text-xl font-semibold">
          <span className="font-sans font-bold">S.Y.: </span>
          <span className="ml-2" style={{ borderBottom: "2px solid #000", paddingBottom: 4, width: 150 }}>
            {tos.bg_school_year}
          </span>
          <span className="font-sans font-bold ml-4">Semester: </span>
          <span className="ml-2" style={{ borderBottom: "2px solid #000", paddingBottom: 4, width: 150 }}>
            {tos.course_semester}
          </span>
        </div>

        <div className="flex justify-left ml-14 pt-4 text-xl font-semibold">
          <span className="font-sans font-bold"> Curricular Program/Year/Section: </span>
          <span className="ml-2" style={{ borderBottom: "2px solid #000", paddingBottom: 4, width: 200 }}>
            {tos.tos_cpys}
          </span>
        </div>

        {/* Tables */}
        <div className="mt-10 flex justify-center gap-4 px-6 pb-8">
          {/* Course outcomes */}
         <table className="mt-2 border-2 border-black border-collapse w-3/12 font-serif text-sm bg-white">
            <thead>
                <tr>
                <th className="text-center font-bold border border-black">COURSE OUTCOMES</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="pt-2 align-top border border-black">
                    {courseOutcomes.map((co, idx) => (
                    <p key={idx} className="p-2">
                        <span className="font-semibold">{co.syll_co_code} : </span>
                        {co.syll_co_description}
                    </p>
                    ))}
                </td>
                </tr>
            </tbody>
            </table>

            {/* Topics Table */}
            <table className="mt-2 ml-4 border-2 border-black border-collapse w-8/12 font-serif text-sm bg-white">
            <thead>
                <tr>
                <th rowSpan={3} className="p-2 border border-black">Topics</th>
                <th rowSpan={3} className="p-2 border border-black">
                    No. of <br />
                    Hours <br />
                    Taught
                </th>
                <th rowSpan={3} className="p-2 border border-black">%</th>
                <th rowSpan={3} className="p-2 border border-black">
                    No. of <br />
                    Test <br />
                    Items
                </th>
                <th colSpan={4} className="py-2 border border-black">Cognitive Level</th>
                </tr>

                <tr>
                <th className="border border-black">Knowledge</th>
                <th className="border border-black">Comprehension</th>
                <th className="border border-black">Application/ <br />Analysis</th>
                <th className="border border-black">Synthesis/ <br /> Evaluation</th>
                </tr>

                <tr>
                <th className="border border-black">
                    <div className="text-center mb-2 -mt-1">{tos.col_1_per}%</div>
                </th>
                <th className="border border-black">
                    <div className="text-center mb-2 -mt-1">{tos.col_2_per}%</div>
                </th>
                <th className="border border-black">
                    <div className="text-center mb-2 -mt-1">{tos.col_3_per}%</div>
                </th>
                <th className="border border-black">
                    <div className="text-center mb-2 -mt-1">{tos.col_4_per}%</div>
                </th>
                </tr>
            </thead>

            <tbody>
                {tosRows.length > 0 ? (
                tosRows.map((r) => (
                    <tr key={r.tos_r_id}>
                    <td className="border border-black">
                        <div className="mb-2 -mt-1 whitespace-pre-line">{r.tos_r_topic}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1">{r.tos_r_no_hours}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1 mx-3">{r.tos_r_percent}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1">{r.tos_r_no_items}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1">{Math.trunc(r.tos_r_col_1)}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1">{Math.trunc(r.tos_r_col_2)}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1">{Math.trunc(r.tos_r_col_3)}</div>
                    </td>
                    <td className="border border-black">
                        <div className="text-center mb-2 -mt-1">{Math.trunc(r.tos_r_col_4)}</div>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={8} className="text-center border border-black">
                    No data available
                    </td>
                </tr>
                )}

                {/* Totals */}
                <tr>
                <td className="text-right font-bold border border-black">Total:</td>
                <td className="text-center font-bold p-2 border border-black">{totals.totalHours}</td>
                <td className="text-center font-bold p-2 border border-black">{totals.totalPercent}</td>
                <td className="text-center font-bold p-2 border border-black">{tos.tos_no_items}</td>
                <td className="text-center font-bold p-2 border border-black">{totals.totalCol1}</td>
                <td className="text-center font-bold p-2 border border-black">{totals.totalCol2}</td>
                <td className="text-center font-bold p-2 border border-black">{totals.totalCol3}</td>
                <td className="text-center font-bold p-2 border border-black">{totals.totalCol4}</td>
                </tr>
            </tbody>
            </table>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-4 m-3 font-serif">
          <div className="flex justify-center items-center">
            <div className="flex justify-center">Prepared by:</div>
          </div>

          <div>
            {bLeaders.map((b, idx) => (
              <div key={idx} className="mb-10 mt-10">
                <div className="flex justify-center">
                  {tos.chair_submitted_at && b.signature ? (
                    // show signature image only when submitted (keeps parity with blade)
                    <img src={b.signature} alt="Instructor Signature" className="h-16 object-contain" />
                  ) : null}
                </div>

                <div className="flex justify-center font-semibold underline">
                  {`${b.prefix} ${b.firstname} ${b.lastname} ${b.suffix || ""}`.toUpperCase()}
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
              {tos.chair_approved_at && chair?.signature ? (
                <img src={chair.signature} alt="Chairperson Signature" className="h-16 object-contain" />
              ) : null}
            </div>

            <div className="flex justify-center font-semibold underline">
              {chair ? `${chair.prefix} ${chair.firstname} ${chair.lastname} ${chair.suffix || ""}`.toUpperCase() : ""}
            </div>

            <div className="flex justify-center">Department Chair</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOSView;
