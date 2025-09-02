import React, { useMemo, useState } from "react";
import { Modal, Button, Checkbox } from "flowbite-react";

// ---------- Types ----------
export type YesNo = "yes" | "no";

export interface SRF {
  srf_yes_no: YesNo;
  srf_remarks?: string | null;
}

export interface Syllabus {
  syll_id: number;
  version: string | number;
  effectivity_date: string; // ISO string
  college_description: string;
  department_name: string;
  course_title: string;
  course_code: string;
  course_credit_unit: number | string;
  course_unit_lec: number | string;
  course_unit_lab: number | string;
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
  chair_submitted_at?: string | null;
  dean_submitted_at?: string | null;
  dean_approved_at?: string | null;
  syll_chair: string;
  syll_dean: string;
}

export interface Person {
  prefix?: string | null;
  firstname: string;
  lastname: string;
  suffix?: string | null;
  email?: string | null;
  phone?: string | null;
  signature?: string | null;
}

export interface POE {
  poe_code: string;
  poe_description: string;
}

export interface ProgramOutcome {
  po_letter: string;
  po_description: string;
}

export interface Props {
  syll: Syllabus;
  instructors: Person[];
  bLeaders: Person[];
  chair: Person;
  dean: Person;
  poes: POE[];
  programOutcomes: ProgramOutcome[];
  currentChecklistSRF: Partial<Record<number, SRF>>;
  previousChecklistSRF: Partial<Record<number, SRF>>;
  previousStatus?: "Returned by Chair" | "Returned by Dean" | string;
  previousDeanFeedback?: { syll_dean_feedback_text?: string | null } | null;
  onEditCourseRequirements?: () => void;
  onSubmitSyllabus?: () => void;
}

// ---------- Helpers ----------
const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

function redBorder(yesNo?: YesNo, showPrev = false, prevYesNo?: YesNo) {
  const triggered = yesNo === "no" || (showPrev && prevYesNo === "no");
  return triggered ? "ring-2 ring-red-500" : "";
}

// ---------- Remark Badge ----------
const RemarkBadge: React.FC<{
  current?: SRF;
  prev?: SRF;
  showPrevToggle: boolean;
}> = ({ current, prev, showPrevToggle }) => {
  const shouldShowIcon = current?.srf_yes_no === "no";
  const showPrev = prev?.srf_yes_no === "no";
  const [open, setOpen] = useState(false);

  if (!shouldShowIcon && !showPrev) return null;

  const remarkText =
    current?.srf_remarks ?? prev?.srf_remarks ?? "No remarks provided.";
  const visible = shouldShowIcon || (showPrevToggle && showPrev);
  if (!visible) return null;

  return (
    <div className="absolute -top-2 -right-2 z-[100]">
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[#d3494e] hover:text-red-700 rounded-full"
          title="View remark"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M2 5a3 3 0 013-3h14a3 3 0 013 3v9a3 3 0 01-3 3H9l-5 5v-5H5a3 3 0 01-3-3V5z" />
          </svg>
        </button>
        {open && (
          <div className="absolute top-full right-0 mt-2 w-72 max-w-xs bg-white text-gray-800 p-4 rounded-lg shadow-xl z-50">
            <div className="absolute -top-2 right-4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" />
            <p className="font-semibold text-red-600 mb-3 text-[18px]">
              Remarks:
            </p>
            <p className="text-center leading-snug text-[14px] mb-4">
              {remarkText}
            </p>
            <div className="flex justify-end">
              <Button size="xs" color="dark" onClick={() => setOpen(false)}>
                Okay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Main Component ----------
const SyllabusView: React.FC<Props> = (props) => {
  const {
    syll,
    instructors,
    bLeaders,
    chair,
    dean,
    poes,
    programOutcomes,
    currentChecklistSRF,
    previousChecklistSRF,
    previousStatus,
    previousDeanFeedback,
    onEditCourseRequirements,
    onSubmitSyllabus,
  } = props;

  const [showPrev, setShowPrev] = useState(false);
  const [showDeanFeedback, setShowDeanFeedback] = useState(false);

  const effectiveDate = useMemo(() => {
    try {
      const d = new Date(syll.effectivity_date);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const yy = String(d.getFullYear()).slice(-2);
      return `${mm}.${dd}.${yy}`;
    } catch {
      return syll.effectivity_date;
    }
  }, [syll.effectivity_date]);

  const current = (i: number) => currentChecklistSRF[i];
  const prev = (i: number) => previousChecklistSRF[i];

  return (
    <div className="bg-gray-50 py-6">
      {/* Action bar, header, tables, signatures ... (your JSX remains unchanged) */}

      {/* Dean Feedback Modal */}
      <Modal
        show={showDeanFeedback}
        onClose={() => setShowDeanFeedback(false)}
        size="md"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Feedback</h3>
          <div className="border border-blue-600 p-4 mb-2 rounded">
            <div>{previousDeanFeedback?.syll_dean_feedback_text || ""}</div>
          </div>
          <div className="flex justify-end mt-4">
            <Button color="blue" onClick={() => setShowDeanFeedback(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SyllabusView;
