// src/views/Admin/Course/CourseCreate.tsx
import React, { useState } from "react";
import { Button } from "flowbite-react";

type CourseForm = {
  course_code: string;
  course_title: string;
  curr_id: string;
  course_unit_lec: number | string;
  course_unit_lab: number | string;
  course_credit_unit: number | string;
  course_hrs_lec: number | string;
  course_hrs_lab: number | string;
  course_pre_req: string;
  course_co_req: string;
  course_year_level: string;
  course_semester: string;
};

const CourseCreate: React.FC = () => {
  // Dummy curriculum list (replace with real data later)
  const curricula = [
    { curr_id: "BSCS", curr_code: "BSCS" },
    { curr_id: "BSIT", curr_code: "BSIT" },
    { curr_id: "BSMATH", curr_code: "BSMATH" },
  ];

  const [form, setForm] = useState<CourseForm>({
    course_code: "",
    course_title: "",
    curr_id: curricula[0]?.curr_id ?? "",
    course_unit_lec: "",
    course_unit_lab: "",
    course_credit_unit: "",
    course_hrs_lec: "",
    course_hrs_lab: "",
    course_pre_req: "",
    course_co_req: "",
    course_year_level: "1st Year",
    course_semester: "1st Semester",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: show the collected data
    alert("Create Course (frontend only)\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/assets/Wave1.png)" }}
    >
      <div className="p-4  flex items-center justify-center">
        <div className="max-w-md w-[500px] bg-gradient-to-r from-[#FFF] to-[#dbeafe] p-6 rounded-lg shadow-lg">
          <img
            className="text-center mt-4 w-[300px] m-auto mb-6"
            src="/assets/Create New Course.png"
            alt="SyllabEase Logo"
          />

          <form onSubmit={handleSubmit}>
            {/* Code + Title */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="mt-3 mb-5">
                <label
                  htmlFor="course_code"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Course Code
                </label>
                <input
                  type="text"
                  id="course_code"
                  name="course_code"
                  value={form.course_code}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] w-[130px] rounded px-3 py-1"
                  required
                />
              </div>

              <div className="mt-3 mb-5 -ml-[50px]">
                <label
                  htmlFor="course_title"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  id="course_title"
                  name="course_title"
                  value={form.course_title}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] w-[240px] rounded px-3 py-1"
                  required
                />
              </div>
            </div>

            {/* Curriculum */}
            <div className="mb-5 -mt-[30px]">
              <label
                htmlFor="curr_id"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Curriculum
              </label>
              <select
                id="curr_id"
                name="curr_id"
                value={form.curr_id}
                onChange={handleChange}
                className="w-[400px] border py-1 border-[#a8a29e] rounded pl-2"
                required
              >
                {curricula.map((c) => (
                  <option key={c.curr_id} value={c.curr_id}>
                    {c.curr_code}
                  </option>
                ))}
              </select>
            </div>

            {/* Units */}
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="course_unit_lec"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Unit Lecture
                </label>
                <input
                  type="number"
                  id="course_unit_lec"
                  name="course_unit_lec"
                  value={form.course_unit_lec}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] rounded w-[110px] px-3 py-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="course_unit_lab"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Unit Laboratory
                </label>
                <input
                  type="number"
                  id="course_unit_lab"
                  name="course_unit_lab"
                  value={form.course_unit_lab}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] rounded w-[110px] px-3 py-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="course_credit_unit"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Credit Unit
                </label>
                <input
                  type="number"
                  id="course_credit_unit"
                  name="course_credit_unit"
                  value={form.course_credit_unit}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] rounded w-[110px] px-3 py-1"
                  required
                />
              </div>
            </div>

            {/* Hours */}
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="course_hrs_lec"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Lec Hours
                </label>
                <input
                  type="number"
                  id="course_hrs_lec"
                  name="course_hrs_lec"
                  value={form.course_hrs_lec}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] rounded w-[110px] px-3 py-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="course_hrs_lab"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Lab Hours
                </label>
                <input
                  type="number"
                  id="course_hrs_lab"
                  name="course_hrs_lab"
                  value={form.course_hrs_lab}
                  onChange={handleChange}
                  className="relative border border-[#a8a29e] rounded w-[110px] px-3 py-1"
                  required
                />
              </div>
            </div>

            {/* Pre/Co Reqs */}
            <div className="mb-5">
              <label
                htmlFor="course_pre_req"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Pre Requisite
              </label>
              <input
                type="text"
                id="course_pre_req"
                name="course_pre_req"
                value={form.course_pre_req}
                onChange={handleChange}
                className="relative border w-[400px] border-[#a8a29e] rounded px-3 py-1"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="course_co_req"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Co Requisite
              </label>
              <input
                type="text"
                id="course_co_req"
                name="course_co_req"
                value={form.course_co_req}
                onChange={handleChange}
                className="relative border w-[400px] border-[#a8a29e] rounded px-3 py-1"
                required
              />
            </div>

            {/* Year Level + Semester */}
            <div className="grid gap-6 mb-6 md:grid-cols-3 mt-5">
              <div>
                <label
                  htmlFor="course_year_level"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Year Level
                </label>
                <select
                  id="course_year_level"
                  name="course_year_level"
                  value={form.course_year_level}
                  onChange={handleChange}
                  className="w-[110px] border-[#a8a29e] px-3 py-1 border rounded"
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
                <label
                  htmlFor="course_semester"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Semester
                </label>
                <select
                  id="course_semester"
                  name="course_semester"
                  value={form.course_semester}
                  onChange={handleChange}
                  className="w-[170px] border-[#a8a29e] px-3 py-1 border rounded"
                  required
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="Mid Year">Mid Year</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <Button
                type="submit"
                className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold m-auto mt-8 mb-4"
                style={{ background: "#d7ecf9" }}
                onMouseOver={(e) => ((e.currentTarget.style.background = "#c3dff3"))}
                onMouseOut={(e) => ((e.currentTarget.style.background = "#d7ecf9"))}
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                  <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                </svg>
                Create Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
