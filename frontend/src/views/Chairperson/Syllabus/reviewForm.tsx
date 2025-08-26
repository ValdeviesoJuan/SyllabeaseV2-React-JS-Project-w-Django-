import React, { useState } from "react";
import { Button, Textarea } from "flowbite-react";
import ustpLogo from "../../../assets/ustplogo.png"; // adjust path as needed

// Types
type ReviewItem = {
  id: number;
  indicator: string;
  remarks: string;
  checked: "yes" | "no" | null;
  requiredRemarks?: boolean;
};

const initialReviewItems: ReviewItem[] = [
  {
    id: 1,
    indicator:
      "The syllabus follows the prescribed OBE syllabus format of the University and include the following:",
    remarks: "",
    checked: null,
  },
  {
    id: 2,
    indicator:
      "• Name of the College/Campus is indicated below the University name/brand.",
    remarks: "",
    checked: null,
  },
  {
    id: 3,
    indicator:
      "• Program, Course Title, Course Code and Unit Credits are specified in the syllabus.",
    remarks: "",
    checked: null,
  },
  {
    id: 4,
    indicator: "• Pre-requisites and co-requisites are indicated.",
    remarks: "",
    checked: null,
  },
  {
    id: 5,
    indicator:
      "• Semester, Academic Year, Schedule of Course, Building and Room Number are stipulated in the syllabus.",
    remarks: "",
    checked: null,
  },
  {
    id: 6,
    indicator:
      "• Contact details of the instructor such as the instructor’s name, email address OR mobile number (optional) are specified in the syllabus.",
    remarks: "",
    checked: null,
  },
  {
    id: 7,
    indicator:
      "• Instructor’s consultation schedules, oﬃce or consultation venue, oﬃce phone number is indicated in the syllabus.",
    remarks: "",
    checked: null,
  },
  {
    id: 8,
    indicator: "• The University’s Vision and Mission are indicated in the syllabus.",
    remarks: "",
    checked: null,
  },
  {
    id: 9,
    indicator:
      "The course description stipulates its relevance to the curriculum in general and provides an overview of the course content.",
    remarks: "",
    checked: null,
  },
  {
    id: 10,
    indicator:
      "The Approved Program Educational Objectives (PEO) and Program Outcomes (PO) are listed with alphabets in the syllabus (which will be referred to in the mapping of the course outcomes).",
    remarks: "",
    checked: null,
  },
  {
    id: 11,
    indicator:
      "The course outcomes are measurable and aligned with the course description and program outcomes.",
    remarks: "",
    checked: null,
  },
  {
    id: 12,
    indicator:
      "The course outcomes are mapped accordingly to the program outcomes/GELOs using the markers: i - introductory, e - enabling, and d - demonstrative.",
    remarks: "",
    checked: null,
  },
  {
    id: 13,
    indicator: "The course outline indicates the number of hours.",
    remarks: "",
    checked: null,
  },
  {
    id: 14,
    indicator: "Topics are assigned to intended learning outcomes (ILO).",
    remarks: "",
    checked: null,
  },
  {
    id: 15,
    indicator: "Suggested readings are provided.",
    remarks: "",
    checked: null,
  },
  {
    id: 16,
    indicator: "The Teaching-Learning Activities (TLAs) are indicated in the outline.",
    remarks: "",
    checked: null,
  },
  {
    id: 17,
    indicator: "Assessment tools are indicated.",
    remarks: "",
    checked: null,
  },
  {
    id: 18,
    indicator: "Rubrics are attached for all outputs/requirements.",
    remarks: "",
    checked: null,
  },
  {
    id: 19,
    indicator: "The grading criteria are clearly stated in the syllabus.",
    remarks: "",
    checked: null,
  },
];

// Mocked syllabus info (replace with props or API)
const syllabusInfo = {
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
  syll_course_requirements: "Attendance, Exams, Projects",
  chair_submitted_at: null,
  dean_submitted_at: null,
  dean_approved_at: null,
  syll_chair: "Chair Name",
  syll_dean: "Dean Name",
};

