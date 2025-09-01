import React, { useState } from "react";
import ChairSidbarSyllabus from "../../layouts/chairSidebarSyllabus";
import { useNavigate } from "react-router-dom";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// Mocked data (replace with API/props when backend is ready)
const syll = {
  version: "1.0",
  effectivity_date: "2024-08-01",
  college_description: "College of Engineering",
  department_name: "Department of Computer Engineering",
  course_title: "Software Engineering",
  course_code: "SE101",
  course_credit_unit: 3,
  course_unit_lec: 2,
  course_unit_lab: 1,
  course_semester: "1st",
  bg_school_year: "2024-2025",
  syll_class_schedule: "MWF 9:00-10:00AM",
  syll_bldg_rm: "Bldg 1, Rm 101",
  course_pre_req: "None",
  course_co_req: "None",
  instructors: [
    {
      firstname: "Juan",
      lastname: "Dela Cruz",
      email: "juan.delacruz@ustp.edu.ph",
      phone: "09123456789",
      signature: "",
      prefix: "Mr.",
      suffix: "",
    },
  ],
  syll_ins_consultation: "TTh 1:00-2:00PM",
  syll_ins_bldg_rm: "Bldg 1, Rm 102",
  syll_course_description: "This course covers ...",
  syll_course_requirements: "<ul><li>Attendance</li><li>Exams</li><li>Projects</li></ul>",
  chair_submitted_at: true,
  dean_submitted_at: null,
  chair_rejected_at: null,
  dean_rejected_at: null,
  dean_approved_at: null,
  status: "Pending",
  syll_chair: "Chair Name",
  syll_dean: "Dean Name",
  college_code: "COE",
};

const poes = [
  { poe_code: "PEO1", poe_description: "Demonstrate professional skills." },
  { poe_code: "PEO2", poe_description: "Engage in lifelong learning." },
];

const programOutcomes = [
  { po_id: 1, po_letter: "A", po_description: "Apply knowledge of computing." },
  { po_id: 2, po_letter: "B", po_description: "Analyze problems." },
];

const courseOutcomes = [
  { syll_co_id: 1, syll_co_code: "CO1", syll_co_description: "Understand software processes." },
  { syll_co_id: 2, syll_co_code: "CO2", syll_co_description: "Apply design principles." },
];

const copos = [
  { syll_co_id: 1, syll_po_id: 1, syll_co_po_code: "I" },
  { syll_co_id: 1, syll_po_id: 2, syll_co_po_code: "E" },
  { syll_co_id: 2, syll_po_id: 1, syll_co_po_code: "D" },
  { syll_co_id: 2, syll_po_id: 2, syll_co_po_code: "I" },
];

const courseOutlines = [
  {
    syll_co_out_id: 1,
    syll_allotted_time: "2 hrs",
    syll_intended_learning: "Understand basics",
    syll_topics: "Intro to SE",
    syll_suggested_readings: "Book 1",
    syll_learning_act: "Lecture",
    syll_asses_tools: "Quiz",
    syll_grading_criteria: "10%",
    syll_remarks: "None",
    cos: [{ syll_co_code: "CO1" }],
  },
];

const courseOutlinesFinals = [
  {
    syll_co_out_id: 2,
    syll_allotted_time: "2 hrs",
    syll_intended_learning: "Apply design",
    syll_topics: "Design Patterns",
    syll_suggested_readings: "Book 2",
    syll_learning_act: "Workshop",
    syll_asses_tools: "Project",
    syll_grading_criteria: "20%",
    syll_remarks: "None",
    cos: [{ syll_co_code: "CO2" }],
  },
];

const bLeaders = [
  {
    firstname: "Juan",
    lastname: "Dela Cruz",
    signature: "",
    prefix: "Mr.",
    suffix: "",
  },
];

const chair = { signature: "" };
const dean = { signature: "" };

