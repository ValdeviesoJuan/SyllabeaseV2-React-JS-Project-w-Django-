// SyllabusReview.tsx
import React, { useState, useEffect } from "react";
import { Checkbox, Textarea, Button } from "flowbite-react";
import dayjs from "dayjs";

interface Instructor {
  firstname: string;
  lastname: string;
  prefix: string;
  suffix?: string;
  email: string;
  phone: string;
  signature?: string;
}

interface CourseOutline {
  syll_co_out_id: number;
  syll_allotted_hour: string;
  syll_allotted_time: string;
  syll_intended_learning: string;
  syll_topics: string;
  syll_suggested_readings: string;
  syll_learning_act: string;
  syll_asses_tools: string;
  syll_grading_criteria: string;
  syll_remarks: string;
}

interface Syllabus {
  syll_id: number;
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
  course_pre_req: string;
  course_co_req: string;
  syll_ins_consultation: string;
  syll_ins_bldg_rm: string;
  syll_course_description: string;
  syll_course_requirements: string;
  chair_submitted_at?: string;
  dean_submitted_at?: string;
  dean_approved_at?: string;
  syll_chair: string;
  syll_dean: string;
  version: string;
  effectivity_date: string;
}

interface Props {
  syll: Syllabus;
  instructors: Record<number, Instructor[]>;
  chair: { signature?: string };
  dean: { signature?: string };
  courseOutlines: CourseOutline[];
  cotCos: Record<number, { syll_co_code: string }[]>;
  courseOutlinesFinals: CourseOutline[];
  cotCosF: Record<number, { syll_co_code: string }[]>;
}

const SyllabusReview: React.FC<Props> = ({
  syll,
  instructors,
  chair,
  dean,
  courseOutlines,
  cotCos,
  courseOutlinesFinals,
  cotCosF,
}) => {
  const [formValues, setFormValues] = useState<
    { yes: boolean; no: boolean; remarks: string }[]
  >([]);

  useEffect(() => {
    const initialValues = Array.from({ length: 19 }, () => ({
      yes: false,
      no: false,
      remarks: "",
    }));
    setFormValues(initialValues);
  }, []);

  const handleCheckboxChange = (
    index: number,
    field: "yes" | "no",
    checked: boolean
  ) => {
    setFormValues((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: checked,
              [field === "yes" ? "no" : "yes"]: checked ? false : item[field === "yes" ? "no" : "yes"],
            }
          : item
      )
    );
  };

  const handleRemarksChange = (index: number, value: string) => {
    setFormValues((prev) => {
      const newVals = [...prev];
      newVals[index].remarks = value;
      return newVals;
    });
  };

  const checkAllYes = () => {
    setFormValues((prev) =>
      prev.map((v) => ({ ...v, yes: true, no: false }))
    );
  };

  const submitForm = (action: "return" | "approve") => {
    console.log({ formValues, action });
    // Here you would call your API endpoint
  };

  return (
    <div className="flex mt-14">
      {/* Left: Syllabus */}
      <div className="w-1/2 overflow-auto bg-white rounded-tl-xl mr-5 h-screen">
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start space-x-2 w-7/12">
              <img
                src="/assets/ustplogo.png"
                alt="USTP Logo"
                className="w-20 mt-4"
              />
              <div>
                <h1 className="text-sm font-bold uppercase mt-3">
                  University of Science and Technology of Southern Philippines
                </h1>
                <p className="text-xs">
                  Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
                </p>
              </div>
            </div>
            <table className="text-xs border border-gray-400 text-center w-40">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th colSpan={3}>Document Code No.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="font-bold">
                    FM-USTP-ACAD-01
                  </td>
                </tr>
                <tr className="bg-blue-800 text-white">
                  <td>Rev. No.</td>
                  <td>Effective Date</td>
                  <td>Page No.</td>
                </tr>
                <tr>
                  <td>{syll.version}</td>
                  <td>{dayjs(syll.effectivity_date).format("MM.DD.YY")}</td>
                  <td>#</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Course Table / Details omitted for brevity */}
        </div>
      </div>

      {/* Right: Review Form */}
      <div className="w-1/2 bg-white border shadow-lg rounded-xl overflow-auto">
        <div className="text-center mt-5 mb-5 text-3xl font-bold">
          SYLLABUS REVIEW FORM
        </div>
        <p className="mx-5 mb-5">
          <span className="font-semibold">Directions:</span> Check the column{" "}
          <span className="font-semibold">YES</span> if an indicator is observed
          in the syllabus and check column NO if otherwise. Provide clear and
          constructive remarks that would help improve the content and alignment
          of the syllabus.
        </p>

        <div className="mx-5">
          <Button onClick={checkAllYes} color="success" className="mb-4">
            Check All Yes
          </Button>
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="p-2 w-96">INDICATORS</th>
                <th>YES</th>
                <th>NO</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {formValues.map((val, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">Indicator {idx + 1}</td>
                  <td className="text-center">
                    <Checkbox
                        checked={val.yes}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCheckboxChange(idx, "yes", e.target.checked)
                        }
                    />
                    </td>
                    <td className="text-center">
                    <Checkbox
                        checked={val.no}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCheckboxChange(idx, "no", e.target.checked)
                        }
                    />
                    </td>
                  <td>
                    <Textarea
                      value={val.remarks}
                      onChange={(e) => handleRemarksChange(idx, e.target.value)}
                      placeholder="Please input remarks here..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6 space-x-4">
            <Button color="failure" onClick={() => submitForm("return")}>
              For Revision
            </Button>
            <Button color="success" onClick={() => submitForm("approve")}>
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusReview;