const ReviewForm: React.FC = () => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(initialReviewItems);
  const [submitAction, setSubmitAction] = useState<"approve" | "return">("return");
  const [formError, setFormError] = useState<string | null>(null);

  // Check all YES
  const handleCheckAllYes = () => {
    setReviewItems((items) =>
      items.map((item) => ({ ...item, checked: "yes" }))
    );
  };

  // Checkbox change
  const handleCheckboxChange = (index: number, value: "yes" | "no") => {
    setReviewItems((items) =>
      items.map((item, idx) =>
        idx === index ? { ...item, checked: value } : item
      )
    );
  };

  // Remarks change
  const handleRemarksChange = (index: number, value: string) => {
    setReviewItems((items) =>
      items.map((item, idx) =>
        idx === index ? { ...item, remarks: value } : item
      )
    );
  };

  // Form validation
  const validateForm = () => {
    for (const item of reviewItems) {
      if (item.checked === "no" && item.remarks.trim() === "") {
        return false;
      }
    }
    return true;
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      setFormError('Please provide remarks for all items marked as "No".');
      return;
    }

    // TODO: Integrate with backend API
    alert(
      submitAction === "approve"
        ? "Syllabus Approved! (No backend yet)"
        : "Returned for Revision! (No backend yet)"
    );
  };

  // Show Approve button only if all YES and no NOs
  const allYesChecked =
    reviewItems.length > 0 &&
    reviewItems.every((item) => item.checked === "yes");
  const anyNoChecked = reviewItems.some((item) => item.checked === "no");

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
      {/* Syllabus Preview */}
      <div className="w-full md:w-1/2 p-4 overflow-auto bg-white rounded-tl-xl">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-2 w-[70%]">
            <div className="w-20 ml-6 mt-4">
              <img src={ustpLogo} alt="USTP Logo" className="w-full h-auto" />
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase leading-tight ml-6 mt-2">
                University of Science and Technology of Southern Philippines
              </h1>
              <p className="text-xs leading-snug ml-6">
                Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
              </p>
            </div>
          </div>
          <table className="text-[10px] text-center border border-gray-400 w-40">
            <thead>
              <tr className="bg-[#5A6E99] text-white">
                <th colSpan={3} className="border border-gray-400 px-1 py-1 font-semibold">
                  Document Code No.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="border border-gray-400 py-1 text-[11px] font-bold text-gray-700">
                  FM-USTP-ACAD-01
                </td>
              </tr>
              <tr className="bg-[#5A6E99] text-white">
                <td className="border border-gray-400 px-1 py-1">Rev. No.</td>
                <td className="border border-gray-400 px-1 py-1">Effective Date</td>
                <td className="border border-gray-400 px-1 py-1">Page No.</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-1 py-1">{syllabusInfo.version}</td>
                <td className="border border-gray-400 px-1 py-1">
                  {new Date(syllabusInfo.effectivity_date).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-1 py-1">#</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Syllabus Table */}
        <table className="mt-2 mx-auto border-2 border-solid w-10/12 font-serif text-sm bg-white">
          <tbody>
            <tr>
              <th className="font-medium border-2 border-solid px-4">
                <span className="font-bold">{syllabusInfo.college_description}</span>
                <br />
                {syllabusInfo.department_name}
              </th>
              <th className="font-medium border-2 border-solid text-left px-4 w-2/6">
                <span className="font-bold underline underline-offset-4">Syllabus<br /></span>
                Course Title :<span className="font-bold">{syllabusInfo.course_title}<br /></span>
                Course Code: {syllabusInfo.course_code}<br />
                Credits: {syllabusInfo.course_credit_unit} units ({syllabusInfo.course_unit_lec} hours lecture, {syllabusInfo.course_unit_lab} hrs Laboratory)<br />
              </th>
            </tr>
            {/* ...You can continue to add the rest of the syllabus preview here as needed... */}
          </tbody>
        </table>
      </div>
      {/* Review Form */}
      <div className="w-full md:w-1/2 p-4 flex flex-col border border-gray-300 bg-white rounded-xl shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-2 w-[70%]">
            <div className="w-20 ml-6 mt-4">
              <img src={ustpLogo} alt="USTP Logo" className="w-full h-auto" />
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase leading-tight ml-6 mt-2">
                University of Science and Technology of Southern Philippines
              </h1>
              <p className="text-xs leading-snug ml-6">
                Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
              </p>
            </div>
          </div>
          <table className="text-[10px] text-center border border-gray-400 w-40">
            <thead>
              <tr className="bg-[#5A6E99] text-white">
                <th colSpan={3} className="border border-gray-400 px-1 py-1 font-semibold">
                  Document Code No.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="border border-gray-400 py-1 text-[11px] font-bold text-gray-700">
                  FM-USTP-ACAD-12
                </td>
              </tr>
              <tr className="bg-[#5A6E99] text-white">
                <td className="border border-gray-400 px-1 py-1">Rev. No.</td>
                <td className="border border-gray-400 px-1 py-1">Effective Date</td>
                <td className="border border-gray-400 px-1 py-1">Page No.</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-1 py-1">{syllabusInfo.version}</td>
                <td className="border border-gray-400 px-1 py-1">
                  {new Date(syllabusInfo.effectivity_date).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-1 py-1">#</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-5">
          <div className="text-3xl font-bold mb-5 mt-5">SYLLABUS REVIEW FORM</div>
        </div>
        <div className="mb-5">
          <span className="font-semibold">Directions:</span> Check the column <span className="font-semibold">YES</span> if an indicator is observed in the syllabus and check column NO if otherwise. Provide clear and constructive remarks that would help improve the content and alignment of the syllabus.
        </div>
        <div className="flex justify-end mb-4">
          <Button color="success" size="sm" onClick={handleCheckAllYes}>
            Check All Yes
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <table className="w-full border text-sm" id="review_form_table">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="w-[600px] p-4">INDICATORS</th>
                <th>YES</th>
                <th>NO</th>
                <th className="w-[200px]">REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {/* PART I */}
              <tr>
                <td colSpan={4} className="font-bold bg-gray-100">
                  PART I. BASIC SYLLABUS INFORMATION
                </td>
              </tr>
              {reviewItems.slice(0, 8).map((item, idx) => (
                <tr key={item.id} className="review-row border-b">
                  <td>{idx + 1}. {item.indicator}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.checked === "yes"}
                      onChange={() => handleCheckboxChange(idx, "yes")}
                      className="h-5 w-5 accent-green-500"
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.checked === "no"}
                      onChange={() => handleCheckboxChange(idx, "no")}
                      className="h-5 w-5 accent-red-500"
                    />
                  </td>
                  <td>
                    <Textarea
                      value={item.remarks}
                      onChange={(e) => handleRemarksChange(idx, e.target.value)}
                      placeholder="Please input remarks here..."
                      color={item.checked === "no" && item.remarks.trim() === "" ? "failure" : undefined}
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
              {/* PART II */}
              <tr>
                <td colSpan={4} className="font-bold bg-gray-100">
                  PART II. PROGRAM EDUCATIONAL OBJECTIVES (or General Outcomes for Gen Ed courses)
                </td>
              </tr>
              <tr className="review-row border-b">
                <td>9. {reviewItems[8].indicator}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={reviewItems[8].checked === "yes"}
                    onChange={() => handleCheckboxChange(8, "yes")}
                    className="h-5 w-5 accent-green-500"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={reviewItems[8].checked === "no"}
                    onChange={() => handleCheckboxChange(8, "no")}
                    className="h-5 w-5 accent-red-500"
                  />
                </td>
                <td>
                  <Textarea
                    value={reviewItems[8].remarks}
                    onChange={(e) => handleRemarksChange(8, e.target.value)}
                    placeholder="Please input remarks here..."
                    color={reviewItems[8].checked === "no" && reviewItems[8].remarks.trim() === "" ? "failure" : undefined}
                    rows={2}
                  />
                </td>
              </tr>
              {/* PART III */}
              <tr>
                <td colSpan={4} className="font-bold bg-gray-100">
                  PART III. COURSE OUTCOMES
                </td>
              </tr>
              {reviewItems.slice(9, 12).map((item, idx) => (
                <tr key={item.id} className="review-row border-b">
                  <td>{item.id}. {item.indicator}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.checked === "yes"}
                      onChange={() => handleCheckboxChange(idx + 9, "yes")}
                      className="h-5 w-5 accent-green-500"
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.checked === "no"}
                      onChange={() => handleCheckboxChange(idx + 9, "no")}
                      className="h-5 w-5 accent-red-500"
                    />
                  </td>
                  <td>
                    <Textarea
                      value={item.remarks}
                      onChange={(e) => handleRemarksChange(idx + 9, e.target.value)}
                      placeholder="Please input remarks here..."
                      color={item.checked === "no" && item.remarks.trim() === "" ? "failure" : undefined}
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
              {/* PART IV */}
              <tr>
                <td colSpan={4} className="font-bold bg-gray-100">
                  PART IV. COURSE OUTLINE
                </td>
              </tr>
              {reviewItems.slice(12).map((item, idx) => (
                <tr key={item.id} className="review-row border-b">
                  <td>{item.id}. {item.indicator}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.checked === "yes"}
                      onChange={() => handleCheckboxChange(idx + 12, "yes")}
                      className="h-5 w-5 accent-green-500"
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.checked === "no"}
                      onChange={() => handleCheckboxChange(idx + 12, "no")}
                      className="h-5 w-5 accent-red-500"
                    />
                  </td>
                  <td>
                    <Textarea
                      value={item.remarks}
                      onChange={(e) => handleRemarksChange(idx + 12, e.target.value)}
                      placeholder="Please input remarks here..."
                      color={item.checked === "no" && item.remarks.trim() === "" ? "failure" : undefined}
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {formError && (
            <div className="text-red-600 mt-2">{formError}</div>
          )}
          <div className="mt-10 flex space-x-4 justify-center items-center">
            {!anyNoChecked && allYesChecked && (
              <Button
                color="success"
                className="w-[150px] h-14"
                type="submit"
                onClick={() => setSubmitAction("approve")}
              >
                <span className="flex items-center space-x-2">
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#31a858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Approve</span>
                </span>
              </Button>
            )}
            {(anyNoChecked || !allYesChecked) && (
              <Button
                color="failure"
                className="w-[150px] h-14"
                type="submit"
                onClick={() => setSubmitAction("return")}
              >
                <span className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 64 64" strokeWidth="5" stroke="#fb6a5e" fill="none">
                    <path d="M54.89,26.73A23.52,23.52,0,0,1,15.6,49" strokeLinecap="round" />
                    <path d="M9,37.17a23.75,23.75,0,0,1-.53-5A23.51,23.51,0,0,1,48.3,15.2" strokeLinecap="round" />
                    <polyline points="37.73 16.24 48.62 15.44 47.77 5.24" strokeLinecap="round" />
                    <polyline points="25.91 47.76 15.03 48.56 15.88 58.76" strokeLinecap="round" />
                  </svg>
                  <span>For Revision</span>
                </span>
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;