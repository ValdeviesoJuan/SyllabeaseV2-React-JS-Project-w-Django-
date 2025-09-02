import React, { useState } from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface BGroup {
  bg_id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
}

interface Syllabus {
  effectivity_date: string;
  syll_bldg_rm: string;
  syll_class_schedule: string;
  syll_ins_consultation: string;
  syll_ins_bldg_rm: string;
  syll_course_description: string;
  syll_bg_id?: number;
  syll_ins_user_id?: number; // ✅ single instructor instead of array
}

const EditSyllabus: React.FC = () => {
  // Mock data (replace later with API call)
  const bGroups: BGroup[] = [
    { bg_id: 1, course_code: "CS101", course_title: "Intro to CS", bg_school_year: "2023-2024" },
    { bg_id: 2, course_code: "MATH201", course_title: "Calculus II", bg_school_year: "2023-2024" },
  ];

  const users: User[] = [
    { id: 1, firstname: "John", lastname: "Doe" },
    { id: 2, firstname: "Jane", lastname: "Smith" },
  ];

  const [formData, setFormData] = useState<Syllabus>({
    effectivity_date: "",
    syll_bldg_rm: "",
    syll_class_schedule: "",
    syll_ins_consultation: "",
    syll_ins_bldg_rm: "",
    syll_course_description: "",
    syll_bg_id: undefined,
    syll_ins_user_id: undefined, // ✅ single instructor
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("_id") ? Number(value) || undefined : value, // convert IDs to number
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="flex flex-col justify-center mb-20 bg-no-repeat bg-top bg-fixed bg-contain min-h-screen"
      style={{ backgroundImage: "url(/assets/wave1.png)" }}
    >
      <div className="relative mt-24 flex flex-col bg-gradient-to-r from-white to-blue-100 p-8 rounded-xl shadow-lg mx-auto border">
        <img
          className="text-center mt-6 w-80 mx-auto mb-4"
          src="/assets/Edit Syllabus Header.png"
          alt="SyllabEase Logo"
        />
        <form className="p-8" onSubmit={handleSubmit}>
          {/* Bayanihan Group + Effectivity Date + Bldg./Rm No + Instructor */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Label htmlFor="bg_id" className="!text-black">Bayanihan Group</Label>
              <Select
                id="bg_id"
                name="syll_bg_id"
                required
                value={formData.syll_bg_id ?? ""}
                onChange={handleChange}
                className="w-[300px]"
              >
                <option value="">-- Select --</option>
                {bGroups.map((g) => (
                  <option key={g.bg_id} value={g.bg_id}>
                    {g.course_code}: {g.course_title} {g.bg_school_year}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="effectivity_date" className="!text-black">Effectivity Date</Label>
              <TextInput
                type="date"
                id="effectivity_date"
                name="effectivity_date"
                value={formData.effectivity_date}
                onChange={handleChange}
                required
                className="w-[390px]"
              />
            </div>

            <div>
              <Label htmlFor="syll_bldg_rm" className="!text-black">Bldg./Rm No.</Label>
              <TextInput
                id="syll_bldg_rm"
                name="syll_bldg_rm"
                value={formData.syll_bldg_rm}
                onChange={handleChange}
                required
                className="w-[300px]"
              />
            </div>

            <div>
              <Label htmlFor="syll_ins_user_id" className="!text-black">Instructor</Label>
              <Select
                id="syll_ins_user_id"
                name="syll_ins_user_id"
                required
                value={formData.syll_ins_user_id ?? ""}
                onChange={handleChange}
                className="w-[300px]"
              >
                <option value="">-- Select --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.lastname}, {u.firstname}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Class Schedule + Consultation */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Label htmlFor="syll_class_schedule" className="!text-black">Class Schedule</Label>
              <Textarea
                id="syll_class_schedule"
                name="syll_class_schedule"
                value={formData.syll_class_schedule}
                onChange={handleChange}
                required
                rows={5}
                className="w-[450px]"
              />
            </div>

            <div>
              <Label htmlFor="syll_ins_consultation" className="!text-black">Consultation Schedule</Label>
              <Textarea
                id="syll_ins_consultation"
                name="syll_ins_consultation"
                value={formData.syll_ins_consultation}
                onChange={handleChange}
                required
                rows={5}
                className="w-[450px]"
              />
            </div>
          </div>

          {/* Instructor Bldg./Rm + Course Description */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Label htmlFor="syll_ins_bldg_rm" className="!text-black">Instructor Bldg./Rm. No.</Label>
              <TextInput
                id="syll_ins_bldg_rm"
                name="syll_ins_bldg_rm"
                value={formData.syll_ins_bldg_rm}
                onChange={handleChange}
                required
                className="w-[300px]"
              />
            </div>

            <div>
              <Label htmlFor="syll_course_description" className="!text-black">Course Description</Label>
              <Textarea
                id="syll_course_description"
                name="syll_course_description"
                value={formData.syll_course_description}
                onChange={handleChange}
                required
                rows={5}
                className="w-[450px]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button type="submit" color="blue" className="px-6 py-2 font-semibold">
              Update Syllabus Header
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSyllabus;