// Mocked remarks for demonstration
const remarks = {
  srf1: { srf_yes_no: "no", srf_remarks: "Please update the course code." },
  srf2: { srf_yes_no: "yes", srf_remarks: "" },
  srf3: { srf_yes_no: "yes", srf_remarks: "" },
  srf4: { srf_yes_no: "yes", srf_remarks: "" },
  srf5: { srf_yes_no: "yes", srf_remarks: "" },
  srf6: { srf_yes_no: "yes", srf_remarks: "" },
  srf7: { srf_yes_no: "yes", srf_remarks: "" },
  srf8: { srf_yes_no: "yes", srf_remarks: "" },
  srf9: { srf_yes_no: "yes", srf_remarks: "" },
  srf10: { srf_yes_no: "yes", srf_remarks: "" },
  srf11: { srf_yes_no: "yes", srf_remarks: "" },
  srf12: { srf_yes_no: "yes", srf_remarks: "" },
  srf13: { srf_yes_no: "yes", srf_remarks: "" },
  srf14: { srf_yes_no: "yes", srf_remarks: "" },
  srf15: { srf_yes_no: "yes", srf_remarks: "" },
  srf16: { srf_yes_no: "yes", srf_remarks: "" },
  srf17: { srf_yes_no: "yes", srf_remarks: "" },
  srf18: { srf_yes_no: "yes", srf_remarks: "" },
  srf19: { srf_yes_no: "yes", srf_remarks: "" },
};

type RemarkKey = keyof typeof remarks;

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Notification {
  id: string;
  data: {
    for: string;
    course_code: string;
    bg_school_year: string;
    message: string;
    action_url: string;
  };
  created_at: Date;
}

const mockUser: User = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    data: {
      for: "CS",
      course_code: "CS101",
      bg_school_year: "2024-2025",
      message: "New syllabus submitted for review",
      action_url: "/syllabus/1",
    },
    created_at: new Date("2024-01-15T10:30:00"),
  },
];

