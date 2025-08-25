import React, { useState } from "react";

const CourseCreate: React.FC = () => {
  const [courseData, setCourseData] = useState({
    course_code: "",
    course_title: "",
    curr_id: "",
    course_unit_lec: "",
    course_unit_lab: "",
    course_credit_unit: "",
    course_hrs_lec: "",
    course_hrs_lab: "",
    course_pre_req: "",
    course_co_req: "",
    course_year_level: "",
    course_semester: "",
  });

  // Mock curriculum list (since no backend yet)
  const curricula = [
    { curr_id: "1", curr_code: "BSIT-2021" },
    { curr_id: "2", curr_code: "BSCS-2022" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🚧 Backend integration here later:
    // axios.post('/api/courses', courseData)
    //   .then(response => console.log('Course Created:', response))
    //   .catch(error => console.error('Error creating course:', error));

    console.log("Course Data Submitted:", courseData);
  };

  return (
    <div className="p-4 mt-14 flex items-center justify-center">
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[500px] p-6 rounded-lg shadow-lg">
        <img
          className="edit_user_img text-center mt-4 w-[300px] m-auto mb-6"
          src="/assets/Create New Course.png"
          alt="SyllabEase Logo"
        />

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="mt-3 mb-5">
              <label htmlFor="course_code">Course Code</label>
              <input
                placeholder="e.g. IT112"
                type="text"
                name="course_code"
                id="course_code"
                value={courseData.course_code}
                onChange={handleChange}
                className="relative border w-[130px] border-[#a3a3a3] rounded px-3 py-1"
                required
              />
            </div>
            <div className="mt-3 mb-5 -ml-[50px]">
              <label htmlFor="course_title">Course Title</label>
              <input
                placeholder="e.g. Computer Programming 1"
                type="text"
                name="course_title"
                id="course_title"
                value={courseData.course_title}
                onChange={handleChange}
                className="relative border w-[240px] border-[#a3a3a3] rounded px-3 py-1"
                required
              />
            </div>
          </div>

          <div className="mb-5 -mt-[30px]">
            <label htmlFor="curr_id">Curriculum</label>
            <select
              name="curr_id"
              id="curr_id"
              value={courseData.curr_id}
              onChange={handleChange}
              className="select2 w-[400px] border py-1 rounded pl-2 border-[#a3a3a3]"
              required
            >
              <option value="">Select Curriculum</option>
              {curricula.map((curriculum) => (
                <option key={curriculum.curr_id} value={curriculum.curr_id}>
                  {curriculum.curr_code}
                </option>
              ))}
            </select>
          </div>

          {/* Units Section */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="course_unit_lec">Unit Lecture</label>
              <input
                type="number"
                name="course_unit_lec"
                id="course_unit_lec"
                value={courseData.course_unit_lec}
                onChange={handleChange}
                className="relative border rounded w-[110px] border-[#a3a3a3] px-3 py-1"
                required
              />
            </div>
            <div>
              <label htmlFor="course_unit_lab">Unit Laboratory</label>
              <input
                type="number"
                name="course_unit_lab"
                id="course_unit_lab"
                value={courseData.course_unit_lab}
                onChange={handleChange}
                className="relative border rounded w-[110px] border-[#a3a3a3] px-3 py-1"
                required
              />
            </div>
            <div>
              <label htmlFor="course_credit_unit">Credit Unit</label>
              <input
                type="number"
                name="course_credit_unit"
                id="course_credit_unit"
                value={courseData.course_credit_unit}
                onChange={handleChange}
                className="relative border w-[110px] border-[#a3a3a3] rounded px-3 py-1"
                required
              />
            </div>
          </div>

          {/* Hours Section */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label htmlFor="course_hrs_lec">Lec Hours</label>
              <input
                type="number"
                name="course_hrs_lec"
                id="course_hrs_lec"
                value={courseData.course_hrs_lec}
                onChange={handleChange}
                className="relative border rounded w-[110px] border-[#a3a3a3] px-3 py-1"
                required
              />
            </div>
            <div>
              <label htmlFor="course_hrs_lab">Lab Hours</label>
              <input
                type="number"
                name="course_hrs_lab"
                id="course_hrs_lab"
                value={courseData.course_hrs_lab}
                onChange={handleChange}
                className="relative border rounded w-[110px] border-[#a3a3a3] px-3 py-1"
                required
              />
            </div>
          </div>

          {/* Pre/Co Requisites */}
          <div className="mb-5">
            <label htmlFor="course_pre_req">Pre Requisite</label>
            <input
              type="text"
              name="course_pre_req"
              id="course_pre_req"
              value={courseData.course_pre_req}
              onChange={handleChange}
              className="relative border w-[400px] border-[#a3a3a3] rounded px-3 py-1"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="course_co_req">Co Requisite</label>
            <input
              type="text"
              name="course_co_req"
              id="course_co_req"
              value={courseData.course_co_req}
              onChange={handleChange}
              className="relative border w-[400px] border-[#a3a3a3] rounded px-3 py-1"
              required
            />
          </div>

          {/* Year Level & Semester */}
          <div className="grid gap-6 mb-6 md:grid-cols-3 mt-5">
            <div>
              <label htmlFor="course_year_level">Year Level</label>
              <select
                name="course_year_level"
                id="course_year_level"
                value={courseData.course_year_level}
                onChange={handleChange}
                className="select1 w-[110px] border-[#a3a3a3] px-3 py-1 border rounded"
                required
              >
                <option value="">Select Year</option>
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
                id="course_semester"
                value={courseData.course_semester}
                onChange={handleChange}
                className="select1 w-[170px] border-[#a3a3a3] px-3 py-1 border rounded"
                required
              >
                <option value="">Select Semester</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="Mid Year">Mid Year</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 m-auto mt-4 mb-4"
              style={{ background: "#d7ecf9" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#c3dff3")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#d7ecf9")}
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
                <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
              </svg>
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreate;
