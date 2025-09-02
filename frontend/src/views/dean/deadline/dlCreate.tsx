

import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Button, Label, TextInput, Select } from "flowbite-react";

const SetDeadline: React.FC = () => {
  const [dlSyll, setDlSyll] = useState("");
  const [dlTosMid, setDlTosMid] = useState("");
  const [dlTosFinal, setDlTosFinal] = useState("");
  const [schoolYear, setSchoolYear] = useState("2023-2024");
  const [semester, setSemester] = useState("1st Semester");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ dlSyll, dlTosMid, dlTosFinal, schoolYear, semester });
    alert("Deadline submitted (frontend only)");
  };

  return (
    <div className="flex">
      <DeanHeader children={undefined} />
      <DeanSidebar />

      <div
        className="flex-1 p-4 mt-14 min-h-screen"
        style={{
          backgroundImage: 'url("/assets/Wave1.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className="flex flex-col justify-center mb-20 pl-52">
          <div className="relative mt-[100px] flex flex-col bg-gradient-to-r from-white to-[#dbeafe] p-12 px-8 md:space-y-0 rounded-xl shadow-lg mx-auto border border-white max-w-5xl">
            <img
              className="text-center mt-6 w-[400px] m-auto mb-2"
              src="/assets/Set Syllabus and TOS Deadline.png"
              alt="SyllabEase Logo"
            />

            <form onSubmit={handleSubmit}>
              {/* Syllabus Deadline */}
              <div className="m-4">
                <Label htmlFor="dl_syll" className="mb-1">
                  Syllabus Deadline <span className="text-red-600">*</span>
                </Label>
                <TextInput
                  type="datetime-local"
                  id="dl_syll"
                  value={dlSyll}
                  onChange={(e) => setDlSyll(e.target.value)}
                  required
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                />
              </div>

              {/* TOS Midterm Deadline */}
              <div className="m-4">
                <Label htmlFor="dl_tos_mid" className="mb-1">
                  TOS Midterm 
                </Label>
                <TextInput
                  type="datetime-local"
                  id="dl_tos_mid"
                  value={dlTosMid}
                  onChange={(e) => setDlTosMid(e.target.value)}
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                />
              </div>

              {/* TOS Final Deadline */}
              <div className="m-4">
                <Label htmlFor="dl_tos_final" className="mb-1">
                  TOS Final Deadline
                </Label>
                <TextInput
                  type="datetime-local"
                  id="dl_tos_final"
                  value={dlTosFinal}
                  onChange={(e) => setDlTosFinal(e.target.value)}
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                />
              </div>

              {/* School Year */}
              <div className="m-4">
                <Label htmlFor="dl_school_year" className="mb-1">
                  School Year <span className="text-red-600">*</span>
                </Label>
                <Select
                  id="dl_school_year"
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  required
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

              {/* Semester */}
              <div className="m-4">
                <Label htmlFor="dl_semester" className="mb-1">
                  Semester <span className="text-red-600">*</span>
                </Label>
                <Select
                  id="dl_semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="Mid Year">Mid Year</option>
                </Select>
              </div>

              <div className="text-center mt-4">
                <Button type="submit" color="light" className="flex items-center gap-2">
                  Set Deadline
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetDeadline;
