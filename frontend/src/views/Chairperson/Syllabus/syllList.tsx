import React from "react";
import { Table, Button } from "flowbite-react";

// Mocked syllabus list data (replace with API when backend is ready)
const syllabusList = [
  {
    id: 1,
    course_title: "Software Engineering",
    course_code: "SE101",
    instructor: "Juan Dela Cruz",
    semester: "1st",
    school_year: "2024-2025",
    status: "Pending",
  },
  {
    id: 2,
    course_title: "Database Systems",
    course_code: "DB102",
    instructor: "Maria Santos",
    semester: "2nd",
    school_year: "2024-2025",
    status: "Approved",
  },
  // Add more mock data as needed
];

const SyllList: React.FC = () => {
  return (
    <div
      className="min-h-screen pt-14"
      style={{
        backgroundImage: "url('/assets/Wave1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg mt-14 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl text-[#201B50] mb-8">List of Syllabus</h1>
        <div className="overflow-x-auto">
          <Table hoverable={true} className="min-w-full">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Course Code</th>
                <th>Instructor</th>
                <th>Semester</th>
                <th>School Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {syllabusList.map((syllabus) => (
                <tr key={syllabus.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {syllabus.course_title}
                  </td>
                  <td>{syllabus.course_code}</td>
                  <td>{syllabus.instructor}</td>
                  <td>{syllabus.semester}</td>
                  <td>{syllabus.school_year}</td>
                  <td>
                    <span
                      className={
                        syllabus.status === "Approved"
                          ? "text-green-600 font-semibold"
                          : syllabus.status === "Pending"
                          ? "text-yellow-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {syllabus.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Button color="info" size="xs">
                        View
                      </Button>
                      <Button color="warning" size="xs">
                        Edit
                      </Button>
                      <Button color="failure" size="xs">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SyllList;