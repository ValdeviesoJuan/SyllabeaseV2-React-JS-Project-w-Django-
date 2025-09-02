import React from "react";
import ustpLogo from "../assets/ustplogo.png"; // Adjust path as needed

// Mocked data (replace with props or API when backend is ready)
const syllabus = {
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
  dean_submitted_at: true,
  dean_approved_at: true,
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

const SyllComment: React.FC = () => {
  return (
    <div className="font-thin mt-14 bg-[url('/assets/Wave.png')] bg-no-repeat bg-top bg-fixed bg-contain min-h-screen">
      {/* Finish Button */}
      <div className="flex justify-end mr-32">
        <div className="w-[130px] py-1 rounded-lg bg-[#2468d2] hover:scale-105 transition ease-in-out shadow-lg text-center">
          <a href="/chairperson/syllabus" className="text-white flex items-center">
            <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 -0.5 25 25" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-2">Finish</span>
          </a>
        </div>
      </div>
      {/* Syllabus Table */}
      <table className="mt-2 mx-auto border-2 border-solid w-10/12 font-serif text-sm bg-white">
        {/* 1st Header */}
        <tbody>
          <tr>
            <th colSpan={2} className="font-medium border-2 border-solid px-4">
              <span className="font-bold">{syllabus.college_description}</span><br />
              {syllabus.department_name}
            </th>
            <th className="font-medium border-2 border-solid text-left px-4 w-2/6">
              <span className="font-bold underline underline-offset-4">Syllabus<br /></span>
              Course Title :<span className="font-bold">{syllabus.course_title}<br /></span>
              Course Code: {syllabus.course_code}<br />
              Credits: {syllabus.course_credit_unit} units ({syllabus.course_unit_lec} hours lecture, {syllabus.course_unit_lab} hrs Laboratory)<br />
            </th>
          </tr>
          {/* 2nd Header */}
          <tr>
            <td className="border-2 border-solid font-medium text-sm text-left px-4 text-justify align-top">
              {/* VISION */}
              <div className="mt-2 mb-8">
                <span className="font-bold">USTP Vision<br /><br /></span>
                <p>The University is a nationally recognized Science and Technology University providing the vital link between education and the economy.</p>
              </div>
              {/* MISSION */}
              <div className="mb-8">
                <span className="font-bold">USTP Mission<br /><br /></span>
                <ul className="list-disc ml-8">
                  <li>Bring the world of work (industry) into the actual higher education and training of students;</li>
                  <li>Offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization;</li>
                  <li>Contribute significantly to the National Development Goals of food security an energy sufficiency through technological solutions.</li>
                </ul>
              </div>
              {/* POE */}
              <div className="mb-8">
                <span className="font-bold">Program Educational Objectives<br /><br /></span>
                {poes.map((poe) => (
                  <div className="mb-2" key={poe.poe_code}>
                    <p><span className="font-semibold">{poe.poe_code}: </span>{poe.poe_description}</p>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <span className="font-bold">Program Outcomes<br /><br /></span>
                {programOutcomes.map((po) => (
                  <div className="mb-5" key={po.po_id}>
                    <p><span className="font-semibold leading-relaxed">{po.po_letter}: </span>{po.po_description}</p>
                  </div>
                ))}
              </div>
              <table className="table-auto border-2 mb-5">
                <thead className="border-2">
                  <tr>
                    <th className="border-2 text-center py-1">Code</th>
                    <th className="border-2 text-center">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 text-center py-2">I</td>
                    <td className="border-2 text-center">Introductory Course</td>
                  </tr>
                  <tr>
                    <td className="border-2 text-center py-2">E</td>
                    <td className="border-2 text-center">Enabling Course</td>
                  </tr>
                  <tr>
                    <td className="border-2 text-center py-2">D</td>
                    <td className="border-2 text-center">Demonstrative Course</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="border-2 text-center py-1">Code</td>
                    <td className="border-2 text-center">Definition</td>
                  </tr>
                  <tr>
                    <td className="border-2 text-center py-5">I</td>
                    <td className="border-2 text-center">An introductory course to an outcome</td>
                  </tr>
                  <tr>
                    <td className="border-2 text-center py-5">E</td>
                    <td className="border-2 text-center">A course strengthens an outcome</td>
                  </tr>
                  <tr>
                    <td className="border-2 text-center py-5">D</td>
                    <td className="border-2 text-center">A Course demonstrating an outcome</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td colSpan={2} className="w-[10/12] align-top">
              <table className="my-4 mx-2">
                <tbody>
                  <tr>
                    <td className="border-2 border-solid font-medium text-left px-4 w-1/2">
                      Semester/Year: {syllabus.course_semester} SY{syllabus.bg_school_year}<br />
                      Class Schedule: {syllabus.syll_class_schedule}<br />
                      Bldg./Rm. No. {syllabus.syll_bldg_rm}
                    </td>
                    <td className="border-2 border-solid font-medium text-start text-top px-4">
                      Pre-requisite(s): {syllabus.course_pre_req} <br />
                      Co-requisite(s): {syllabus.course_co_req}
                    </td>
                  </tr>
                  <tr>
                    <td className="items-start border-2 border-solid font-medium text-left px-4">
                      Instructor:{" "}
                      {syllabus.instructors.map((inst, idx) => (
                        <span className="font-bold" key={idx}>
                          {idx > 0 && idx === syllabus.instructors.length - 1
                            ? " and "
                            : idx > 0
                            ? ", "
                            : ""}
                          {inst.firstname} {inst.lastname}
                        </span>
                      ))}
                      <br />
                      Email:{" "}
                      {syllabus.instructors.map((inst, idx) => (
                        <span key={idx}>{inst.email}{idx < syllabus.instructors.length - 1 ? ", " : ""}</span>
                      ))}
                      <br />
                      Phone:{" "}
                      {syllabus.instructors.map((inst, idx) => (
                        <span key={idx}>{inst.phone}{idx < syllabus.instructors.length - 1 ? ", " : ""}</span>
                      ))}
                      <br />
                    </td>
                    <td className="border-2 border-solid font-medium text-left px-4">
                      Consultation Schedule: {syllabus.syll_ins_consultation}<br />
                      Bldg rm no: {syllabus.syll_ins_bldg_rm}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="items-start border-2 border-solid font-medium text-left px-4">
                      <span className="text-left font-bold">I. Course Description:</span>
                      <br />
                      {syllabus.syll_course_description}
                    </td>
                  </tr>
                  {/* Course Outcomes Table */}
                  <tr>
                    <td colSpan={2} className="border-2 border-solid font-medium px-4">
                      <span className="text-left font-bold">II. Course Outcome:</span>
                      <br />
                      <table className="m-10 mx-auto border-2 border-solid w-11/12">
                        <thead>
                          <tr className="border-2 border-solid">
                            <th>Course Outcomes (CO)</th>
                            {programOutcomes.map((po, idx) => (
                              <th className="border-2 border-solid" key={po.po_id}>{idx + 1}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {courseOutcomes.map((co) => (
                            <tr key={co.syll_co_id} className="border-2 border-solid hover:bg-blue-100">
                              <td className="w-64 text-left font-medium px-2">
                                <span className="font-bold">{co.syll_co_code} : </span>
                                {co.syll_co_description}
                              </td>
                              {programOutcomes.map((po) => (
                                <td className="border-2 border-solid font-medium text-center py-1" key={po.po_id}>
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
                              <td className="relative w-4">
                                {/* Comment Modal Button Placeholder */}
                                <button className="text-blue-500 underline">Comment</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {/* Course Outline Table */}
                  <tr>
                    <td colSpan={2} className="border-2 border-solid font-medium px-4">
                      <span className="text-left font-bold">III. Course Outline:</span>
                      <br />
                      <table className="m-5 mx-auto border-2 border-solid w-full">
                        <thead>
                          <tr className="border-2 border-solid">
                            <th className="border-2 border-solid">Alloted Time</th>
                            <th className="border-2 border-solid">Course Outcomes (C)</th>
                            <th className="border-2 border-solid">Intended Learning Outcome (ILO)</th>
                            <th className="border-2 border-solid">Topics</th>
                            <th className="border-2 border-solid">Suggested Readings</th>
                            <th className="border-2 border-solid">Teaching Learning Activities</th>
                            <th className="border-2 border-solid">Assessment Tasks/Tools</th>
                            <th className="border-2 border-solid">Grading Criteria</th>
                            <th className="border-2 border-solid">Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courseOutlines.map((cot, idx) => (
                            <tr key={cot.syll_co_out_id} className="border-2 border-solid hover:bg-blue-100">
                              <td className="border-2 border-solid p-2">{cot.syll_allotted_time}</td>
                              <td className="border-2 border-solid p-2">
                                {cot.cos.map((co, i) => (
                                  <span key={i}>
                                    {co.syll_co_code}
                                    {i < cot.cos.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </td>
                              <td className="border-2 border-solid p-2">{cot.syll_intended_learning}</td>
                              <td className="border-2 border-solid p-2">{cot.syll_topics}</td>
                              <td className="border-2 border-solid p-2">{cot.syll_suggested_readings}</td>
                              <td className="border-2 border-solid p-2">{cot.syll_learning_act}</td>
                              <td className="border-2 border-solid p-2">{cot.syll_asses_tools}</td>
                              <td className="border-2 border-solid p-2">{cot.syll_grading_criteria}</td>
                              <td className="border-2 border-solid p-2">{cot.syll_remarks}</td>
                              <td className="relative">
                                {/* Comment Modal Button Placeholder */}
                                <button className="text-blue-500 underline">Comment</button>
                              </td>
                            </tr>
                          ))}
                          <tr className="border-2 border-solid p-2">
                            <th colSpan={10} className="border-2 border-solid font-medium px-4">
                              MIDTERM EXAMINATION
                            </th>
                          </tr>
                          {courseOutlinesFinals.map((cotf, idx) => (
                            <tr key={cotf.syll_co_out_id} className="border-2 border-solid hover:bg-blue-100">
                              <td className="border-2 border-solid">{cotf.syll_allotted_time}</td>
                              <td className="border-2 border-solid">
                                {cotf.cos.map((co, i) => (
                                  <span key={i}>
                                    {co.syll_co_code}
                                    {i < cotf.cos.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </td>
                              <td className="border-2 border-solid">{cotf.syll_intended_learning}</td>
                              <td className="border-2 border-solid">{cotf.syll_topics}</td>
                              <td className="border-2 border-solid">{cotf.syll_suggested_readings}</td>
                              <td className="border-2 border-solid">{cotf.syll_learning_act}</td>
                              <td className="border-2 border-solid">{cotf.syll_asses_tools}</td>
                              <td className="border-2 border-solid">{cotf.syll_grading_criteria}</td>
                              <td className="border-2 border-solid">{cotf.syll_remarks}</td>
                              <td className="relative">
                                {/* Comment Modal Button Placeholder */}
                                <button className="text-blue-500 underline">Comment</button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <th colSpan={10} className="border-2 border-solid font-medium px-4">
                              FINAL EXAMINATION
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {/* Course Requirements */}
                  <tr className="crq border-2">
                    <td colSpan={2} className="border-2 border-solid font-medium">
                      <span className="text-left font-bold">IV. Course Requirements:</span>
                      <br />
                      <div className="crq" dangerouslySetInnerHTML={{ __html: syllabus.syll_course_requirements }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Signatories */}
      <div className="grid grid-cols-3 m-3">
        <div>
          <div className="flex justify-center">Prepared By:</div>
          {bLeaders.map((instructor, idx) => (
            <div className="mt-5" key={idx}>
              <div className="flex justify-center">
                {syllabus.chair_submitted_at && instructor.signature && (
                  <img
                    src={`/assets/signatures/${instructor.signature}`}
                    alt="Instructor Signature"
                    className="h-16 object-contain"
                  />
                )}
              </div>
              <div className="flex justify-center font-semibold underline mt-20 text-center">
                {`${instructor.prefix.toUpperCase()} ${instructor.firstname.toUpperCase()} ${instructor.lastname.toUpperCase()} ${instructor.suffix.toUpperCase()}`}
              </div>
              <div className="flex justify-center">Instructor</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-center">
            {syllabus.dean_submitted_at && chair.signature && (
              <img
                src={`/assets/signatures/${chair.signature}`}
                alt="Chair Signature"
                className="h-16 object-contain"
              />
            )}
          </div>
          <div className="flex justify-center">Checked and Recommended for Approval:</div>
          <div className="flex justify-center font-semibold underline mt-20 text-center">
            {syllabus.syll_chair}
          </div>
          <div className="flex justify-center">
            Chairperson, {syllabus.department_name}
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            {syllabus.dean_approved_at && dean.signature && (
              <img
                src={`/assets/signatures/${dean.signature}`}
                alt="Dean Signature"
                className="h-16 object-contain"
              />
            )}
          </div>
          <div className="flex justify-center">Approved by:</div>
          <div className="flex justify-center font-semibold underline mt-20 text-center">
            {syllabus.syll_dean}
          </div>
          <div className="flex justify-center">
            Dean, {syllabus.college_code}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllComment;