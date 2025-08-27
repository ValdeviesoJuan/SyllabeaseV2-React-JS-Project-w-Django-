import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import BlSidebar from "../layouts/bl_sidebar";
import BlHeader from "../layouts/bl_header";


interface Syllabus {
  id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: string;
  chair_submitted_at: string;
  dean_approved_at: string;
  version: number;
  status: string;
}

interface DashboardProps {
  syllabiCount?: number;
  completedCount?: number;
  pendingCount?: number;
}

export default function Dashboard({
  syllabiCount = 10,
  completedCount = 4,
  pendingCount = 6,
}: DashboardProps) {
  const [dueDate] = useState<Date | null>(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // demo: 3 days ahead
  );
  const [remainingTime, setRemainingTime] = useState<string>("");

  // Sample syllabi data (mock)
  const [syllabi] = useState<Syllabus[]>([
    {
      id: 1,
      course_code: "CS101",
      course_title: "Introduction to Programming",
      bg_school_year: "2024-2025",
      course_semester: "1st Semester",
      chair_submitted_at: "2024-08-01",
      dean_approved_at: "2024-08-15",
      version: 1,
      status: "Approved by Chair",
    },
    {
      id: 2,
      course_code: "IT202",
      course_title: "Database Management",
      bg_school_year: "2024-2025",
      course_semester: "2nd Semester",
      chair_submitted_at: "2024-08-05",
      dean_approved_at: "2024-08-20",
      version: 2,
      status: "Pending",
    },
  ]);

  useEffect(() => {
    if (!dueDate) return;
    const timer = setInterval(() => {
      const now = new Date();
      const diff = dueDate.getTime() - now.getTime();
      if (diff <= 0) {
        setRemainingTime("Deadline passed");
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRemainingTime(`Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [dueDate]);

  // Status colors mapping
  const statusStyles: Record<string, string> = {
    Draft: "bg-gray-200 text-gray-600 border border-gray-400",
    "Pending Chair Review": "bg-amber-100 text-amber-600 border border-amber-300",
    "Returned by Chair": "bg-rose-200 text-rose-700 border border-rose-400",
    "Requires Revision (Chair)": "bg-red-200 text-red-600 border border-red-400",
    "Revised for Chair": "bg-blue-100 text-blue-600 border border-blue-400",
    "Approved by Chair": "bg-green-100 text-green-700 border border-green-400",
    "Returned by Dean": "bg-rose-300 text-rose-800 border border-rose-500",
    "Requires Revision (Dean)": "bg-pink-200 text-pink-600 border border-pink-400",
    "Revised for Dean": "bg-blue-200 text-blue-700 border border-blue-400",
    "Approved by Dean": "bg-emerald-200 text-emerald-700 border border-emerald-400",
    Pending: "bg-yellow-100 text-yellow-600 border border-yellow-400",
  };

  return (
    <div
      className="flex min-h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/assets/Wave.png')" }}
    >
      {/* Sidebar */}
      <BlSidebar />
  

      {/* Main Dashboard Content */}
      <div className="flex-1 absolute">
      <BlHeader />

        {/* Cards Section */}
        <div className="flex gap-6 mt-20 relative left-[325px]">
          {/* Card - No. of Syllabus */}
          <div className="flex items-center bg-white rounded-lg shadow-xl hover:scale-105 transition">
            <div className="m-5 bg-blue-100 rounded-full p-4">
              <svg
                fill="#2262c6"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.44,2.065H6.56a2.507,2.507,0,0,0-2.5,2.5v14.87a2.507,2.507,0,0,0,2.5,2.5H17.44a2.5,2.5,0,0,0,2.5-2.5V4.565A2.5,2.5,0,0,0,17.44,2.065Zm1.5,17.37a1.5,1.5,0,0,1-1.5,1.5H6.56a1.5,1.5,0,0,1-1.5-1.5V6.505H18.94Z" />
              </svg>
            </div>
            <div className="flex flex-col mr-6 pt-5">
              <div className="text-3xl font-semibold text-blue-600">
                {syllabiCount}
              </div>
              <div className="text-blue-400">No of Syllabus</div>
            </div>
          </div>

          {/* Card - Completed */}
          <div className="flex items-center bg-white rounded-lg shadow-xl hover:scale-105 transition">
            <div className="m-5 bg-green-100 rounded-full p-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#31a858"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
                />
              </svg>
            </div>
            <div className="flex flex-col mr-6 pt-5">
              <div className="text-3xl font-semibold text-green-600">
                {completedCount}/{syllabiCount}
              </div>
              <div className="text-green-400">Completed Syllabus</div>
            </div>
          </div>

          {/* Card - Pending */}
          <div className="flex items-center bg-white rounded-lg shadow-xl hover:scale-105 transition">
            <div className="m-5 bg-yellow-100 rounded-full p-4">
              <svg
                fill="#f0a222"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="16" r="2" />
                <circle cx="23" cy="16" r="2" />
                <circle cx="16" cy="16" r="2" />
                <path d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z" />
              </svg>
            </div>
            <div className="flex flex-col mr-6 pt-5">
              <div className="text-3xl font-semibold text-yellow-600">
                {pendingCount}
              </div>
              <div className="text-yellow-500">Pending Syllabus</div>
            </div>
          </div>
        </div>

        {/* Syllabi Section with Table */}
        <div className="absolute top-[225px] left-[325px] p-6 pr-3 shadow bg-white border-dashed rounded-lg dark:border-gray-700 w-[1080px] h-[450px]">
          <div className="text-blue-600 text-2xl font-semibold mb-4">Syllabi</div>

          <div className="flex gap-6 py-4">
            <Button color="light">+ Create Syllabus</Button>
            <Button color="light">+ Select Template</Button>
          </div>

          {/* Table */}
          <div className="mt-4 border rounded-lg p-4 bg-white overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead>
                <tr>
                  <th className="bg-blue-600 text-white px-6 py-3">Course Code</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Course Title</th>
                  <th className="bg-blue-600 text-white px-6 py-3">School Year</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Semester</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Date Submitted At</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Date Approved At</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Version</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Status</th>
                  <th className="bg-blue-600 text-white px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {syllabi.map((syllabus, index) => (
                  <tr
                    key={syllabus.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#e9edf7]"}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {syllabus.course_code}
                    </td>
                    <td className="px-6 py-4">{syllabus.course_title}</td>
                    <td className="px-6 py-4">{syllabus.bg_school_year}</td>
                    <td className="px-6 py-4">{syllabus.course_semester}</td>
                    <td className="px-6 py-4">{syllabus.chair_submitted_at}</td>
                    <td className="px-6 py-4">{syllabus.dean_approved_at}</td>
                    <td className="px-6 py-4">Version {syllabus.version}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`w-full text-center px-2 py-1 border rounded-lg ${
                          statusStyles[syllabus.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {syllabus.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="xs" color="warning">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Example: Countdown (disabled for now) */}
        {/*
        {dueDate && (
          <div className="mt-4 text-center text-red-500 font-semibold">
            {remainingTime}
          </div>
        )}
        */}
      </div>
    </div>
  );
}
