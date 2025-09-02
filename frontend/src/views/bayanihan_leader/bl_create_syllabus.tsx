import React, { useState } from "react";
import { Button, Label, Textarea, TextInput, Select } from "flowbite-react";

type BGroup = {
  id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
};

type Instructor = {
  id: number;
  firstname: string;
  lastname: string;
};

type Syllabus = {
  id: number;
  course_code: string;
  bg_school_year: string;
  course_semester: string;
};

export default function CreateSyllabusPage() {
  const bGroups: BGroup[] = [
    { id: 1, course_code: "CS101", course_title: "Intro to CS", bg_school_year: "2024-2025" },
    { id: 2, course_code: "MATH201", course_title: "Calculus II", bg_school_year: "2023-2024" },
  ];

  const instructors: Instructor[] = [
    { id: 1, firstname: "Juan", lastname: "Dela Cruz" },
    { id: 2, firstname: "Maria", lastname: "Santos" },
  ];

  const syllabi: Syllabus[] = [
    { id: 1, course_code: "CS101", bg_school_year: "2024-2025", course_semester: "1st Sem" },
    { id: 2, course_code: "MATH201", bg_school_year: "2023-2024", course_semester: "2nd Sem" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    bg_id: "",
    effectivity_date: "",
    syll_bldg_rm: "",
    syll_class_schedule: "",
    syll_course_description: "",
    syll_ins_user_id: "",
    syll_ins_bldg_rm: "",
    syll_ins_consultation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat bg-top"
      style={{ backgroundImage: `url(/assets/wave1.png)` }}
    >
      {/* Create From Approved Syllabi */}
      <div className="mt-4 ml-[4%]">
        <button
          onClick={() => setIsOpen(true)}
          className="font-semibold text-white px-6 py-2 rounded-lg m-2 bg-blue-600 hover:bg-blue-700"
        >
          Create From Approved Syllabi
        </button>

        {isOpen && (
          <div className="z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="shadow-lg bg-white fixed bg-opacity-90 w-[415px] min-h-[400px] rounded font-sans bg-gradient-to-r from-[#FFF] to-[#dbeafe]">
              <h1 className="flex w-10/12 py-3 ml-6 justify-center text-center items-center text-2xl font-bold">
                Choose Syllabus
              </h1>

              {/* Close Button */}
              <div className="absolute ml-[90%] -mt-[9%]">
                <button onClick={() => setIsOpen(false)}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                      fill="#454545"
                    />
                  </svg>
                </button>
              </div>

              {/* Syllabi List */}
              <div className="grid grid-cols-1 gap-y-3 mt-6 px-3">
                {syllabi.map((syllabus) => (
                  <a
                    key={syllabus.id}
                    href={`/duplicate-syllabus/${syllabus.id}`} // placeholder
                    className="p-3 flex w-[390px] h-auto py-4 px-2 shadow-lg justify-center items-center bg-[#f9fafb] hover:bg-[#f3f4f6] rounded text-center text-gray-600"
                  >
                    {syllabus.course_code} {syllabus.bg_school_year} {syllabus.course_semester}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Form */}
      <div className="relative mt-6 flex flex-col bg-gradient-to-r from-[#FFF] to-[#dbeafe] rounded-xl shadow-lg p-6 border border-white w-full max-w-4xl">
        <img
          src="/assets/Create Syllabus.png"
          alt="SyllabEase Logo"
          className="w-[280px] mx-auto mt-6 mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Details */}
          <h2 className="text-3xl font-semibold text-black">Course Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="bg_id" className="!text-black">
                Bayanihan Group
              </Label>
              <Select
                id="bg_id"
                name="bg_id"
                required
                value={form.bg_id}
                onChange={handleChange}
                className="bg-white text-black border-gray-300 rounded"
              >
                <option value="">Select Group</option>
                {bGroups.map((group) => (
                  <option key={group.id} value={group.id.toString()}>
                    {group.course_code}: {group.course_title} {group.bg_school_year}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="effectivity_date" className="!text-black">
                Effectivity Date
              </Label>
              <TextInput
                type="date"
                id="effectivity_date"
                name="effectivity_date"
                required
                value={form.effectivity_date}
                onChange={handleChange}
                className="bg-white text-black border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="syll_bldg_rm" className="!text-black">
                Bldg/Rm No.
              </Label>
              <TextInput
                type="text"
                id="syll_bldg_rm"
                name="syll_bldg_rm"
                required
                value={form.syll_bldg_rm}
                onChange={handleChange}
                className="bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="syll_class_schedule" className="!text-black">
                Class Schedule
              </Label>
              <Textarea
                id="syll_class_schedule"
                name="syll_class_schedule"
                rows={5}
                required
                value={form.syll_class_schedule}
                onChange={handleChange}
                className="bg-white text-black border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="syll_course_description" className="!text-black">
                Course Description
              </Label>
              <Textarea
                id="syll_course_description"
                name="syll_course_description"
                rows={5}
                required
                value={form.syll_course_description}
                onChange={handleChange}
                className="bg-white text-black border-gray-300"
              />
            </div>
          </div>

          {/* Instructor Details */}
          <h2 className="text-3xl font-semibold text-black">Instructor Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="syll_ins_user_id" className="!text-black">
                Instructor Name
              </Label>
              <Select
                id="syll_ins_user_id"
                name="syll_ins_user_id"
                required
                onChange={handleChange}
                className="bg-white text-black border-gray-300 rounded"
                value={form.syll_ins_user_id}
              >
                <option value="">Select Instructor</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id.toString()}>
                    {instructor.lastname}, {instructor.firstname}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="syll_ins_bldg_rm" className="!text-black">
                Bldg/Rm No.
              </Label>
              <TextInput
                type="text"
                id="syll_ins_bldg_rm"
                name="syll_ins_bldg_rm"
                required
                value={form.syll_ins_bldg_rm}
                onChange={handleChange}
                className="bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="syll_ins_consultation" className="!text-black">
              Consultation Schedule
            </Label>
            <Textarea
              id="syll_ins_consultation"
              name="syll_ins_consultation"
              rows={5}
              required
              value={form.syll_ins_consultation}
              onChange={handleChange}
              className="bg-white text-black border-gray-300"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="font-semibold text-white px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Create Syllabus
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
