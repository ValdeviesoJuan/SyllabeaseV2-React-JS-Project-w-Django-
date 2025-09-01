import React, { useState } from "react";
import { Button } from "flowbite-react";

const EditCourse: React.FC = () => {
  // Dummy state instead of backend props
  const [course, setCourse] = useState({
    course_code: "CS101",
    course_title: "Introduction to Computer Science",
    curr_id: "BSCS",
    course_unit_lec: "3",
    course_unit_lab: "1",
    course_credit_unit: "4",
    course_hrs_lec: "3",
    course_hrs_lab: "2",
    course_pre_req: "-",
    course_co_req: "-",
    course_year_level: "1st Year",
    course_semester: "1st Semester",
  });

  const [curricula] = useState([
    { curr_id: "BSCS", curr_code: "BSCS" },
    { curr_id: "BSMATH", curr_code: "BSMATH" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Course updated (placeholder)");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/assets/Wave1.png)" }}
    >
      <div className="max-w-md w-[560px] bg-gradient-to-r from-[#FFF] to-[#dbeafe] p-6 px-8 rounded-lg shadow-lg mt-14">
        <img
          className="text-center mt-4 w-[220px] m-auto mb-6"
          src="/assets/Edit Course.png"
          alt="SyllabEase Logo"
        />

        <form onSubmit={handleSubmit}>
          {/* Course Code + Title */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="course_code">Course Code</label>
              <input
                type="text"
                name="course_code"
                value={course.course_code}
                onChange={handleChange}
                className="px-1 py-[6px] w-[100px] border border-[#a8a29e] rounded"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="course_title">Course Title</label>
              <input
                type="text"
                name="course_title"
                value={course.course_title}
                onChange={handleChange}
                className="px-1 py-[6px] w-[260px] border border-[#a8a29e] rounded"
                required
              />
            </div>
          </div>

          {/* Curriculum */}
          <div className="mb-6">
            <label
              htmlFor="curr_id"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Curriculum
            </label>
            <select
              name="curr_id"
              value={course.curr_id}
              onChange={handleChange}
              className="px-2 py-[6px] w-[300px] border border-[#a8a29e] rounded"
              required
            >
              {curricula.map((curr) => (
                <option key={curr.curr_id} value={curr.curr_id}>
                  {curr.curr_code}
                </option>
              ))}
            </select>
          </div>

          {/* Units */}
          <div className="grid gap-6 mt-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="course_unit_lec">Unit Lec</label>
              <input
                type="text"
                name="course_unit_lec"
                value={course.course_unit_lec}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border border-[#a8a29e] rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="course_unit_lab">Unit Lab</label>
              <input
                type="text"
                name="course_unit_lab"
                value={course.course_unit_lab}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border border-[#a8a29e] rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="course_credit_unit">Credit Unit</label>
              <input
                type="text"
                name="course_credit_unit"
                value={course.course_credit_unit}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border border-[#a8a29e] rounded"
                required
              />
            </div>
          </div>

          {/* Hours */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="course_hrs_lec">Lec Hours</label>
              <input
                type="text"
                name="course_hrs_lec"
                value={course.course_hrs_lec}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border border-[#a8a29e] rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="course_hrs_lab">Lab Hours</label>
              <input
                type="text"
                name="course_hrs_lab"
                value={course.course_hrs_lab}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border border-[#a8a29e] rounded"
                required
              />
            </div>
          </div>

          {/* Pre Req */}
          <div className="mb-6">
            <label htmlFor="course_pre_req">Pre Requisite</label>
            <input
              type="text"
              name="course_pre_req"
              value={course.course_pre_req}
              onChange={handleChange}
              className="px-1 py-[6px] w-[400px] border border-[#a8a29e] rounded"
              required
            />
          </div>

          {/* Co Req */}
          <div className="mb-6">
            <label htmlFor="course_co_req">Co Requisite</label>
            <input
              type="text"
              name="course_co_req"
              value={course.course_co_req}
              onChange={handleChange}
              className="px-1 py-[6px] w-[400px] border border-[#a8a29e] rounded"
              required
            />
          </div>

          {/* Year Level + Semester */}
          <div className="grid gap-6 mt-6 md:grid-cols-3">
            <div>
              <label htmlFor="course_year_level">Year Level</label>
              <select
                name="course_year_level"
                value={course.course_year_level}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border border-[#a8a29e] rounded"
                required
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
            </div>

            <div>
              <label htmlFor="course_semester">Semester</label>
              <select
                name="course_semester"
                value={course.course_semester}
                onChange={handleChange}
                className="px-1 py-[6px] w-[160px] border border-[#a8a29e] rounded"
                required
              >
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="Mid Year">Mid Year</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg mt-8 mb-4"
            >
              Update Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
