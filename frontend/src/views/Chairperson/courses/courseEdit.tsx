import React, { useState, useEffect } from "react";
// import axios from "axios";  // Uncomment when backend is ready
import { useParams } from "react-router-dom";

interface Curriculum {
  curr_id: number;
  curr_code: string;
}

interface Course {
  course_id: number;
  course_code: string;
  course_title: string;
  curr_id: number;
  course_unit_lec: string;
  course_unit_lab: string;
  course_credit_unit: string;
  course_hrs_lec: string;
  course_hrs_lab: string;
  course_pre_req: string;
  course_co_req: string;
  course_year_level: string;
  course_semester: string;
}

const CourseEdit: React.FC = () => {
  const { id } = useParams(); // course_id from route
  const [course, setCourse] = useState<Course | null>(null);
  const [curricula, setCurricula] = useState<Curriculum[]>([]);

  // Simulated fetch (replace with API later)
  useEffect(() => {
    // Example placeholder data
    setCourse({
      course_id: Number(id),
      course_code: "CS101",
      course_title: "Intro to Computer Science",
      curr_id: 1,
      course_unit_lec: "3",
      course_unit_lab: "1",
      course_credit_unit: "4",
      course_hrs_lec: "3",
      course_hrs_lab: "2",
      course_pre_req: "",
      course_co_req: "",
      course_year_level: "1st Year",
      course_semester: "1st Semester",
    });

    setCurricula([
      { curr_id: 1, curr_code: "BSCS" },
      { curr_id: 2, curr_code: "BSIT" },
    ]);

    // Uncomment for real backend later:
    /*
    axios.get(`/api/courses/${id}`).then(response => setCourse(response.data));
    axios.get(`/api/curricula`).then(response => setCurricula(response.data));
    */
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (course) {
      setCourse({ ...course, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Course:", course);

    // Uncomment when backend is ready:
    /*
    axios.put(`/api/courses/${id}`, course)
      .then(response => alert("Course updated successfully!"))
      .catch(error => console.error(error));
    */
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 pb-10 flex items-center justify-center mt-14">
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[560px] p-6 px-8 rounded-lg shadow-lg">
        <img
          className="edit_user_img text-center mt-4 w-[220px] m-auto mb-6"
          src="/assets/Edit Course.png"
          alt="SyllabEase Logo"
        />
        <form onSubmit={handleSubmit}>
          {/* Course Code & Title */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label>Course Code</label>
              <input
                type="text"
                name="course_code"
                value={course.course_code}
                onChange={handleChange}
                className="px-2 py-[6px] w-[100px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
            <div>
              <label>Course Title</label>
              <input
                type="text"
                name="course_title"
                value={course.course_title}
                onChange={handleChange}
                className="px-1 py-[6px] w-[260px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <label>Curriculum</label>
            <select
              name="curr_id"
              value={course.curr_id}
              onChange={handleChange}
              className="px-1 py-[6px] w-[300px] border rounded border-[#a3a3a3]"
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
              <label>Unit Lec</label>
              <input
                type="text"
                name="course_unit_lec"
                value={course.course_unit_lec}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
            <div>
              <label>Unit Lab</label>
              <input
                type="text"
                name="course_unit_lab"
                value={course.course_unit_lab}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
            <div>
              <label>Credit Unit</label>
              <input
                type="text"
                name="course_credit_unit"
                value={course.course_credit_unit}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
          </div>

          {/* Hours */}
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label>Lec Hours</label>
              <input
                type="text"
                name="course_hrs_lec"
                value={course.course_hrs_lec}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
            <div>
              <label>Lab Hours</label>
              <input
                type="text"
                name="course_hrs_lab"
                value={course.course_hrs_lab}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
                required
              />
            </div>
          </div>

          {/* Pre & Co Requisites */}
          <div className="mb-6">
            <label>Pre Requisite</label>
            <input
              type="text"
              name="course_pre_req"
              value={course.course_pre_req}
              onChange={handleChange}
              className="px-1 py-[6px] w-[400px] border rounded border-[#a3a3a3]"
              required
            />
          </div>
          <div>
            <label>Co Requisite</label>
            <input
              type="text"
              name="course_co_req"
              value={course.course_co_req}
              onChange={handleChange}
              className="px-1 py-[6px] w-[400px] border rounded border-[#a3a3a3]"
              required
            />
          </div>

          {/* Year Level & Semester */}
          <div className="grid gap-6 mt-6 md:grid-cols-3">
            <div>
              <label>Year Level</label>
              <select
                name="course_year_level"
                value={course.course_year_level}
                onChange={handleChange}
                className="px-1 py-[6px] w-[120px] border rounded border-[#a3a3a3]"
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
              <label>Semester</label>
              <select
                name="course_semester"
                value={course.course_semester}
                onChange={handleChange}
                className="px-1 py-[6px] w-[160px] border rounded border-[#a3a3a3]"
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
            <button
              type="submit"
              className="text-white font-semibold px-6 py-2 rounded-lg m-2 mt-8 mb-4 bg-blue"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEdit;
