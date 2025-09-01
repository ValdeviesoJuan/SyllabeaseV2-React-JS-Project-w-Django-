import React, { useState } from "react";
import { Button } from "flowbite-react";

const CourseList: React.FC = () => {
  // Dummy data for now (replace with backend later)
  const [courses] = useState([
    {
      id: 1,
      course_code: "CS101",
      course_title: "Introduction to Computer Science",
      curr_code: "BSCS",
      course_year_level: "1st Year",
      course_semester: "1st Semester",
      course_pre_req: "-",
      course_co_req: "-",
      course_unit_lec: 3,
      course_unit_lab: 1,
      course_credit_unit: 4,
      course_hrs_lec: 3,
      course_hrs_lab: 2,
    },
    {
      id: 2,
      course_code: "MATH201",
      course_title: "Advanced Calculus",
      curr_code: "BSMATH",
      course_year_level: "2nd Year",
      course_semester: "1st Semester",
      course_pre_req: "MATH101",
      course_co_req: "-",
      course_unit_lec: 3,
      course_unit_lab: 0,
      course_credit_unit: 3,
      course_hrs_lec: 3,
      course_hrs_lab: 0,
    },
  ]);

  // Filters state
  const [search, setSearch] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [curriculum, setCurriculum] = useState("");

  const filteredCourses = courses.filter((course) => {
    return (
      (course.course_code.toLowerCase().includes(search.toLowerCase()) ||
        course.course_title.toLowerCase().includes(search.toLowerCase())) &&
      (yearLevel === "" || course.course_year_level === yearLevel) &&
      (semester === "" || course.course_semester === semester) &&
      (curriculum === "" || course.curr_code === curriculum)
    );
  });

  return (
    <div
      className="min-h-screen bg-[#EEEEEE] bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/assets/Wave.png)" }}
    >
      <div className="p-4 shadow-lg bg-white rounded-lg mx-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 w-full">
          <h2 className="ml-2 text-4xl text-black font-semibold">Courses</h2>

          {/* Create Button */}
          <Button
            className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-4 py-2 text-black font-semibold flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3]"
            onClick={() => alert("Navigate to Create Course Page (placeholder)")}
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
            Create New Course
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between gap-2 mb-4 items-center">
          {/* Search Bar */}
          <div className="relative w-[30%] min-w-[250px]">
            <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-blue-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          {/* Dropdowns */}
          <select
            value={yearLevel}
            onChange={(e) => setYearLevel(e.target.value)}
            className="border rounded-lg w-[17%] text-sm p-2"
          >
            <option value="">Year level (All)</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="5th Year">5th Year</option>
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border rounded-lg w-[17%] text-sm p-2"
          >
            <option value="">Semester (All)</option>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
            <option value="Mid Year">Mid Year</option>
          </select>

          <select
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            className="border rounded-lg w-[17%] text-sm p-2"
          >
            <option value="">Curriculum (All)</option>
            <option value="BSCS">BSCS</option>
            <option value="BSMATH">BSMATH</option>
          </select>

        {/* Apply Filters Button */}
        <Button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm transition ease-in-out"
            onClick={() => alert("Filters applied (placeholder)")}
        >
            Apply Filters
        </Button>

        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-black border border-gray-200 rounded-lg overflow-hidden">
            <thead>
            <tr className="bg-blue-100 text-white">
                <th className="bg-blue-400 px-6 py-3 rounded-tl-lg">Code</th>
                <th className="bg-blue-400 px-6 py-3">Title</th>
                <th className="bg-blue-400 px-6 py-3">Curriculum</th>
                <th className="bg-blue-400 px-6 py-3">Year Level</th>
                <th className="bg-blue-400 px-6 py-3">Semester</th>
                <th className="bg-blue-400 px-6 py-3">Pre Req</th>
                <th className="bg-blue-400 px-6 py-3">Co Req</th>
                <th className="bg-blue-400 px-6 py-3">Lec Unit</th>
                <th className="bg-blue-400 px-6 py-3">Lab Unit</th>
                <th className="bg-blue-400 px-6 py-3">Credit Unit</th>
                <th className="bg-blue-400 px-6 py-3">Lec Hours</th>
                <th className="bg-blue-400 px-6 py-3">Lab Hours</th>
                <th className="bg-blue-400 px-6 py-3 rounded-tr-lg text-center">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y">
            {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 font-bold">{course.course_code}</td>
                <td className="px-6 py-4">{course.course_title}</td>
                <td className="px-6 py-4">{course.curr_code}</td>
                <td className="px-6 py-4">{course.course_year_level}</td>
                <td className="px-6 py-4">{course.course_semester}</td>
                <td className="px-6 py-4">{course.course_pre_req}</td>
                <td className="px-6 py-4">{course.course_co_req}</td>
                <td className="px-6 py-4 text-center">{course.course_unit_lec}</td>
                <td className="px-6 py-4 text-center">{course.course_unit_lab}</td>
                <td className="px-6 py-4 text-center">{course.course_credit_unit}</td>
                <td className="px-6 py-4 text-center">{course.course_hrs_lec}</td>
                <td className="px-6 py-4 text-center">{course.course_hrs_lab}</td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                    <Button
                    size="s"
                    className="text-green-400 rounded-md px-3 py-1"
                    onClick={() => alert(`Edit course ${course.course_code}`)}
                    >
                    Edit
                    </Button>
                    <Button
                    size="s"
                    className="text-red-400 rounded-md px-3 py-1"
                    onClick={() => alert(`Delete course ${course.course_code}`)}
                    >
                    Delete
                    </Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

      </div>
    </div>
  );
};

export default CourseList;
