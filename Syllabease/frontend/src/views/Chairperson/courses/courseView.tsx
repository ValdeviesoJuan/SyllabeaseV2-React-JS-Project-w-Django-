import React from "react";
import { useNavigate } from "react-router-dom";

const CourseView: React.FC = () => {
  const navigate = useNavigate();

  // Placeholder course data (replace with API data later)
  const course = {
    course_code: "BSCS101",
    course_title: "Introduction to Computing",
    curr_id: 1,
    curr_code: "BSCS-2023",
    course_unit_lec: 3,
    course_unit_lab: 1,
    course_credit_unit: 4,
    course_hrs_lec: 3,
    course_hrs_lab: 2,
    course_pre_req: "None",
    course_co_req: "None",
    course_year_level: "1st Year",
    course_semester: "1st Semester",
  };

  const curricula = [
    { curr_id: 1, curr_code: "BSCS-2023" },
    { curr_id: 2, curr_code: "BSIT-2023" },
  ];

  return (
    <div className="mt-[60px] flex items-center justify-center">
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[560px] p-6 px-8 rounded shadow-lg">
        <div className="text-lg font-semibold mb-4">View Course</div>

        <div className="grid gap-6 mb-2 md:grid-cols-3">
          <div>
            <label htmlFor="course_code">Course Code</label>
            <input
              disabled
              type="text"
              id="course_code"
              className="px-2 py-[6px] w-[100px] border rounded border-[#a3a3a3]"
              value={course.course_code}
            />
          </div>

          <div>
            <label htmlFor="course_title">Course Title</label>
            <input
              disabled
              type="text"
              id="course_title"
              className="px-1 py-[6px] w-[260px] border rounded border-[#a3a3a3]"
              value={course.course_title}
            />
          </div>
        </div>

        <div>
          <label htmlFor="curr_id">Curriculum</label>
          <select
            disabled
            id="curr_id"
            className="select2 px-1 py-[6px] w-[300px] border rounded border-[#a3a3a3]"
            value={course.curr_id}
          >
            {curricula.map((curr) => (
              <option key={curr.curr_id} value={curr.curr_id}>
                {curr.curr_code}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 mt-2 mb-2 md:grid-cols-3">
          <div>
            <label htmlFor="course_unit_lec">Unit Lec</label>
            <input
              disabled
              type="text"
              id="course_unit_lec"
              className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
              value={course.course_unit_lec}
            />
          </div>

          <div>
            <label htmlFor="course_unit_lab">Unit Lab</label>
            <input
              disabled
              type="text"
              id="course_unit_lab"
              className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
              value={course.course_unit_lab}
            />
          </div>

          <div>
            <label htmlFor="course_credit_unit">Credit Unit</label>
            <input
              disabled
              type="text"
              id="course_credit_unit"
              className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
              value={course.course_credit_unit}
            />
          </div>
        </div>

        <div className="grid gap-6 mb-2 md:grid-cols-3">
          <div>
            <label htmlFor="course_hrs_lec">Lec Hours</label>
            <input
              disabled
              type="text"
              id="course_hrs_lec"
              className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
              value={course.course_hrs_lec}
            />
          </div>

          <div>
            <label htmlFor="course_hrs_lab">Lab Hours</label>
            <input
              disabled
              type="text"
              id="course_hrs_lab"
              className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
              value={course.course_hrs_lab}
            />
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="course_pre_req">Pre Requisite</label>
          <input
            disabled
            type="text"
            id="course_pre_req"
            className="px-1 py-[6px] w-[400px] border rounded border-[#a3a3a3]"
            value={course.course_pre_req}
          />
        </div>

        <div>
          <label htmlFor="course_co_req">Co Requisite</label>
          <input
            disabled
            type="text"
            id="course_co_req"
            className="px-1 py-[6px] w-[400px] border rounded border-[#a3a3a3]"
            value={course.course_co_req}
          />
        </div>

        <div className="grid gap-6 mt-2 md:grid-cols-3">
          <div>
            <label htmlFor="course_year_level">Year Level</label>
            <select
              disabled
              id="course_year_level"
              className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
              value={course.course_year_level}
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
              disabled
              id="course_semester"
              className="px-1 py-[6px] w-[160px] border rounded border-[#a3a3a3]"
              value={course.course_semester}
            >
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="Mid Year">Mid Year</option>
            </select>
          </div>
        </div>

        <div className="text-center mt-5">
          {/* <a href="{{route('chairperson.course')}}" className="text-white font-semibold px-6 py-2 rounded-lg m-2 mt-8 mb-4 bg-blue">Done</a> */}
          <button
            onClick={() => navigate("/courses")}
            className="text-white font-semibold px-6 py-2 rounded-lg m-2 mt-8 mb-4 bg-blue"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
