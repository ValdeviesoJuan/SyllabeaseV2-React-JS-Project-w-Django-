import React, { useState } from "react";
import { Button } from "flowbite-react";

const CreateCurriculum: React.FC = () => {
  const [currCode, setCurrCode] = useState("");
  const [effectivity, setEffectivity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate API when backend is ready
    console.log("Curriculum Code:", currCode);
    console.log("Effectivity:", effectivity);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-contain"
      style={{
        backgroundImage: `url('/assets/Wave1.png')`,
      }}
    >
      <div className="max-w-md w-[500px] p-6 rounded-lg shadow-lg bg-gradient-to-r from-white to-blue-100">
        <img
          className="text-center mt-4 w-[300px] m-auto mb-6"
          src="/assets/Create New Curriculum.png"
          alt="SyllabEase Logo"
        />

        <form className="text-center" onSubmit={handleSubmit}>
          <div className="m-4 text-left">
            <label
              htmlFor="curr_code"
              className="block mb-1 font-medium text-gray-700"
            >
              Curriculum Code
            </label>
            <input
              placeholder="e.g. CITC-BSIT-2018-2019"
              type="text"
              id="curr_code"
              value={currCode}
              onChange={(e) => setCurrCode(e.target.value)}
              className="px-3 py-2 w-full border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="m-4 text-left">
            <label
              htmlFor="effectivity"
              className="block mb-1 font-medium text-gray-700"
            >
              Effectivity
            </label>
            <input
              placeholder="2018-2019"
              type="text"
              id="effectivity"
              value={effectivity}
              onChange={(e) => setEffectivity(e.target.value)}
              className="px-3 py-2 w-full border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="text-center mt-6">
            <Button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Curriculum
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCurriculum;
