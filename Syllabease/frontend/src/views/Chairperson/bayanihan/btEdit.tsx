import React, { useState } from "react";

const BtEdit: React.FC = () => {
  // Temporary states for form fields
  const [courseId, setCourseId] = useState("");
  const [leaders, setLeaders] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [schoolYear, setSchoolYear] = useState("2024-2025");

  // Placeholder arrays for select options (replace later with API data)
  const courses = [
    { course_id: "1", course_code: "CS101" },
    { course_id: "2", course_code: "IT202" },
  ];

  const users = [
    { id: "1", lastname: "Doe", firstname: "John" },
    { id: "2", lastname: "Smith", firstname: "Anna" },
    { id: "3", lastname: "Brown", firstname: "Chris" },
  ];

  const schoolYears = [
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
    "2027-2028",
    "2028-2029",
    "2029-2030",
  ];

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      courseId,
      leaders,
      members,
      schoolYear,
    };

    console.log("Form Data:", payload);

    // TODO: Replace with API call when backend is ready
    // fetch(`/api/updateBTeam/${bGroupId}`, { method: "PUT", body: JSON.stringify(payload) })
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err));
  };

  return (
    <div className="p-4 pb-10 flex items-center justify-center mt-14">
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[560px] p-6 px-8 rounded-lg shadow-lg">
        <img
          className="edit_user_img text-center mt-4 w-[320px] m-auto mb-6"
          src="/assets/Edit Bayanihan Team.png"
          alt="SyllabEase Logo"
        />

        {/* Success & Error messages (Replace with actual logic later) */}
        {/* {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>} */}
        {/* {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>} */}

        <form onSubmit={handleSubmit}>
          {/* Courses */}
          <div className="mb-6">
            <label className="flex mb-1" htmlFor="course_id">Courses</label>
            <select
              id="course_id"
              className="px-1 py-2 w-full border rounded border-gray-300"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_code}
                </option>
              ))}
            </select>
          </div>

          {/* Leaders */}
          <div className="mb-6">
            <label className="flex mb-1" htmlFor="bl_user_id">Bayanihan Leaders</label>
            <select
              id="bl_user_id"
              multiple
              className="px-1 py-2 w-full border rounded border-gray-300"
              value={leaders}
              onChange={(e) =>
                setLeaders(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              required
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.lastname}, {user.firstname}
                </option>
              ))}
            </select>
          </div>

          {/* Members */}
          <div className="mb-6">
            <label className="flex mb-1" htmlFor="bm_user_id">Bayanihan Members</label>
            <select
              id="bm_user_id"
              multiple
              className="px-1 py-2 w-full border rounded border-gray-300"
              value={members}
              onChange={(e) =>
                setMembers(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              required
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.lastname}, {user.firstname}
                </option>
              ))}
            </select>
          </div>

          {/* School Year */}
          <div className="mb-6">
            <label htmlFor="bg_school_year" className="block mb-1">School Year</label>
            <select
              id="bg_school_year"
              className="px-1 py-2 w-full border rounded border-gray-300"
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              required
            >
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="text-white font-semibold px-6 py-2 rounded-lg m-2 mt-4 mb-4 bg-blue-500 hover:bg-blue-600"
            >
              Update Bayanihan Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BtEdit;