const SyllView: React.FC = () => {
  // State for remark bubbles
  const [openRemark, setOpenRemark] = useState<RemarkKey | null>(null);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [user] = useState<User>(mockUser);
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState<string>("syllView");

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };


  // State for feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Banner logic (mocked, replace with real logic)
  let banner = null;
  if (syll.chair_submitted_at && !syll.dean_submitted_at && !syll.chair_rejected_at) {
    banner = (
      <div className="flex justify-end mr-28 mt-4">
        
      </div>
    );
  }
  
  // Helper for rendering remark bubbles
  function renderRemarkBubble(key: RemarkKey, label = "Remarks") {
    if (remarks[key]?.srf_yes_no === "no") {
      return (
        <div className="absolute -top-2 -right-2 z-50">
          <div className="relative group">
            <button
              className="text-[#d3494e] hover:text-[#b91c1c] rounded-full"
              title="View remark"
              onClick={() => setOpenRemark(openRemark === key ? null : key)}
              type="button"
            >
              <i className="fa-solid fa-message text-xl"></i>
            </button>
            {openRemark === key && (
              <div className="absolute top-full right-0 mt-2 w-72 max-w-xs bg-white font-[Verdana] text-gray-800 p-4 rounded-lg shadow-xl z-50">
                <div className="absolute -top-2 right-4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] 
                  border-l-transparent border-r-transparent border-b-white"></div>
                <p className="text-left font-semibold text-red-600 mb-3 text-[18px]">{label}:</p>
                <p className="text-center text-gray-700 leading-snug text-[14px] mb-4">
                  {remarks[key]?.srf_remarks || "No remarks provided."}
                </p>
                <div className="flex justify-end">
                  <button
                    className="rounded-md bg-black text-white hover:bg-gray-700 px-4 py-1 text-[14px] transition"
                    onClick={() => setOpenRemark(null)}
                    type="button"
                  >
                    OKAY
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div
      className="font-thin mt-14 min-h-screen"
    >
     {/* Navigation bar */}
       <ChairSidbarSyllabus children={undefined} />
      <div
        className="absolute"
        style={{
          top: "57px", // distance from top (nav bar height)
          backgroundImage: "url('/assets/Wave.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className="flex items-center justify-between w-full mb-4 ">
        {/* Back Button at the Left */}
        <button
          onClick={() => navigate("/chairperson/home")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded ml-2"
        >
          Back
        </button>

        {/* Centered Banner */}
        <div className="flex items-center justify-center flex-1 pt-3">
        <div className="flex flex-1 justify-center ">
          <div className="flex flex-col p-2 justify-center items-center text-green bg-green-300 bg-opacity-75 h-[100px] w-[420px] rounded border border-green shadow-md">
            The syllabus has been approved for the upcoming semester.
            <div className="mt-2">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-200"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Export as DOCX
              </a>
            </div>

          </div>
        </div>

        {/* Empty div to balance right side (keeps banner centered) */}
        <div className="w-[100px]"></div>
      </div>
      </div>

        
      <div className="mx-auto mt-6 w-11/12 border-[3px] border-black bg-white font-serif text-sm p-4 relative">
      
        {/* HEADER SECTION */}
        <div className="flex justify-center items-start mb-4">
          <div className="flex justify-between items-start w-full max-w-5xl">
            {/* LEFT: Logo + Campus Info */}
            <div className="flex items-start space-x-4 w-[70%]">
              <div>
                <img src="/assets/ustplogo.png" alt="USTP Logo" className="w-20 h-auto" />
              </div>
              <div>
                <h1 className="text-md font-bold uppercase leading-tight ml-11 p-2">
                  University of Science and Technology of Southern Philippines
                </h1>
                <p className="text-sm mt-1 ml-11">
                  Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
                </p>
              </div>
            </div>
            {/* RIGHT: Document Info Table */}
            <table className="text-xs text-center border border-gray-400 ml-20">
              <thead>
                <tr className="bg-[#5A6E99] text-black">
                  <th colSpan={3} className="border border-gray-400 px-3 py-1 text-xs font-semibold">
                    Document Code No.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="border border-gray-400 py-1 text-sm font-bold text-gray-700">
                    FM-USTP-ACAD-01
                  </td>
                </tr>
                <tr className="bg-[#5A6E99] text-black">
                  <td className="border border-gray-400 px-2 py-1 font-medium">Rev. No.</td>
                  <td className="border border-gray-400 px-2 py-1 font-medium">Effective Date</td>
                  <td className="border border-gray-400 px-2 py-1 font-medium">Page No.</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-2 py-1">{syll.version}</td>
                  <td className="border border-gray-400 px-2 py-1">{new Date(syll.effectivity_date).toLocaleDateString()}</td>
                  <td className="border border-gray-400 px-2 py-1">#</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* SYLLABUS TABLE */}
        <table className="mt-2 mx-auto border-2 border-solid w-10/12 font-serif text-sm bg-white">
          <tbody>
            {/* 1st Header */}
            <tr>
              <th colSpan={2} className="font-medium border-1 border-solid px-4 relative border-black">
                <span className="font-bold">{syll.college_description}</span>
                <br />
                {syll.department_name}
                {renderRemarkBubble("srf2")}
              </th>
              <th className="font-medium border-2 border-solid border-black text-left px-4 w-2/6 relative">
                <span className="font-bold underline underline-offset-4">Syllabus<br /></span>
                Course Title :<span className="font-bold">{syll.course_title}<br /></span>
                Course Code: {syll.course_code}<br />
                Credits: {syll.course_credit_unit} units ({syll.course_unit_lec} hours lecture, {syll.course_unit_lab} hrs Laboratory)<br />
                {renderRemarkBubble("srf3")}
              </th>
            </tr>
            {/* 2nd Header */}
            <tr>
              <td className="border-2 border-solid font-medium text-sm border-black text-left px-4  align-top relative">
                {/* VISION */}
                <div className="mt-2 mb-8 border-black">
                  <span className="font-bold">USTP Vision<br /><br /></span>
                  <p>The University is a nationally recognized Science and Technology University providing the vital link between education and the economy.</p>
                  {renderRemarkBubble("srf8")}
                </div>
                {/* MISSION */}
                <div className="mb-8 relative">
                  <span className="font-bold">USTP Mission<br /><br /></span>
                  <ul className="list-disc ml-8">
                    <li>Bring the world of work (industry) into the actual higher education and training of students;</li>
                    <li>Offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization;</li>
                    <li>Contribute significantly to the National Development Goals of food security an energy sufficiency through technological solutions.</li>
                  </ul>
                </div>
                {/* POE */}
                <div className="mb-8 relative border-black">
                  <span className="font-bold">Program Educational Objectives<br /><br /></span>
                  {poes.map((poe) => (
                    <div className="mb-2" key={poe.poe_code}>
                      <p><span className="font-semibold">{poe.poe_code}: </span>{poe.poe_description}</p>
                    </div>
                  ))}
                  {renderRemarkBubble("srf8")}
                </div>
                <div className="mb-8 border-black">
                  <span className="font-bold">Program Outcomes<br /><br /></span>
                  {programOutcomes.map((po) => (
                    <div className="mb-5" key={po.po_id}>
                      <p><span className="font-semibold leading-relaxed">{po.po_letter}: </span>{po.po_description}</p>
                    </div>
                  ))}
                </div>
                <table className="table-auto border-2 mb-5 border-black">
                  <thead className="border-2">
                    <tr>
                      <th className="border-2 text-center py-1 border-black">Code</th>
                      <th className="border-2 text-center border-black ">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 text-center py-2 border-black">I</td>
                      <td className="border-2 text-center border-black">Introductory Course</td>
                    </tr>
                    <tr>
                      <td className="border-2 text-center py-2 border-black">E</td>
                      <td className="border-2 text-center border-black">Enabling Course</td>
                    </tr>
                    <tr>
                      <td className="border-2 text-center py-2 border-black">D</td>
                      <td className="border-2 text-center border-black">Demonstrative Course</td>
                    </tr>
                    <tr className="font-semibold ">
                      <td className="border-2 text-center py-1 border-black">Code</td>
                      <td className="border-2 text-center border-black">Definition</td>
                    </tr>
                    <tr>
                      <td className="border-2 text-center py-5 border-black">I</td>
                      <td className="border-2 text-center border-black">An introductory course to an outcome</td>
                    </tr>
                    <tr>
                      <td className="border-2 text-center py-5 border-black">E</td>
                      <td className="border-2 text-center border-black">A course strengthens an outcome</td>
                    </tr>
                    <tr>
                      <td className="border-2 text-center py-5 border-black">D</td>
                      <td className="border-2 text-center border-black">A Course demonstrating an outcome</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td colSpan={2} className="w-[10/12] align-top border-black">
                <table className="my-4 mx-2">
                  <tbody>
                    <tr>
                      <td className="border-2 border-solid border-black font-medium text-left px-4 w-1/2 relative">
                        Semester/Year: {syll.course_semester} SY{syll.bg_school_year}<br />
                        Class Schedule: {syll.syll_class_schedule}<br />
                        Bldg./Rm. No. {syll.syll_bldg_rm}
                        {renderRemarkBubble("srf5")}
                      </td>
                      <td className="border-2 border-solid font-medium text-start text-top px-4 relative border-black">
                        Pre-requisite(s): {syll.course_pre_req} <br />
                        Co-requisite(s): {syll.course_co_req}
                        {renderRemarkBubble("srf4")}
                      </td>
                    </tr>
                    <tr>
                      <td className="items-start border-2 border-solid font-medium text-left px-4 relative border-black">
                        Instructor:{" "}
                        {syll.instructors.map((inst, idx) => (
                          <span className="font-bold" key={idx}>
                            {idx > 0 && idx === syll.instructors.length - 1
                              ? " and "
                              : idx > 0
                              ? ", "
                              : ""}
                            {inst.firstname} {inst.lastname}
                          </span>
                        ))}
                        <br />
                        Email:{" "}
                        {syll.instructors.map((inst, idx) => (
                          <span key={idx}>{inst.email}{idx < syll.instructors.length - 1 ? ", " : ""}</span>
                        ))}
                        <br />
                        Phone:{" "}
                        {syll.instructors.map((inst, idx) => (
                          <span key={idx}>{inst.phone}{idx < syll.instructors.length - 1 ? ", " : ""}</span>
                        ))}
                        <br />
                        {renderRemarkBubble("srf6")}
                      </td>
                      <td className="border-2 border-solid font-medium text-left px-4 relative border-black">
                        Consultation Schedule: {syll.syll_ins_consultation}<br />
                        Bldg rm no: {syll.syll_ins_bldg_rm}
                        {renderRemarkBubble("srf7")}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="items-start border-2 border-solid font-medium text-left px-4 relative border-black">
                        <span className="text-left font-bold">I. Course Description:</span>
                        <br />
                        {syll.syll_course_description}
                        {renderRemarkBubble("srf9")}
                      </td>
                    </tr>
                    {/* Course Outcomes Table */}
                    <tr>
                      <td colSpan={2} className="border-2 border-solid font-medium px-4 relative border-black">
                        <span className="text-left font-bold">II. Course Outcome:</span>
                        <br />
                        <table className="m-10 mx-auto border-2 border-solid w-11/12">
                          <thead>
                            <tr className="border-2 border-solid border-black">
                              <th>Course Outcomes (CO)</th>
                              {programOutcomes.map((po, idx) => (
                                <th className="border-2 border-solid border-black" key={po.po_id}>{idx + 1}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {courseOutcomes.map((co) => (
                              <tr key={co.syll_co_id} className="border-2 border-solid hover:bg-blue-100 border-black">
                                <td className="w-64 text-left font-medium px-2">
                                  <span className="font-bold">{co.syll_co_code} : </span>
                                  {co.syll_co_description}
                                </td>
                                {programOutcomes.map((po) => (
                                  <td className="border-2 border-solid font-medium text-center py-1 border-black" key={po.po_id}>
                                    {copos
                                      .filter(
                                        (copo) =>
                                          copo.syll_po_id === po.po_id &&
                                          copo.syll_co_id === co.syll_co_id
                                      )
                                      .map((copo) => copo.syll_co_po_code)
                                      .join(", ")}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {renderRemarkBubble("srf11")}
                      </td>
                    </tr>
                    {/* Course Outline Table */}
                    <tr>
                      <td colSpan={2} className="border-2 border-solid font-medium px-4 border-black">
                        <span className="text-left font-bold">III. Course Outline:</span>
                        <br />
                        <table className="m-5 mx-auto border-2 border-solid w-full border-black">
                          <thead>
                            <tr className="border-2 border-solid border-black">
                              <th className="border-2 border-solid border-black">Allotted Time</th>
                              <th className="border-2 border-solid border-black">Course Outcomes (C)</th>
                              <th className="border-2 border-solid border-black">Intended Learning Outcome (ILO)</th>
                              <th className="border-2 border-solid border-black">Topics</th>
                              <th className="border-2 border-solid border-black">Suggested Readings</th>
                              <th className="border-2 border-solid border-black">Teaching Learning Activities</th>
                              <th className="border-2 border-solid border-black">Assessment Tasks/Tools</th>
                              <th className="border-2 border-solid border-black">Grading Criteria</th>
                              <th className="border-2 border-solid border-black">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseOutlines.map((cot, idx) => (
                              <tr key={cot.syll_co_out_id} className="border-2 border-solid hover:bg-blue-100">
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_allotted_time}</td>
                                <td className="border-2 border-solid p-2 border-black">
                                  {cot.cos.map((co, i) => (
                                    <span key={i}>
                                      {co.syll_co_code}
                                      {i < cot.cos.length - 1 ? ", " : ""}
                                    </span>
                                  ))}
                                </td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_intended_learning}</td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_topics}</td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_suggested_readings}</td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_learning_act}</td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_asses_tools}</td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_grading_criteria}</td>
                                <td className="border-2 border-solid p-2 border-black">{cot.syll_remarks}</td>
                              </tr>
                            ))}
                            <tr className="border-2 border-solid p-2">
                              <th colSpan={10} className="border-2 border-solid font-medium px-4 border-black">
                                MIDTERM EXAMINATION
                              </th>
                            </tr>
                            {courseOutlinesFinals.map((cotf, idx) => (
                              <tr key={cotf.syll_co_out_id} className="border-2 border-solid hover:bg-blue-100">
                                <td className="border-2 border-solid border-black">{cotf.syll_allotted_time}</td>
                                <td className="border-2 border-solid border-black">
                                  {cotf.cos.map((co, i) => (
                                    <span key={i}>
                                      {co.syll_co_code}
                                      {i < cotf.cos.length - 1 ? ", " : ""}
                                    </span>
                                  ))}
                                </td>
                                <td className="border-2 border-solid border-black">{cotf.syll_intended_learning}</td>
                                <td className="border-2 border-solid border-black">{cotf.syll_topics}</td>
                                <td className="border-2 border-solid border-black">{cotf.syll_suggested_readings}</td>
                                <td className="border-2 border-solid border-black">{cotf.syll_learning_act}</td>
                                <td className="border-2 border-solid border-black">{cotf.syll_asses_tools}</td>
                                <td className="border-2 border-solid border-black">{cotf.syll_grading_criteria}</td>
                                <td className="border-2 border-solid border-black">{cotf.syll_remarks}</td>
                              </tr>
                            ))}
                            <tr>
                              <th colSpan={10} className="border-2 border-solid font-medium px-4 border-black">
                                FINAL EXAMINATION
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    {/* Course Requirements */}
                    <tr className="crq border-2">
                      <td colSpan={2} className="border-2 border-solid font-medium relative border-black">
                        <span className="text-left font-bold">IV. Course Requirements:</span>
                        <br />
                        <div className="crq" dangerouslySetInnerHTML={{ __html: syll.syll_course_requirements }} />
                        {renderRemarkBubble("srf18")}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Signatories */}
                <div className="grid grid-cols-3 m-3 ">
                  <div>
                    <div className="flex justify-center">Prepared By:</div>
                    {bLeaders.map((instructor, idx) => (
                      <div className="mt-5" key={idx}>
                        <div className="flex justify-center">
                          {syll.chair_submitted_at && instructor.signature && (
                            <img
                              src={`/assets/signatures/${instructor.signature}`}
                              alt="Instructor Signature"
                              className="h-16 object-contain"
                            />
                          )}
                        </div>
                        <div className="flex justify-center font-semibold underline mt-2 text-center">
                          {`${instructor.prefix.toUpperCase()} ${instructor.firstname.toUpperCase()} ${instructor.lastname.toUpperCase()} ${instructor.suffix.toUpperCase()}`}
                        </div>
                        <div className="flex justify-center">Instructor</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-center">Checked and Recommended for Approval:</div>
                    <div className="flex justify-center mt-5">
                      {syll.dean_submitted_at && chair.signature && (
                        <img
                          src={`/assets/signatures/${chair.signature}`}
                          alt="Chair Signature"
                          className="h-16 object-contain"
                        />
                      )}
                    </div>
                    <div className="flex justify-center font-semibold underline mt-2 text-center">
                      {syll.syll_chair.toUpperCase()}
                    </div>
                    <div className="flex justify-center">Department Chair</div>
                  </div>
                  <div>
                    <div className="flex justify-center">Approved by:</div>
                    <div className="flex justify-center mt-5">
                      {syll.dean_approved_at && dean.signature && (
                        <img
                          src={`/assets/signatures/${dean.signature}`}
                          alt="Dean Signature"
                          className="h-16 object-contain"
                        />
                      )}
                    </div>
                    <div className="flex justify-center font-semibold underline mt-2 text-center">
                      {syll.syll_dean.toUpperCase()}
                    </div>
                    <div className="flex justify-center">Dean</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Feedback Modal Example */}
        {showFeedbackModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px] h-[520px] flex flex-col">
              <div className="mt-5 flex flex-col justify-center items-center">
                <div className="text-lg font-semibold">Dean's Feedback</div>
                <div className="mx-[30px] mt-5 h-[380px] border w-10/12 p-4 border-blue-500 rounded">
                  <div>
                    {/* Replace with real feedback */}
                    No feedback yet.
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-600 px-3 py-2 rounded-lg text-white hover:bg-blue-700"
                    onClick={() => setShowFeedbackModal(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      
      
    </div>
  );
};

export default SyllView;