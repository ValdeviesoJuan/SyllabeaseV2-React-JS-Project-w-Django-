import React from "react";

type YesNo = "yes" | "no";

interface ReviewFormMeta {
  version: string | number;
  effectivityDate: string; // already formatted string like "09.03.25"
}

interface CourseInfo {
  courseCode: string;
  semYear: string;
  title: string;
  faculty: string;
}

interface ReviewItem {
  id: number;
  text: string;
  yesNo: YesNo;
  remarks: string;
  isBullet?: boolean; // for the "• ..." lines
}

const meta: ReviewFormMeta = {
  version: "1", // originally: {{$reviewForm->version}}
  effectivityDate: "09.03.25", // originally: Carbon format
};

const courseInfo: CourseInfo = {
  courseCode: "CS101", // {{$reviewForm->srf_course_code}}
  semYear: "1st Sem AY 2025-2026", // {{$reviewForm->srf_sem_year}}
  title: "Introduction to Programming", // {{$reviewForm->srf_title}}
  faculty: "Prof. John Doe", // {{$reviewForm->srf_faculty}}
};

// Mirrors your Blade rows srf1..srf19
const itemsPartI: ReviewItem[] = [
  {
    id: 1,
    text:
      "1. The syllabus follows the prescribed OBE syllabus format of the University and include the following:",
    yesNo: "yes",
    remarks: "Complete",
  },
  {
    id: 2,
    text:
      "• Name of the College/Campus is indicated below the University name/brand.",
    yesNo: "no",
    remarks: "Add campus line under brand",
    isBullet: true,
  },
  {
    id: 3,
    text:
      "• Program, Course Title, Course Code and Unit Credits are specified in the syllabus.",
    yesNo: "yes",
    remarks: "OK",
    isBullet: true,
  },
  {
    id: 4,
    text: "• Pre-requisites and co-requisites are indicated.",
    yesNo: "yes",
    remarks: "OK",
    isBullet: true,
  },
  {
    id: 5,
    text:
      "• Semester, Academic Year, Schedule of Course, Building and Room Number are stipulated in the syllabus.",
    yesNo: "yes",
    remarks: "OK",
    isBullet: true,
  },
  {
    id: 6,
    text:
      "• Contact details of the instructor such as the instructor’s name, email address OR mobile number (optional) are specified in the syllabus.",
    yesNo: "no",
    remarks: "Include email/phone",
    isBullet: true,
  },
  {
    id: 7,
    text:
      "• Instructor’s consultation schedules, office or consultation venue, office phone number is indicated in the syllabus.",
    yesNo: "yes",
    remarks: "OK",
    isBullet: true,
  },
  {
    id: 8,
    text:
      "• The University’s Vision and Mission are indicated in the syllabus.",
    yesNo: "no",
    remarks: "Add VM section",
    isBullet: true,
  },
];

const itemsPartII: ReviewItem[] = [
  {
    id: 9,
    text:
      "2. The course description stipulates its relevance to the curriculum in general and provides an overview of the course content.",
    yesNo: "yes",
    remarks: "Clear and concise",
  },
  {
    id: 10,
    text:
      "3. The Approved Program Educational Objectives (PEO) and Program Outcomes (PO) are listed with alphabets in the syllabus (which will be referred to in the mapping of the course outcomes).",
    yesNo: "yes",
    remarks: "Listed A–K",
  },
];

const itemsPartIII: ReviewItem[] = [
  {
    id: 11,
    text:
      "4. The course outcomes are measurable and aligned with the course description and program outcomes.",
    yesNo: "yes",
    remarks: "Measurable",
  },
  {
    id: 12,
    text:
      "5. The course outcomes are mapped accordingly to the program outcomes/GELOs using the markers: i - introductory, e - enabling, and d - demonstrative.",
    yesNo: "no",
    remarks: "Add mapping legend (i/e/d)",
  },
];

const itemsPartIV: ReviewItem[] = [
  {
    id: 13,
    text: "6. The course outline indicates the number of hours.",
    yesNo: "yes",
    remarks: "Shown per topic",
  },
  {
    id: 14,
    text: "7. Topics are assigned to intended learning outcomes (ILO).",
    yesNo: "yes",
    remarks: "OK",
  },
  {
    id: 15,
    text: "8. Suggested readings are provided.",
    yesNo: "no",
    remarks: "Add 3–5 core texts",
  },
  {
    id: 16,
    text:
      "9. The Teaching-Learning Activities (TLAs) are indicated in the outline.",
    yesNo: "yes",
    remarks: "OK",
  },
  {
    id: 17,
    text: "10. Assessment tools are indicated.",
    yesNo: "yes",
    remarks: "Quizzes, Lab, Finals",
  },
  {
    id: 18,
    text: "11. Rubrics are attached for all outputs/requirements.",
    yesNo: "no",
    remarks: "Attach lab/project rubrics",
  },
  {
    id: 19,
    text: "12. The grading criteria are clearly stated in the syllabus.",
    yesNo: "yes",
    remarks: "60/40 split",
  },
];

