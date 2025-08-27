// frontend/src/views/dean/syllabus/sylList.tsx
import React from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import DeanSyllabusTable from "../../livewire/dean-syllabus-table"; // the wrapper table component

// === Sample dummy data ===
const dummySyllabi = [
  {
    syll_id: 1,
    course_title: "Intro to CS",
    course_code: "CS101",
    bg_school_year: "2023-2024",
    course_semester: "1st Semester",
    chair_submitted_at: "2024-08-01",
    dean_approved_at: "2024-08-05",
    version: 1,
    status: "Draft",
  },
  {
    syll_id: 2,
    course_title: "Data Structures",
    course_code: "CS102",
    bg_school_year: "2023-2024",
    course_semester: "1st Semester",
    chair_submitted_at: "2024-08-02",
    dean_approved_at: "2024-08-06",
    version: 1,
    status: "Pending Chair Review",
  },
];

const dummyDepartments = ["CS", "IT", "EE"];
// === End dummy data ===

const SyllabusHome: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/Wave.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        backgroundColor: "#EEEEEE",
      }}
      className="min-h-screen flex"
    >
      {/* Sidebar */}
      <DeanSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DeanHeader children={undefined} />

        <main className="p-4 mt-14 flex min-h-screen ">
          <div className="absolute top-20 left-64 p-6 pl-3 pr-3 shadow bg-white border-dashed rounded-lg dark:border-gray-700 w-[1080px] h-2/3">
            <h1 className="font-bold text-4xl text-[#201B50] mb-8 text-left">
            List of Syllabus
            </h1>
            <DeanSyllabusTable syllabi={dummySyllabi} departments={dummyDepartments} />
        </div>
        </main>
      </div>
    </div>
  );
};

export default SyllabusHome;
