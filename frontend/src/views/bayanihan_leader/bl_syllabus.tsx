import { useEffect, useState } from "react";
import BLHeader from "../layouts/bl_header";
import BLSidebar from "../layouts/bl_sidebar";
import { Button } from "flowbite-react";

// ---------- Types ----------
type Syll = {
  dl_syll?: string | null; // ISO date string
  message?: string;
  notifId?: string | number;
  dismissUrl?: string;
};

type Props = {
  initialSyll?: Syll | null;
};

type SyllabusRow = {
  id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: string;
  chair_submitted_at: string;
  dean_approved_at: string;
  version: string;
  status: string;
};

// ---------- Component ----------
export default function SyllabusList({ initialSyll = null }: Props) {
  const [syll] = useState<Syll | null>(() => {
    try {
      const globalAny: any = window as any;
      return globalAny.__INITIAL_SYLL__ ?? initialSyll;
    } catch (e) {
      return initialSyll;
    }
  });

  const [showNotif, setShowNotif] = useState<boolean>(() =>
    Boolean(syll && (syll.message || syll.notifId))
  );
  const [remaining, setRemaining] = useState<string | null>(null);

  // Notification countdown
  useEffect(() => {
    if (!syll || !syll.dl_syll) return;
    const dueDate = new Date(syll.dl_syll);
    if (isNaN(dueDate.getTime())) return;

    function updateRemainingTime() {
      const now = new Date();
      const diff = dueDate.getTime() - now.getTime();
      if (diff <= 0) {
        setRemaining("Expired");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    updateRemainingTime();
    const id = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(id);
  }, [syll]);

  function dismissNotif() {
    if (syll && syll.dismissUrl) {
      fetch(syll.dismissUrl, { method: "POST" })
        .then(() => setShowNotif(false))
        .catch(() => setShowNotif(false));
    } else {
      setShowNotif(false);
    }
  }

  // ---------- Placeholder data (mock) ----------
  const syllabi: SyllabusRow[] = [
    {
      id: 1,
      course_code: "CS101",
      course_title: "Intro to Programming",
      bg_school_year: "2025-2026",
      course_semester: "1st Semester",
      chair_submitted_at: "2025-06-12",
      dean_approved_at: "2025-06-20",
      version: "1.0",
      status: "Approved by Dean",
    },
    {
      id: 2,
      course_code: "CS202",
      course_title: "Data Structures",
      bg_school_year: "2025-2026",
      course_semester: "2nd Semester",
      chair_submitted_at: "2025-03-02",
      dean_approved_at: "—",
      version: "1.1",
      status: "Pending Chair Review",
    },
  ];

  // ---------- Status Styles ----------
  const statusStyles: Record<string, string> = {
    Draft: "bg-gray-200 text-gray-700 border-gray-400",
    "Pending Chair Review": "bg-amber-100 text-amber-700 border-amber-300",
    "Returned by Chair": "bg-rose-200 text-rose-700 border-rose-400",
    "Requires Revision (Chair)": "bg-red-200 text-red-700 border-red-400",
    "Revised for Chair": "bg-blue-100 text-blue-600 border-blue-300",
    "Approved by Chair": "bg-green-100 text-green-700 border-green-400",
    "Returned by Dean": "bg-rose-300 text-rose-800 border-rose-500",
    "Requires Revision (Dean)": "bg-pink-200 text-pink-700 border-pink-400",
    "Revised for Dean": "bg-blue-200 text-blue-700 border-blue-400",
    "Approved by Dean": "bg-emerald-200 text-emerald-700 border-emerald-400",
  };

  return (
    <div
      className="min-h-screen bg-[#EEEEEE]"
      style={{
        backgroundImage: "url('/assets/Wave.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      {/* Header + Sidebar layout */}
      <div className="flex">
        <div className="w-64">
          <BLSidebar />
          <BLHeader />
        </div>

        <main className="flex-1 p-8">
          {/* Floating notification */}
          {showNotif && (
            <div className="fixed top-6 right-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 px-6 py-4 rounded shadow-lg z-50 w-96 flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>

              <div className="flex-1 text-sm font-medium">
                {syll?.message ?? "New Notification"}
                {remaining && (
                  <div
                    id="remaining-time"
                    className="text-xs font-normal text-gray-600"
                  >
                    Remaining: {remaining}
                  </div>
                )}
              </div>

              <button
                onClick={dismissNotif}
                className="ml-4 text-sm text-yellow-900 hover:text-yellow-700 font-semibold underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Content Container */}
          <div className="m-auto p-8 bg-white mt-[5%] shadow-lg rounded-lg w-full max-w-6xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-4xl text-[#201B50]">
                List of Syllabus
              </h1>

              <a
                href="#create-syllabus"
                className="whitespace-nowrap rounded mr-1.5 hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2 max-w-full"
                style={{ background: "#d7ecf9" }}
                onMouseOver={(e) =>
                  ((e.currentTarget.style.background = "#c3dff3"))
                }
                onMouseOut={(e) =>
                  ((e.currentTarget.style.background = "#d7ecf9"))
                }
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8v8M8 12h8"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                </svg>
                Create Syllabus
              </a>
            </div>

            {/* ---------------- Filters ---------------- */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-left">
              <div className="relative w-[18%]">
                <input
                  type="text"
                  className="border border-black focus:outline-none focus:border-blue w-full rounded p-1 pr-10"
                  placeholder="Search..."
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2"
                  tabIndex={-1}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                      stroke="#2468d2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <select className="border rounded p-1 w-[15%]">
                <option value="">Year level (All)</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
              <select className="border rounded p-1 w-[15%]">
                <option value="">Semester (All)</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="Mid Year">Mid Year</option>
              </select>
              <select className="border rounded p-1 w-[18%]">
                <option value="">School Year (All)</option>
                <option value="2025-2026">2025-2026</option>
              </select>
              <select className="border rounded p-1 w-[14%]">
                <option value="">Status (All)</option>
                <option value="Pending">Pending</option>
                <option value="Approved by Chair">Approved by Chair</option>
                <option value="Returned by Chair">Returned by Chair</option>
                <option value="Approved by Dean">Approved by Dean</option>
                <option value="Returned by Dean">Returned by Dean</option>
              </select>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1">
                Apply Filters
              </button>
            </div>

            {/* ---------------- Table ---------------- */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-500">
                  <tr>
                    <th className="px-6 py-3 rounded-tl">Course Code</th>
                    <th className="px-6 py-3">Course Title</th>
                    <th className="px-6 py-3">School Year</th>
                    <th className="px-6 py-3">Semester</th>
                    <th className="px-6 py-3">Date Submitted At</th>
                    <th className="px-6 py-3">Date Approved At</th>
                    <th className="px-6 py-3">Version</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 rounded-tr">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {syllabi.map((s, idx) => (
                    <tr
                      key={s.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-[#e9edf7]"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {s.course_code}
                      </td>
                      <td className="px-6 py-4">{s.course_title}</td>
                      <td className="px-6 py-4">{s.bg_school_year}</td>
                      <td className="px-6 py-4">{s.course_semester}</td>
                      <td className="px-6 py-4">{s.chair_submitted_at}</td>
                      <td className="px-6 py-4">{s.dean_approved_at}</td>
                      <td className="px-6 py-4">Version {s.version}</td>
                      <td className="px-6 py-4">
                        <div
                          className={`px-2 py-1 text-center border rounded-lg ${
                            statusStyles[s.status] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {s.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" color="green">View</Button>
                          <Button size="sm" color="red">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
