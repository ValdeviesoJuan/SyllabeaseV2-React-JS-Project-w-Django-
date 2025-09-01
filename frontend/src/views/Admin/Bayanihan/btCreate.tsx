import { useState } from "react";
import { Button, Label, Select } from "flowbite-react";

const BtCreate: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // mock data for courses + users (since backend is not ready yet)
  const courses = [
    { course_id: 1, course_code: "CS101" },
    { course_id: 2, course_code: "IT202" },
  ];
  const users = [
    { id: 1, firstname: "Juan", lastname: "Dela Cruz" },
    { id: 2, firstname: "Maria", lastname: "Santos" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Bayanihan Team Created (mock) ✅");
    }, 2000);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: `url(/assets/wave1.png)` }}
    >
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[560px] p-6 px-8 rounded-lg shadow-lg">
        <img
          className="text-center mt-4 w-[330px] m-auto mb-6"
          src="/assets/Create Bayanihan Team.png"
          alt="SyllabEase Logo"
        />

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* Courses */}
          <div className="mb-6">
            <Label htmlFor="course_id" className="text-black mb-2">
              Courses
            </Label>
            <Select
              id="course_id"
              required
              className="bg-white border border-gray-300 text-black"
            >
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_code}
                </option>
              ))}
            </Select>
          </div>

          {/* Bayanihan Leaders */}
          <div className="mb-6">
            <Label htmlFor="bl_user_id" className="text-black mb-2">
              Bayanihan Leaders
            </Label>
            <Select
              id="bl_user_id"
              required
              className="bg-white border border-gray-300 text-black"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.lastname}, {user.firstname}
                </option>
              ))}
            </Select>
          </div>

          {/* Bayanihan Members */}
          <div className="mb-6">
            <Label htmlFor="bm_user_id" className="text-black mb-2">
              Bayanihan Members
            </Label>
            <Select
              id="bm_user_id"
              required
              className="bg-white border border-gray-300 text-black"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.lastname}, {user.firstname}
                </option>
              ))}
            </Select>
          </div>

          {/* School Year */}
          <div className="mb-6">
            <Label htmlFor="bg_school_year" className="text-black mb-2">
              School Year
            </Label>
            <Select
              id="bg_school_year"
              required
              className="bg-white border border-gray-300 text-black"
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
              <option value="2029-2030">2029-2030</option>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 m-auto mt-4 mb-4 bg-[#d7ecf9] hover:bg-[#c3dff3]"
            >
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
              Create Bayanihan Team
            </Button>
          </div>
        </form>

        {/* Loading screen */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <img src="/assets/Sample/loading.gif" alt="loading..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default BtCreate;
