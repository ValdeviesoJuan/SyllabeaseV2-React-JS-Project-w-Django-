// frontend/src/views/dean/deadline/DlList.tsx
import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Button } from "flowbite-react";

interface Deadline {
  id: number;
  dl_school_year: string;
  dl_semester: string;
  dl_syll: string;
  dl_tos_midterm: string;
  dl_tos_final: string;
}

// Mock deadlines (frontend only demo)
const mockDeadlines: Deadline[] = [
  {
    id: 1,
    dl_school_year: "2024-2025",
    dl_semester: "1st Semester",
    dl_syll: "2025-09-15",
    dl_tos_midterm: "2025-10-10",
    dl_tos_final: "2025-11-20",
  },
  {
    id: 2,
    dl_school_year: "2025-2026",
    dl_semester: "2nd Semester",
    dl_syll: "2025-12-15",
    dl_tos_midterm: "2026-01-10",
    dl_tos_final: "2026-02-20",
  },
];

const DlList: React.FC = () => {
  const [deadlines] = useState<Deadline[]>(mockDeadlines);

  return (
    <div className="flex">
      <DeanSidebar />
      <DeanHeader children={undefined} />

      <div
        className="flex-1 min-h-screen p-4 mt-14"
        style={{
          backgroundImage: 'url("/assets/Wave1.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
          backgroundColor: "#EEEEEE",
        }}
      >
        {/* Main container */}
        <div className="mt-12 flex flex-col items-center p-8">
          {/* Set Deadline Button */}
          <div className="mb-5 mt-4 pt-2 text-center">
            <Button
              type="button"
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-[#d7ecf9]"
              onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "#c3dff3";
              }}
              onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "#d7ecf9";
              }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                  stroke="black"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M16 2v4M8 2v4"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 14l3 3l5-5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Set Deadline
            </Button>
          </div>

          {/* Deadlines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl pl-52">
            {deadlines.map((dl) => (
              <div
                key={dl.id}
                className="p-4 bg-gradient-to-r from-[#FFF] to-[#dbeafe] rounded-xl transform hover:scale-105 transition duration-500 shadow-lg flex flex-col justify-between w-full"
              >
                {/* Deadline Details */}
                <div>
                  <div className="text-center font-bold text-2xl mb-4 text-sePrimary">
                    Deadline
                  </div>
                  <div className="text-blue mb-1">
                    <label className="text-left text-black font-medium">
                      School Year:{" "}
                    </label>
                    {dl.dl_school_year}
                  </div>
                  <div className="text-blue mb-1">
                    <label className="text-left text-black font-medium">
                      Semester:{" "}
                    </label>
                    {dl.dl_semester}
                  </div>
                  <div className="text-blue mb-1">
                    <label className="text-left text-black font-medium">
                      Syllabus Deadline:{" "}
                    </label>
                    {dl.dl_syll}
                  </div>
                  <div className="text-blue mb-1">
                    <label className="text-left text-black font-medium">
                      TOS Midterm Deadline:{" "}
                    </label>
                    {dl.dl_tos_midterm}
                  </div>
                  <div className="text-blue mb-1">
                    <label className="text-left text-black font-medium">
                      TOS Final Deadline:{" "}
                    </label>
                    {dl.dl_tos_final}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-6 flex flex-col gap-2">
                  <Button
                    type="button"
                    color="blue"
                    className="px-14 font-semibold hover:bg-[#2563eb] shadow-lg p-1 rounded-lg"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    color="light"
                    className="px-12 mt-2 text-[#6b7280] font-semibold hover:text-black shadow-lg p-1 rounded-lg"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DlList;
