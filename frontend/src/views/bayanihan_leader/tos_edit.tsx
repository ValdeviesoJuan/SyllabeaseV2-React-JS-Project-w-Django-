// src/views/bayanihan_leader/TosEdit.tsx
import React, { useEffect, useState } from "react";

interface Syllabus {
  course_code: string;
  bg_school_year: string;
  course_semester: string;
}

interface TosData {
  tos_term: "Midterm" | "Final";
  tos_no_items: number;
  tos_cpys: string;
  col_1_per: number;
  col_2_per: number;
  col_3_per: number;
  col_4_per: number;
}

const mockSyllabus: Syllabus = {
  course_code: "CS101",
  bg_school_year: "2025-2026",
  course_semester: "1st Semester",
};

const midtermTopics = ["Topic 1", "Topic 2", "Topic 3"];
const finalTopics = ["Topic 4", "Topic 5", "Topic 6"];

const TosEdit: React.FC = () => {
  const [tos, setTos] = useState<TosData>({
    tos_term: "Midterm",
    tos_no_items: 50,
    tos_cpys: "BSCS-3A",
    col_1_per: 25,
    col_2_per: 25,
    col_3_per: 25,
    col_4_per: 25,
  });

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [currentTotal, setCurrentTotal] = useState(0);

  // Update total whenever cognitive inputs change
  useEffect(() => {
    const total =
      tos.col_1_per + tos.col_2_per + tos.col_3_per + tos.col_4_per;
    setCurrentTotal(total);

    if (total !== 100) {
      setFeedback("Total should be exactly 100%");
    } else {
      setFeedback("");
    }
  }, [tos]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setTos((prev) => {
      const updated = { ...prev, [name]: name.includes("col") ? +value : value };

      // Enforce max 50% for Knowledge
      if (name === "col_1_per" && +value > 50) {
        alert("Knowledge should not exceed 50%");
        updated.col_1_per = 50;
      }
      return updated;
    });
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTotal !== 100) {
      alert("Cannot update TOS. Total must be exactly 100%");
      return;
    }
    console.log("Submitting TOS:", { tos, selectedTopics });
    alert("TOS Updated (frontend only, no backend yet)");
  };

  return (
    <div className="flex flex-col justify-center mx-auto bg-no-repeat bg-top bg-contain" 
    style={{ backgroundImage: "url(/assets/Wave.png)" }}>
      <div className="relative mt-20 flex flex-col bg-gradient-to-r from-white to-blue-100 rounded-xl shadow-lg p-6 mx-auto border border-gray-200 w-[715px]">
        <div>
          <img
            className="w-[200px] mx-auto mb-4"
            src="/assets/Edit TOS.png"
            alt="SyllabEase Logo"
          />
        </div>

        <div className="pl-4 mt-4">
          <span className="font-bold">Course Code: </span>
          <span>{mockSyllabus.course_code}</span>
        </div>

        <div className="pl-4">
          <span className="font-bold">S.Y. & Semester: </span>
          <span>
            {mockSyllabus.bg_school_year} - {mockSyllabus.course_semester}
          </span>
        </div>

        <div className="m-8">
          <form onSubmit={handleSubmit}>
            {/* Term Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TOS Term
              </label>
              <select
                name="tos_term"
                value={tos.tos_term}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Midterm">Midterm</option>
                <option value="Final">Final</option>
              </select>
            </div>

            {/* Midterm Topics */}
            {tos.tos_term === "Midterm" && (
              <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                  Select Midterm Topics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {midtermTopics.map((topic) => (
                    <label
                      key={topic}
                      className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition rounded-sm px-3 py-2 border"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Final Topics */}
            {tos.tos_term === "Final" && (
              <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                  Select Final Topics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {finalTopics.map((topic) => (
                    <label
                      key={topic}
                      className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition rounded-sm px-3 py-2 border"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Inputs */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label>Total No. of Test Items</label>
                <input
                  type="number"
                  name="tos_no_items"
                  value={tos.tos_no_items}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label>Curricular Program/Year/Section</label>
                <input
                  type="text"
                  name="tos_cpys"
                  value={tos.tos_cpys}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
            </div>

            {/* Cognitive Levels */}
            <p className="font-semibold text-xl text-center mb-4">
              Cognitive Level
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Knowledge (Max 50%)</p>
                <input
                  type="number"
                  name="col_1_per"
                  value={tos.col_1_per}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-[200px] p-2"
                />
              </div>
              <div>
                <p>Comprehension</p>
                <input
                  type="number"
                  name="col_2_per"
                  value={tos.col_2_per}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-[200px] p-2"
                />
              </div>
              <div>
                <p>Application / Analysis</p>
                <input
                  type="number"
                  name="col_3_per"
                  value={tos.col_3_per}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-[200px] p-2"
                />
              </div>
              <div>
                <p>Synthesis / Evaluation</p>
                <input
                  type="number"
                  name="col_4_per"
                  value={tos.col_4_per}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-[200px] p-2"
                />
              </div>
            </div>

            {/* Feedback */}
            <div className="text-red-600 font-bold mt-4">{feedback}</div>
            <div className="font-bold mt-2">
              Current Total: {currentTotal}%
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Update TOS
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TosEdit;
