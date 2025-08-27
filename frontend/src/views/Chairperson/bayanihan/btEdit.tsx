import React, { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import ChairSidebarLayout from "../../layouts/chairSidebar";

/**
 * Types
 */
export interface Course {
  course_id: number | string;
  course_code: string;
}

export interface User {
  id: number | string;
  firstname: string;
  lastname: string;
}

export interface BGroup {
  bg_id: number | string;
  course_id: number | string;
  leaders: Array<{ user_id: number | string }>;
  members: Array<{ user_id: number | string }>;
  bg_school_year: string;
}

const SCHOOL_YEARS = [
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
  "2027-2028",
  "2028-2029",
  "2029-2030",
];

// Mock data (replace with API later)
const mockCourses: Course[] = [
  { course_id: 1, course_code: "BSIT" },
  { course_id: 2, course_code: "BSCS" },
];

const mockUsers: User[] = [
  { id: 1, firstname: "Juan", lastname: "Dela Cruz" },
  { id: 2, firstname: "Maria", lastname: "Santos" },
  { id: 3, firstname: "Pedro", lastname: "Reyes" },
  { id: 4, firstname: "Ana", lastname: "Cruz" },
];

const mockTeams: BGroup[] = [
  {
    bg_id: 1,
    course_id: 1,
    leaders: [{ user_id: 1 }],
    members: [{ user_id: 2 }, { user_id: 3 }],
    bg_school_year: "2024-2025",
  },
  {
    bg_id: 2,
    course_id: 2,
    leaders: [{ user_id: 4 }],
    members: [{ user_id: 1 }, { user_id: 3 }],
    bg_school_year: "2025-2026",
  },
];

const EditBayanihanTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bGroup, setBGroup] = useState<BGroup | null>(null);
  const [courseId, setCourseId] = useState<string | number>("");
  const [selectedLeaders, setSelectedLeaders] = useState<Array<string | number>>([]);
  const [selectedMembers, setSelectedMembers] = useState<Array<string | number>>([]);
  const [schoolYear, setSchoolYear] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch team data (mock for now)
  useEffect(() => {
    const team = mockTeams.find((t) => t.bg_id.toString() === id);
    if (team) {
      setBGroup(team);
      setCourseId(team.course_id);
      setSelectedLeaders(team.leaders.map((l) => l.user_id));
      setSelectedMembers(team.members.map((m) => m.user_id));
      setSchoolYear(team.bg_school_year);
    }
    setLoading(false);
  }, [id]);

  const handleLeadersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedLeaders(selected);
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedMembers(selected);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);

    const payload = {
      course_id: courseId,
      bl_user_id: selectedLeaders,
      bm_user_id: selectedMembers,
      bg_school_year: schoolYear,
    };

    console.log("Submit payload:", payload);

    // Simulate API delay
    setTimeout(() => {
      setSuccessMessage("Bayanihan Team updated successfully!");
      setSubmitting(false);
    }, 600);
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  if (!bGroup) {
    return (
        <div className="min-h-screen flex items-center justify-center text-red-600">
          Team not found.
        </div>
    );
  }

  return (
      <div
        className="min-h-screen pt-14"
        style={{
          backgroundImage: "url('/assets/Wave1.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className="p-4 pb-10 flex items-center justify-center mt-14">
          <div className="max-w-md bg-gradient-to-r from-white to-sky-100 w-[560px] p-6 px-8 rounded-lg shadow-lg">
            <img
              className="edit_user_img text-center mt-4 w-[320px] m-auto mb-6"
              src="/assets/Edit Bayanihan Team.png"
              alt="Edit Team"
            />

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Course select */}
              <div className="mb-6">
                <label className="flex mb-2 font-medium text-sm" htmlFor="course_id">
                  Courses
                </label>
                <select
                  name="course_id"
                  id="course_id"
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                  required
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  {mockCourses.map((c) => (
                    <option key={c.course_id} value={c.course_id}>
                      {c.course_code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bayanihan Leaders */}
              <div className="mb-6">
                <label className="flex mb-2 font-medium text-sm" htmlFor="bl_user_id">
                  Bayanihan Leaders
                </label>
                <select
                  multiple
                  required
                  value={selectedLeaders.map(String)}
                  onChange={handleLeadersChange}
                  size={6}
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                >
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.lastname}, {user.firstname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bayanihan Members */}
              <div className="mb-6">
                <label className="flex mb-2 font-medium text-sm" htmlFor="bm_user_id">
                  Bayanihan Members
                </label>
                <select
                  multiple
                  required
                  value={selectedMembers.map(String)}
                  onChange={handleMembersChange}
                  size={6}
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                >
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.lastname}, {user.firstname}
                    </option>
                  ))}
                </select>
              </div>

              {/* School Year */}
              <div className="mb-6">
                <label className="flex mb-2 font-medium text-sm" htmlFor="bg_school_year">
                  School Year
                </label>
                <select
                  name="bg_school_year"
                  id="bg_school_year"
                  className="px-1 py-[6px] w-full border rounded border-gray-300"
                  required
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                >
                  {SCHOOL_YEARS.map((sy) => (
                    <option key={sy} value={sy}>
                      {sy}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="text-white font-semibold px-6 py-2 rounded-lg m-2 mt-4 mb-4 bg-blue-600"
                  disabled={submitting}
                >
                  {submitting ? "Updating..." : "Update Bayanihan Team"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default EditBayanihanTeam;