const ReviewForm: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/assets/wave.png)" }}
    >
      <div className="flex justify-center">
        <div className="mt-24 flex flex-col border border-gray-300 bg-white bg-opacity-100 rounded-lg font-sans pb-10 shadow-md">
          <div className="justify-center items-center mx-10">
            <div className="flex mt-5 justify-center items-center">
              {/* HEADER SECTION */}
              <div className="w-full bg-white">
                {/* Outer container for header */}
                <div className="flex justify-center items-start mb-4">
                  <div className="flex justify-between items-start w-full max-w-5xl">
                    {/* LEFT: Logo + Campus Info */}
                    <div className="flex items-start space-x-2 w-[70%]">
                      {/* Logo */}
                      <div className="w-20 ml-6 mt-4">
                        <img
                          src="/assets/ustplogo.png"
                          alt="USTP Logo"
                          className="w-full h-auto"
                        />
                      </div>
                      {/* Text block */}
                      <div>
                        <h1 className="text-sm font-bold uppercase leading-tight ml-9 mt-[40px]">
                          University of Science and Technology of Southern
                          Philippines
                        </h1>
                        <p className="text-xs leading-snug ml-9">
                          Alubijid | Balubal | Cagayan de Oro | Claveria |
                          Jasaan | Oroquieta | Panaon | Villanueva
                        </p>
                      </div>
                    </div>

                    {/* RIGHT: Document Info Table */}
                    <table className="text-[10px] text-center border border-gray-400 w-40 mt-[25px]">
                      <thead>
                        <tr className="bg-[#5A6E99] text-white">
                          <th
                            colSpan={3}
                            className="border border-gray-400 px-1 py-[2px] font-semibold"
                          >
                            Document Code No.
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={3}
                            className="border border-gray-400 py-[2px] text-[11px] font-bold text-gray-700"
                          >
                            FM-USTP-ACAD-12
                          </td>
                        </tr>
                        <tr className="bg-[#5A6E99] text-white">
                          <td className="border border-gray-400 px-1 py-[2px]">
                            Rev. No.
                          </td>
                          <td className="border border-gray-400 px-1 py-[2px]">
                            Effective Date
                          </td>
                          <td className="border border-gray-400 px-1 py-[2px]">
                            Page No.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 px-1 py-[2px]">
                            {meta.version}
                          </td>
                          <td className="border border-gray-400 px-1 py-[2px]">
                            {meta.effectivityDate}
                          </td>
                          <td className="border border-gray-400 px-1 py-[2px]">
                            #
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Title Section (centered) */}
                <div className="text-3xl font-bold text-center mb-5 mt-2">
                  SYLLABUS REVIEW FORM
                </div>
              </div>
            </div>

            {/* Course Info Grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-y-2 mb-6">
              <div>
                <span className="font-bold">Course Code: </span>
                <span>{courseInfo.courseCode}</span>
              </div>
              <div>
                <span className="font-bold">Sem and Year: </span>
                <span>{courseInfo.semYear}</span>
              </div>
              <div>
                <span className="font-bold">Descriptive Title: </span>
                <span>{courseInfo.title}</span>
              </div>
              <div>
                <span className="font-bold">Faculty: </span>
                <span>{courseInfo.faculty}</span>
              </div>
            </div>

            {/* Directions + Review Table */}
            <div className="w-[900px] bg-white bg-opacity-100">
              <div className="mb-4">
                <p>
                  <span className="font-semibold">Directions:</span> Check the
                  column <span className="font-semibold">YES</span> if an
                  indicator is observed in the syllabus and check column NO if
                  otherwise. Provide clear and constructive remarks that would
                  help improve the content and alignment of the syllabus.
                </p>
              </div>

              {/* Review Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm" id="review_form_table">
                  <thead>
                    <tr>
                      <th className="w-[600px] border px-3 py-2 text-left">
                        Indicators
                      </th>
                      <th className="w-[100px] border px-3 py-2">Yes</th>
                      <th className="w-[100px] border px-3 py-2">No</th>
                      <th className="w-[200px] border px-3 py-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* PART I */}
                    <tr>
                      <td className="border px-3 py-2 font-semibold" colSpan={4}>
                        PART I. BASIC SYLLABUS INFORMATION
                      </td>
                    </tr>
                    {itemsPartI.map((item) => (
                      <tr key={item.id}>
                        {/* Hidden input replaced by react data model */}
                        <td className={`border px-3 py-2 ${item.isBullet ? "pl-6" : ""}`}>
                          {item.text}
                        </td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "yes" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "no" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2">{item.remarks}</td>
                      </tr>
                    ))}

                    {/* PART II */}
                    <tr>
                      <td className="border px-3 py-2 font-semibold" colSpan={4}>
                        PART II. PROGRAM EDUCATIONAL OBJECTIVES (or General Outcomes for Gen Ed courses)
                      </td>
                    </tr>
                    {itemsPartII.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-3 py-2">{item.text}</td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "yes" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "no" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2">{item.remarks}</td>
                      </tr>
                    ))}

                    {/* PART III */}
                    <tr>
                      <td className="border px-3 py-2 font-semibold" colSpan={4}>
                        PART III.
                      </td>
                    </tr>
                    {itemsPartIII.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-3 py-2">{item.text}</td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "yes" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "no" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2">{item.remarks}</td>
                      </tr>
                    ))}

                    {/* PART IV */}
                    <tr>
                      <td className="border px-3 py-2 font-semibold" colSpan={4}>
                        PART IV.
                      </td>
                    </tr>
                    {itemsPartIV.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-3 py-2">{item.text}</td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "yes" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2 text-center align-middle">
                          {item.yesNo === "no" ? "/" : ""}
                        </td>
                        <td className="border px-3 py-2">{item.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* (Optional) Footer or buttons could go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
