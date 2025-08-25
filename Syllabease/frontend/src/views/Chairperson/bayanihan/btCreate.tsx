import React, { useState } from "react";

const BtCreate: React.FC = () => {
  const [courseId, setCourseId] = useState("");
  const [leaders, setLeaders] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [schoolYear, setSchoolYear] = useState("2024-2025");
  const [loading, setLoading] = useState(false);

  // Dummy data (replace with API later)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      courseId,
      leaders,
      members,
      schoolYear,
    };

    console.log("Creating Bayanihan Team:", payload);

    // TODO: Replace with backend API call
    // fetch("/api/chairperson/storeBTeam", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));

    setTimeout(() => {
      setLoading(false);
      alert("Team Created (dummy response)");
    }, 1500);
  };

  return (
    <div className="p-4 pb-10 flex items-center justify-center mt-14">
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[560px] p-6 px-8 rounded-lg shadow-lg relative">
        <img
          className="text-center mt-4 w-[330px] m-auto mb-6"
          src="/assets/Create Bayanihan Team.png"
          alt="SyllabEase Logo"
        />

        {/* Success/Error Messages (implement later) */}
        {/* {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>} */}
        {/* {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>} */}

        <form onSubmit={handleSubmit}>
          {/* Courses */}
          <div className="m-6">
            <label className="flex mb-1" htmlFor="course_id">Courses</label>
            <select
              id="course_id"
              className="w-full px-3 py-2 border rounded border-gray-400"
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

          {/* Bayanihan Leaders */}
          <div className="m-6">
            <label className="flex mb-1" htmlFor="bl_user_id">Bayanihan Leaders</label>
            <select
              id="bl_user_id"
              multiple
              className="w-full px-3 py-2 border rounded border-gray-400"
              value={leaders}
              onChange={(e) =>
                setLeaders(Array.from(e.target.selectedOptions, (opt) => opt.value))
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

          {/* Bayanihan Members */}
          <div className="m-6">
            <label className="flex mb-1" htmlFor="bm_user_id">Bayanihan Members</label>
            <select
              id="bm_user_id"
              multiple
              className="w-full px-3 py-2 border rounded border-gray-400"
              value={members}
              onChange={(e) =>
                setMembers(Array.from(e.target.selectedOptions, (opt) => opt.value))
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
          <div className="m-6">
            <label className="flex mb-1" htmlFor="bg_school_year">School Year</label>
            <select
              id="bg_school_year"
              className="w-full px-3 py-2 border rounded border-gray-400"
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 m-auto mt-4 mb-4"
              style={{ background: "#d7ecf9" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#c3dff3")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#d7ecf9")}
              disabled={loading}
            >
              {/* SVG Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="7" cy="10" r="3" />
                <circle cx="17" cy="10" r="3" />
                <circle cx="12" cy="16" r="3" />
                <path d="M2 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
                <path d="M12 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
              </svg>
              {loading ? "Creating..." : "Create Bayanihan Team"}
            </button>
          </div>
        </form>

        {/* Loading Screen */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
            <img src="/assets/Sample/loading.gif" alt="loading..." className="w-16" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BtCreate;
