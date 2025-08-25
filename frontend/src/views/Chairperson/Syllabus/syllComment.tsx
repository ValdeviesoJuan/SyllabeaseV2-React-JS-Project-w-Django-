// SyllComment.tsx
import React from "react";
import { Button, Modal } from "flowbite-react";

interface Instructor {
  prefix?: string;
  firstname: string;
  lastname: string;
  suffix?: string;
  email?: string;
  phone?: string;
  signature?: string;
}

interface Syllabus {
  college_description: string;
  department_name: string;
  course_title: string;
  course_code: string;
  course_credit_unit: number;
  course_unit_lec: number;
  course_unit_lab: number;
  course_semester: string;
  bg_school_year: string;
  syll_class_schedule: string;
  syll_bldg_rm: string;
  course_pre_req?: string;
  course_co_req?: string;
  syll_ins_consultation?: string;
  syll_ins_bldg_rm?: string;
  syll_course_description: string;
  syll_course_requirements: string;
  chair_submitted_at?: string;
  dean_submitted_at?: string;
  dean_approved_at?: string;
  syll_chair: string;
  syll_dean: string;
  college_code?: string;
}

interface Props {
  syll: Syllabus;
  instructors: Instructor[];
  bLeaders?: Instructor[];
  chair: { signature?: string };
  dean: { signature?: string };
  programOutcomes?: any[];
  poes?: any[];
  courseOutcomes?: any[];
  copos?: any[];
  courseOutlines?: any[];
  courseOutlinesFinals?: any[];
  cotCos?: Record<number, any[]>;
  cotCosF?: Record<number, any[]>;
}

const SyllComment: React.FC<Props> = ({
  syll,
  instructors,
  bLeaders,
  chair,
  dean,
  programOutcomes = [],
  poes = [],
  courseOutcomes = [],
  copos = [],
  courseOutlines = [],
  courseOutlinesFinals = [],
  cotCos = {},
  cotCosF = {},
}) => {
  return (
    <div 
      style={{ backgroundImage: "url('/assets/Wave.png')" }} 
      className="font-thin mt-14 bg-no-repeat bg-top bg-fixed bg-contain"
    >
      {/* Finish Button */}
      <div className="flex justify-end mr-32 mb-4">
        <Button color="blue" className="w-[130px] flex items-center justify-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            viewBox="0 -0.5 25 25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z"
              stroke="#FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Finish</span>
        </Button>
      </div>

      {/* Syllabus Table */}
      <table className="mt-2 mx-auto border-2 border-solid w-10/12 font-serif text-sm bg-white">
        {/* 1st Header */}
        <tr>
          <th colSpan={2} className="font-medium border-2 border-solid px-4">
            <span className="font-bold">{syll.college_description}</span>
            <br />
            {syll.department_name}
          </th>
          <th className="font-medium border-2 border-solid text-left px-4 w-2/6">
            <span className="font-bold underline underline-offset-4">Syllabus<br /></span>
            Course Title :<span className="font-bold">{syll.course_title}<br /></span>
            Course Code: {syll.course_code}<br />
            Credits: {syll.course_credit_unit} units ({syll.course_unit_lec} hrs lecture, {syll.course_unit_lab} hrs Laboratory)
          </th>
        </tr>

        {/* 2nd Header */}
        <tr>
          <td className="border-2 border-solid font-medium text-left px-4 align-top">
            <div className="mt-2 mb-8">
              <span className="font-bold">USTP Vision<br /><br /></span>
              <p>The University is a nationally recognized Science and Technology University providing the vital link between education and the economy.</p>
            </div>

            <div className="mb-8">
              <span className="font-bold">USTP Mission<br /><br /></span>
              <ul className="list-disc ml-8">
                <li>Bring the world of work (industry) into the actual higher education and training of students;</li>
                <li>Offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization;</li>
                <li>Contribute significantly to the National Development Goals of food security and energy sufficiency through technological solutions.</li>
              </ul>
            </div>

            <div className="mb-8">
              <span className="font-bold">Program Educational Objectives<br /><br /></span>
              {poes.map((poe, index) => (
                <p key={index}><span className="font-semibold">{poe.poe_code}: </span>{poe.poe_description}</p>
              ))}
            </div>

            <div className="mb-8">
              <span className="font-bold">Program Outcomes<br /><br /></span>
              {programOutcomes.map((po, index) => (
                <p key={index}><span className="font-semibold">{po.po_letter}: </span>{po.po_description}</p>
              ))}
            </div>

            {/* Course Codes Table */}
            <table className="table-auto border-2 mb-5 mx-auto">
              <thead>
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
              </tbody>
            </table>
          </td>

          <td colSpan={2} className="align-top">
            <table className="my-4 mx-2 w-full">
              <tr>
                <td className="border-2 border-solid font-medium text-left px-4 w-1/2">
                  Semester/Year: {syll.course_semester} SY{syll.bg_school_year}<br />
                  Class Schedule: {syll.syll_class_schedule}<br />
                  Bldg./Rm. No. {syll.syll_bldg_rm}
                </td>
                <td className="border-2 border-solid font-medium text-left px-4 relative">
                  Pre-requisite(s): {syll.course_pre_req} <br />
                  Co-requisite(s): {syll.course_co_req}
                </td>
              </tr>
              <tr>
                <td className="border-2 border-solid font-medium text-left px-4">
                  Instructor: {instructors.map((i, idx) => (
                    <span key={idx}>
                      {i.firstname} {i.lastname}{idx < instructors.length - 1 ? ", " : ""}
                    </span>
                  ))}<br />
                  Email: {instructors.map((i) => i.email).join(", ")}<br />
                  Phone: {instructors.map((i) => i.phone).join(", ")}
                </td>
                <td className="border-2 border-solid font-medium text-left px-4">
                  Consultation Schedule: {syll.syll_ins_consultation}<br />
                  Bldg rm no: {syll.syll_ins_bldg_rm}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border-2 border-solid font-medium text-left px-4">
                  <span className="font-bold">I. Course Description:</span><br />
                  {syll.syll_course_description}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      {/* Signatures */}
      <div className="grid grid-cols-3 gap-4 m-3">
        {/* Prepared By */}
        <div className="text-center">
          <div>Prepared By:</div>
          {bLeaders?.map((leader, idx) => (
            <div key={idx} className="mt-5">
              {syll.chair_submitted_at && leader.signature && (
                <img src={`/assets/signatures/${leader.signature}`} alt="Instructor Signature" className="h-16 object-contain mx-auto"/>
              )}
              <div className="font-semibold underline mt-20">{leader.prefix} {leader.firstname} {leader.lastname} {leader.suffix}</div>
              <div>Instructor</div>
            </div>
          ))}
        </div>

        {/* Chair */}
        <div className="text-center">
          {syll.dean_submitted_at && chair.signature && (
            <img src={`/assets/signatures/${chair.signature}`} alt="Chair Signature" className="h-16 object-contain mx-auto"/>
          )}
          <div>Checked and Recommended for Approval:</div>
          <div className="font-semibold underline mt-20">{syll.syll_chair}</div>
          <div>Chairperson, {syll.department_name}</div>
        </div>

        {/* Dean */}
        <div className="text-center">
          {syll.dean_approved_at && dean.signature && (
            <img src={`/assets/signatures/${dean.signature}`} alt="Dean Signature" className="h-16 object-contain mx-auto"/>
          )}
          <div>Approved By:</div>
          <div className="font-semibold underline mt-20">{syll.syll_dean}</div>
          <div>Dean, {syll.college_code}</div>
        </div>
      </div>
    </div>
  );
};

export default SyllComment;
