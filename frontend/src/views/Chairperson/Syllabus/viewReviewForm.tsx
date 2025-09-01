import React from "react";

// Mocked review form data (replace with backend API when available)
const reviewForm = {
  version: 1,
  effectivity_date: "2025-08-27",
  srf_course_code: "CS101",
  srf_sem_year: "1st Sem, 2025-2026",
  srf_title: "Introduction to Programming",
  srf_faculty: "Juan Dela Cruz",
};

// Mocked review indicators (replace with backend API when available)
const reviewIndicators = [
  {
    part: "PART I. BASIC SYLLABUS INFORMATION",
    items: [
      {
        label:
          "1. The syllabus follows the prescribed OBE syllabus format of the University and include the following:",
        yes: true,
        no: false,
        remarks: "Format followed.",
      },
      {
        label:
          "• Name of the College/Campus is indicated below the University name/brand.",
        yes: true,
        no: false,
        remarks: "College indicated.",
      },
      {
        label:
          "• Program, Course Title, Course Code and Unit Credits are specified in the syllabus.",
        yes: false,
        no: true,
        remarks: "Unit credits missing.",
      },
      {
        label: "• Pre-requisites and co-requisites are indicated.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label:
          "• Semester, Academic Year, Schedule of Course, Building and Room Number are stipulated in the syllabus.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label:
          "• Contact details of the instructor such as the instructor’s name, email address OR mobile number (optional) are specified in the syllabus.",
        yes: false,
        no: true,
        remarks: "No email provided.",
      },
      {
        label:
          "• Instructor’s consultation schedules, oﬃce or consultation venue, oﬃce phone number is indicated in the syllabus.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label:
          "• The University’s Vision and Mission are indicated in the syllabus.",
        yes: true,
        no: false,
        remarks: "",
      },
    ],
  },
  {
    part: "",
    items: [
      {
        label:
          "2. The course description stipulates its relevance to the curriculum in general and provides an overview of the course content.",
        yes: true,
        no: false,
        remarks: "",
      },
    ],
  },
  {
    part: "PART II. PROGRAM EDUCATIONAL OBJECTIVES (or General Outcomes for Gen Ed courses)",
    items: [
      {
        label:
          "3. The Approved Program Educational Objectives (PEO) and Program Outcomes (PO) are listed with alphabets in the syllabus (which will be referred to in the mapping of the course outcomes).",
        yes: true,
        no: false,
        remarks: "",
      },
    ],
  },
  {
    part: "PART III.",
    items: [
      {
        label:
          "4. The course outcomes are measurable and aligned with the course description and program outcomes.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label:
          "5. The course outcomes are mapped accordingly to the program outcomes/GELOs using the markers: i - introductory, e - enabling, and d - demonstrative.",
        yes: false,
        no: true,
        remarks: "Mapping not clear.",
      },
    ],
  },
  {
    part: "PART IV.",
    items: [
      {
        label: "6. The course outline indicates the number of hours.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label: "7. Topics are assigned to intended learning outcomes (ILO).",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label: "8. Suggested readings are provided.",
        yes: false,
        no: true,
        remarks: "No readings listed.",
      },
      {
        label: "9. The Teaching-Learning Activities (TLAs) are indicated in the outline.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label: "10. Assessment tools are indicated.",
        yes: true,
        no: false,
        remarks: "",
      },
      {
        label: "11. Rubrics are attached for all outputs/requirements.",
        yes: false,
        no: true,
        remarks: "Rubrics missing.",
      },
      {
        label: "12. The grading criteria are clearly stated in the syllabus.",
        yes: true,
        no: false,
        remarks: "",
      },
    ],
  },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });
};

