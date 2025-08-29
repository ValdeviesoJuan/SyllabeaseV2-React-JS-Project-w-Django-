import React, { useEffect, useState } from "react";
import BLHeader from "../layouts/bl_header";
import BLSidebar from "../layouts/bl_sidebar";
import { Button } from "flowbite-react";

type Notification = {
  id?: string | number;
  message?: string;
  dismissUrl?: string;
};

type Props = {
  initialNotif?: Notification | null;
};

export default function BLTOSPage({ initialNotif = null }: Props) {
  const [notif, setNotif] = useState<Notification | null>(() => {
    try {
      const anyWin: any = window as any;
      return anyWin.__INITIAL_NOTIF ?? initialNotif;
    } catch {
      return initialNotif;
    }
  });

  const [showNotif, setShowNotif] = useState<boolean>(() =>
    Boolean(notif && notif.message)
  );

  useEffect(() => {
    setShowNotif(Boolean(notif && notif.message));
  }, [notif]);

  function dismissNotif() {
    if (notif?.dismissUrl) {
      fetch(notif.dismissUrl, { method: "POST" })
        .then(() => {
          setShowNotif(false);
          setNotif(null);
        })
        .catch(() => {
          setShowNotif(false);
          setNotif(null);
        });
    } else {
      setShowNotif(false);
      setNotif(null);
    }
  }

  // --- Local states for filters ---
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course_year_level: "",
    course_semester: "",
    tos_term: "",
    bg_school_year: "",
    tos_status: "",
  });

  // Example static TOS data (replace with Django fetch later)
  const [toss] = useState([
    {
      id: 1,
      course_code: "CS101",
      course_title: "Intro to CS",
      bg_school_year: "2024-2025",
      course_semester: "1st Semester",
      tos_term: "Midterm",
      chair_submitted_at: "2024-08-01",
      chair_approved_at: "",
      tos_version: "1",
      tos_status: "Pending Review",
    },
    {
      id: 2,
      course_code: "MATH201",
      course_title: "Calculus II",
      bg_school_year: "2023-2024",
      course_semester: "2nd Semester",
      tos_term: "Finals",
      chair_submitted_at: "2024-02-15",
      chair_approved_at: "2024-02-20",
      tos_version: "2",
      tos_status: "Approved by Chair",
    },
  ]);

  // Apply filters locally
  const filteredToss = toss.filter((tos) => {
    return (
      (!search ||
        tos.course_code.toLowerCase().includes(search.toLowerCase()) ||
        tos.course_title.toLowerCase().includes(search.toLowerCase())) &&
      (!filters.course_year_level ||
        tos.course_code.includes(filters.course_year_level)) &&
      (!filters.course_semester ||
        tos.course_semester === filters.course_semester) &&
      (!filters.tos_term || tos.tos_term === filters.tos_term) &&
      (!filters.bg_school_year || tos.bg_school_year === filters.bg_school_year) &&
      (!filters.tos_status || tos.tos_status === filters.tos_status)
    );
  });

  const statusStyles: Record<string, string> = {
    Draft: "bg-gray-300 text-gray-700 border-gray-400",
    "Pending Review": "bg-amber-100 text-amber-700 border-amber-300",
    "Returned by Chair": "bg-rose-200 text-rose-700 border-rose-400",
    "Requires Revision": "bg-red-200 text-red-700 border-red-400",
    "Revisions Applied": "bg-blue-200 text-blue-700 border-blue-400",
    "Approved by Chair": "bg-green-200 text-green-700 border-green-400",
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10 min-h-screen bg-no-repeat bg-top bg-contain"
        style={{ backgroundImage: "url('/assets/Wave.png')" }}
      />

      {/* Header + Sidebar */}
      <BLSidebar />
      <BLHeader />

      {/* Floating notification */}
      {showNotif && notif?.message && (
        <div className="fixed top-6 right-6 bg-[#FEF3C7] border-l-4 border-[#F59E0B] text-[#92400E] px-6 py-4 rounded shadow-lg z-50 w-96 flex items-start space-x-3">
          <svg
            className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1"
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
          <div className="flex-1 text-sm font-medium">{notif.message}</div>
          <button
            onClick={dismissNotif}
            className="ml-4 text-sm text-[#92400E] hover:text-[#B45309] font-semibold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page content */}
      <main className="pl-[288px] pt-[72px] p-6">
        {/* TOS List + Create Button */}
        <div className="m-auto pb-12 p-8 bg-white mt-[6%] shadow-lg rounded w-full max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-bold text-4xl text-[#201B50]">
                TOS list
              </h1>
            
          </div>

          {/* Filters */}
          <div className="flex flex-nowrap items-center gap-2 mb-4 w-full">
            {/* Search */}
            <div className="relative w-[20%] min-w-0">
              <input
                type="text"
                className="border focus:outline-none focus:border-blue-500 border-black w-full rounded p-1 pr-10 min-w-0"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                <svg
                  width="24px"
                  height="24px"
                  className="rounded-lg p-[2px]"
                  viewBox="0 0 24 24"
                  fill="none"
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

            {/* Filters */}
            {/* ... (your select filters remain unchanged) ... */}

            <Button color="blue">Apply Filters</Button>
            <Button
              className="bg-[#d7ecf9] hover:bg-[#c3dff3] text-gray-800 flex items-center gap-2"
              onClick={() => alert("Open Create TOS modal (placeholder)")}
            >
              {/* Circle plus icon */}
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
              Create TOS
            </Button>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left text-gray-500">
            <thead>
              <tr>
                <th className="bg-blue-500 text-white px-6 py-3 rounded-tl-lg">
                  Course
                </th>
                <th className="bg-blue-500 text-white px-6 py-3">School Year</th>
                <th className="bg-blue-500 text-white px-6 py-3">Semester</th>
                <th className="bg-blue-500 text-white px-6 py-3">Term</th>
                <th className="bg-blue-500 text-white px-6 py-3">Submitted At</th>
                <th className="bg-blue-500 text-white px-6 py-3">Approved At</th>
                <th className="bg-blue-500 text-white px-6 py-3">Version</th>
                <th className="bg-blue-500 text-white px-6 py-3">Status</th>
                <th className="bg-blue-500 text-white px-6 py-3 rounded-tr-lg">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredToss.map((tos, idx) => (
                <tr
                  key={tos.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#e9edf7]"}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {tos.course_code} - {tos.course_title}
                  </td>
                  <td className="px-6 py-4">{tos.bg_school_year}</td>
                  <td className="px-6 py-4">{tos.course_semester}</td>
                  <td className="px-6 py-4">{tos.tos_term}</td>
                  <td className="px-6 py-4">{tos.chair_submitted_at}</td>
                  <td className="px-6 py-4">{tos.chair_approved_at}</td>
                  <td className="px-6 py-4">Version {tos.tos_version}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`w-full text-center px-1 py-1 border-2 rounded-lg ${
                        statusStyles[tos.tos_status] || "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tos.tos_status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        color="light"
                        onClick={() => alert(`View TOS ${tos.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="xs"
                        color="light"
                        onClick={() => alert(`Edit TOS ${tos.id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
