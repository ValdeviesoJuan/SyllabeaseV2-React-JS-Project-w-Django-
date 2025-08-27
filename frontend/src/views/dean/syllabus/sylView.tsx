import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

interface Instructor { firstname: string; lastname: string; }
interface CourseOutcome { co_id: number; description: string; }
interface ProgramOutcome { po_id: number; description: string; }
interface Syllabus {
  syll_id: number;
  course_code: string;
  course_title: string;
  course_description: string;
  course_credit: string;
  course_prerequisite: string;
  programOutcomes: ProgramOutcome[];
  courseOutcomes: CourseOutcome[];
  instructors: Instructor[];
}

const SylView: React.FC = () => {
  const syllabus: Syllabus = {
    syll_id: 1,
    course_code: "IT 311",
    course_title: "Information Security",
    course_description: "This course introduces students to the fundamental concepts of information security...",
    course_credit: "3 units",
    course_prerequisite: "IT 210",
    programOutcomes: [
      { po_id: 1, description: "Apply knowledge of computing and mathematics." },
      { po_id: 2, description: "Analyze a problem and identify computing requirements." },
    ],
    courseOutcomes: [
      { co_id: 1, description: "Explain the importance of information security." },
      { co_id: 2, description: "Demonstrate risk assessment techniques." },
    ],
    instructors: [
      { firstname: "Alex", lastname: "Dacer" },
      { firstname: "Maria", lastname: "Santos" },
    ],
  };

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    setShowFeedbackModal(false);
  };

  return (
    <div
      className="flex min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/assets/Wave.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        backgroundColor: "#EEEEEE",
      }}
    >
      {/* Sidebar */}
      <DeanSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <DeanHeader children={undefined} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="absolute top-20 left-64 p-6 pl-3 pr-3 shadow bg-white border-dashed rounded-lg dark:border-gray-700 w-[1080px] h-2/3">
            <h1 className="text-2xl font-bold mb-4">{syllabus.course_title}</h1>
            <p className="text-gray-600 mb-2"><strong>Course Code:</strong> {syllabus.course_code}</p>
            <p className="text-gray-600 mb-2"><strong>Credits:</strong> {syllabus.course_credit}</p>
            <p className="text-gray-600 mb-2"><strong>Prerequisite:</strong> {syllabus.course_prerequisite}</p>
            <p className="text-gray-600 mb-4"><strong>Description:</strong> {syllabus.course_description}</p>

            {/* Program Outcomes */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Program Outcomes</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {syllabus.programOutcomes.map((po) => <li key={po.po_id}>{po.description}</li>)}
              </ul>
            </div>

            {/* Course Outcomes */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Course Outcomes</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {syllabus.courseOutcomes.map((co) => <li key={co.co_id}>{co.description}</li>)}
              </ul>
            </div>

            {/* Instructors */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Instructors</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {syllabus.instructors.map((inst, idx) => <li key={idx}>{inst.firstname} {inst.lastname}</li>)}
              </ul>
            </div>

            {/* Feedback Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Return with Feedback
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[500px] h-[520px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Give Feedback</h2>
            <p className="text-gray-600 mb-4">
              Could you please provide more information on why the syllabus submission was returned for revision?
            </p>
            <Editor
              apiKey="your-tinymce-api-key"
              value={feedback}
              init={{
                height: 300,
                menubar: false,
                plugins: "code table lists",
                toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | code | table",
              }}
              onEditorChange={(newValue: string, _editor: TinyMCEEditor) => setFeedback(newValue)}
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowFeedbackModal(false)} className="mr-2 px-3 py-2 rounded bg-gray-300">Cancel</button>
              <button onClick={handleSubmitFeedback} className="px-3 py-2 rounded bg-blue-600 text-white">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SylView;