const ViewReviewForm: React.FC = () => {
  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        backgroundImage: "url('/assets/wave.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        backgroundColor: "#f9fafb",
      }}
    >
      <div className="mt-24 flex flex-col border border-gray-300 justify-center bg-white bg-opacity-100 rounded-lg font-sans pb-10 shadow-lg w-[1100px]">
        {/* Header Section */}
        <div className="flex mt-5 justify-center items-center">
          <div className="w-full bg-white">
            <div className="flex justify-center items-start mb-4">
              <div className="flex justify-between items-start w-full max-w-5xl">
                {/* LEFT: Logo + Campus Info */}
                <div className="flex items-start space-x-2 w-[70%]">
                  {/* Logo */}
                  <div className="w-20 ml-6 mt-4">
                    <img src="/assets/ustplogo.png" alt="USTP Logo" className="w-full h-auto" />
                  </div>
                  {/* Text block */}
                  <div>
                    <h1 className="text-sm font-bold uppercase leading-tight ml-9 mt-[40px]">
                      University of Science and Technology of Southern Philippines
                    </h1>
                    <p className="text-xs leading-snug ml-9">
                      Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
                    </p>
                  </div>
                </div>
                {/* RIGHT: Document Info Table */}
                <table className="text-[10px] text-center border border-gray-400 w-40 mt-[25px]">
                  <thead>
                    <tr className="bg-[#5A6E99] text-white">
                      <th colSpan={3} className="border border-gray-400 px-1 py-[2px] font-semibold">
                        Document Code No.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="border border-gray-400 py-[2px] text-[11px] font-bold text-gray-700">
                        FM-USTP-ACAD-12
                      </td>
                    </tr>
                    <tr className="bg-[#5A6E99] text-white">
                      <td className="border border-gray-400 px-1 py-[2px]">Rev. No.</td>
                      <td className="border border-gray-400 px-1 py-[2px]">Effective Date</td>
                      <td className="border border-gray-400 px-1 py-[2px]">Page No.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-2 py-[2px]">{reviewForm.version}</td>
                      <td className="border border-gray-400 px-2 py-[2px]">{formatDate(reviewForm.effectivity_date)}</td>
                      <td className="border border-gray-400 px-1 py-[2px]">#</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Title Section */}
            <div className="text-3xl font-bold text-center mb-5 mt-2">
              SYLLABUS REVIEW FORM
            </div>
          </div>
        </div>
        {/* Course Info */}
        <div className="grid grid-cols-2 grid-rows-2 mb-6 gap-y-2 px-10">
          <div>
            <span className="font-bold">Course Code: </span>
            <span>{reviewForm.srf_course_code}</span>
          </div>
          <div>
            <span className="font-bold">Sem and Year: </span>
            <span>{reviewForm.srf_sem_year}</span>
          </div>
          <div>
            <span className="font-bold">Descriptive Title: </span>
            <span>{reviewForm.srf_title}</span>
          </div>
          <div>
            <span className="font-bold">Faculty: </span>
            <span>{reviewForm.srf_faculty}</span>
          </div>
        </div>
        {/* Directions */}
        <div className="w-[900px] mx-auto">
          <div className="mb-4">
            <p>
              <span className="font-semibold">Directions:</span> Check the column <span className="font-semibold">YES</span> if an indicator is observed in the syllabus and check column NO if otherwise. Provide clear and constructive remarks that would help improve the content and alignment of the syllabus.
            </p>
          </div>
          {/* Review Table */}
          <table className="w-full border border-gray-400 text-sm" id="review_form_table">
            <thead>
              <tr>
                <th className="w-[600px] border border-gray-400 px-2 py-2">Indicators</th>
                <th className="w-[100px] border border-gray-400 px-2 py-2">Yes</th>
                <th className="w-[100px] border border-gray-400 px-2 py-2">No</th>
                <th className="w-[200px] border border-gray-400 px-2 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {reviewIndicators.map((section, idx) => (
                <React.Fragment key={idx}>
                  {section.part && (
                    <tr>
                      <td colSpan={4} className="font-semibold bg-gray-100 border border-gray-400 px-2 py-2">
                        {section.part}
                      </td>
                    </tr>
                  )}
                  {section.items.map((item, i) => (
                    <tr key={i}>
                      <td className="border border-gray-400 px-2 py-2">{item.label}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">
                        {item.yes ? <span className="text-green-600 font-bold text-lg">&#10003;</span> : ""}
                      </td>
                      <td className="border border-gray-400 px-2 py-2 text-center">
                        {item.no ? <span className="text-red-600 font-bold text-lg">&#10007;</span> : ""}
                      </td>
                      <td className="border border-gray-400 px-2 py-2">{item.remarks}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewReviewForm;