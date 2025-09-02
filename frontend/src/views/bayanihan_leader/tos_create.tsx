// src/views/bayanihan_leader/TosCreate.tsx
import React, { useEffect, useState } from "react";

const TosCreate: React.FC = () => {
  // Fake props/data for now (replace later with API calls)
  const syllabus = {
    course_code: "CS101",
    bg_school_year: "2024-2025",
    course_semester: "1st Semester",
  };

  const midtermTopics = ["Topic 1", "Topic 2", "Topic 3"];
  const finalTopics = ["Topic A", "Topic B", "Topic C"];

  const [term, setTerm] = useState<"Midterm" | "Final">("Midterm");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [inputs, setInputs] = useState({
    knowledge: 25,
    comprehension: 25,
    application: 25,
    synthesis: 25,
  });

  const [feedback, setFeedback] = useState("");
  const [currentTotal, setCurrentTotal] = useState(100);

  // Handle checkbox toggle
  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  // Handle cognitive inputs
  const handleInputChange = (field: keyof typeof inputs, value: number) => {
    if (field === "knowledge" && value > 50) {
      alert("Knowledge should not exceed 50% as per CITL policy.");
      value = 0;
    }
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    const total =
      newInputs.knowledge +
      newInputs.comprehension +
      newInputs.application +
      newInputs.synthesis;

    setCurrentTotal(total);
    if (total !== 100) {
      setFeedback("Total should be 100%");
    } else {
      setFeedback("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTotal !== 100) {
      setFeedback("Cannot create TOS. Total must be exactly 100%.");
      return;
    }
    console.log("Form Submitted:", {
      term,
      selectedTopics,
      inputs,
    });
    alert("TOS created successfully! (frontend only)");
  };

  return (
    <div
      className="flex flex-col justify-center mx-auto"
      style={{
        backgroundImage: "url('/assets/Wave.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div className="relative mt-20 flex flex-col bg-gradient-to-r from-[#FFF] to-[#dbeafe] rounded-xl shadow-lg p-6 mx-auto border border-white w-[900px]">
        {/* Logo */}
        <div>
          <img
            className="w-[250px] m-auto mb-6"
            src="/assets/Create TOS.png"
            alt="SyllabEase Logo"
          />
        </div>

        {/* Course Info */}
        <div className="pl-4 mt-4 ml-4">
          <span className="font-bold">Course Code: </span>
          <span>{syllabus.course_code}</span>
        </div>
        <div className="pl-4 ml-4">
          <span className="font-bold">S.Y. & Semester: </span>
          <span>
            {syllabus.bg_school_year} - {syllabus.course_semester}
          </span>
        </div>

        {/* Form */}
        <form className="m-8" onSubmit={handleSubmit}>
          {/* Term */}
          <div className="mb-3">
            <label className="flex mb-1 font-semibold">Term</label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value as "Midterm" | "Final")}
              className="border border-gray-400 rounded w-[250px] p-2"
            >
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
            </select>
          </div>

          {/* Total Items & CPYS */}
          <div className="grid gap-6 mb-6 md:grid-cols-2 mr-6">
            <div className="mb-3">
              <label className="flex mb-1 font-semibold">
                Total No. of Test Items
              </label>
              <input
                type="number"
                className="border border-gray-400 rounded w-[350px] p-2"
                required
              />
            </div>
            <div className="mb-3">
              <label className="flex mb-1 font-semibold">
                Curricular Program/Year/Section
              </label>
              <input
                type="text"
                className="border border-gray-400 rounded w-[350px] p-2"
                required
              />
            </div>
          </div>

          {/* Topics */}
          {term === "Midterm" && (
            <div className="mb-6">
              <label className="font-semibold block mb-2">
                Select Midterm Topics
              </label>
              <div className="border border-gray-400 bg-white rounded p-4 w-[830px]">
                <div className="grid grid-cols-2 gap-3">
                  {midtermTopics.map((topic, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition rounded px-3 py-2 border border-gray-300"
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
            </div>
          )}

          {term === "Final" && (
            <div className="mb-6">
              <label className="font-semibold block mb-2">
                Select Final Topics
              </label>
              <div className="border border-gray-400 bg-white rounded p-4 w-[830px]">
                <div className="grid grid-cols-2 gap-3">
                  {finalTopics.map((topic, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition rounded px-3 py-2 border border-gray-300 "
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700 ">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Cognitive Levels */}
          <p className="font-semibold text-xl text-center mb-4">
            Cognitive Level
          </p>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <p>Knowledge (Max 50%)</p>
              <input
                type="number"
                value={inputs.knowledge}
                onChange={(e) =>
                  handleInputChange("knowledge", Number(e.target.value))
                }
                className="border border-gray-400 rounded w-[350px] p-2"
              />
            </div>
            <div>
              <p>Comprehension</p>
              <input
                type="number"
                value={inputs.comprehension}
                onChange={(e) =>
                  handleInputChange("comprehension", Number(e.target.value))
                }
                className="border border-gray-400 rounded w-[350px] p-2"
              />
            </div>
            <div>
              <p>Application / Analysis</p>
              <input
                type="number"
                value={inputs.application}
                onChange={(e) =>
                  handleInputChange("application", Number(e.target.value))
                }
                className="border border-gray-400 rounded w-[350px] p-2"
              />
            </div>
            <div>
              <p>Synthesis / Evaluation</p>
              <input
                type="number"
                value={inputs.synthesis}
                onChange={(e) =>
                  handleInputChange("synthesis", Number(e.target.value))
                }
                className="border border-gray-400 rounded w-[350px] p-2"
              />
            </div>
          </div>

          {/* Feedback */}
          <div className="text-red-500 font-bold mt-8">{feedback}</div>
          <div className="font-bold mt-2">
            Current Total: {currentTotal}%
          </div>

          {/* Submit */}
          <div className="flex justify-center mb-4 mt-4">
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2"
              style={{ background: "#d7ecf9" }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8v8M8 12h8"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
              Create TOS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TosCreate;
