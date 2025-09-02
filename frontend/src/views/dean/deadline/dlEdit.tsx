

import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Button } from "flowbite-react";

interface Deadline {
  dl_id: number;
  dl_syll: string;
  dl_tos_midterm: string;
  dl_tos_final: string;
  dl_school_year: string;
  dl_semester: string;
}

const mockDeadline: Deadline = {
  dl_id: 1,
  dl_syll: "2025-08-01T12:00",
  dl_tos_midterm: "2025-08-15T12:00",
  dl_tos_final: "2025-08-30T12:00",
  dl_school_year: "2025-2026",
  dl_semester: "1st Semester",
};

const DLUpdate: React.FC = () => {
  const [deadline, setDeadline] = useState<Deadline>(mockDeadline);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeadline({ ...deadline, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Deadline updated (frontend only demo): " + JSON.stringify(deadline, null, 2));
  };

  return (
    <div className="flex">
      <DeanSidebar />
      <DeanHeader children={undefined} />

      <div
        className="flex-1 min-h-screen p-4 mt-14"
        style={{
          backgroundImage: 'url("/assets/Wave.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className="relative mt-20 flex flex-col bg-gradient-to-r from-[#FFF] to-[#dbeafe]  md:p-8 rounded-xl shadow-lg mx-auto border border-white max-w-md pl-52">
          <img
            className="edit_user_img text-center mt-6 w-[400px] m-auto mb-2"
            src="/assets/Edit Syllabus and TOS Deadline.png"
            alt="SyllabEase Logo"
          />

          <form onSubmit={handleSubmit}>
            {/* Syllabus Deadline */}
            <div className="m-4" >
              <label htmlFor="dl_syll">Syllabus Deadline</label>
              <input
                type="datetime-local"
                name="dl_syll"
                id="dl_syll"
                className="px-1 py-[6px] w-full border rounded border-gray-300"
                value={deadline.dl_syll}
                onChange={handleChange}
                required
              />
            </div>

            {/* TOS Midterm */}
            <div className="m-4">
              <label htmlFor="dl_tos_midterm">TOS Midterm Deadline</label>
              <input
                type="datetime-local"
                name="dl_tos_midterm"
                id="dl_tos_midterm"
                className="px-1 py-[6px] w-full border rounded border-gray-300"
                value={deadline.dl_tos_midterm}
                onChange={handleChange}
                required
              />
            </div>

            {/* TOS Final */}
            <div className="m-4">
              <label htmlFor="dl_tos_final">TOS Final Deadline</label>
              <input
                type="datetime-local"
                name="dl_tos_final"
                id="dl_tos_final"
                className="px-1 py-[6px] w-full border rounded border-gray-300"
                value={deadline.dl_tos_final}
                onChange={handleChange}
                required
              />
            </div>

            {/* School Year */}
            <div className="m-4">
              <label htmlFor="dl_school_year">School Year</label>
              <select
                name="dl_school_year"
                id="dl_school_year"
                className="w-full px-1 py-[6px] border rounded border-gray-300"
                value={deadline.dl_school_year}
                onChange={handleChange}
                required
              >
                {[
                  "2023-2024",
                  "2024-2025",
                  "2025-2026",
                  "2026-2027",
                  "2027-2028",
                  "2028-2029",
                  "2029-2030",
                ].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="m-4">
              <label htmlFor="dl_semester">Semester</label>
              <select
                name="dl_semester"
                id="dl_semester"
                className="w-full px-1 py-[6px] border rounded border-gray-300"
                value={deadline.dl_semester}
                onChange={handleChange}
                required
              >
                {["1st Semester", "2nd Semester", "Mid Year"].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center mt-4">
                <Button type="submit" color="blue" className="px-6 py-2 rounded-lg flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Update Deadline</span>
                </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DLUpdate;
