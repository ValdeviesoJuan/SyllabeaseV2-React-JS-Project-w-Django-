import React, { useState } from "react";
import { Select, TextInput, Button } from "flowbite-react";

interface Department {
  department_id: number;
  department_code: string;
}

interface Curriculum {
  curr_id: number;
  department_id: number;
  curr_code: string;
  effectivity: string;
}

interface Props {
  departments: Department[];
  curriculum: Curriculum;
}

const EditCurriculum: React.FC<Props> = ({ departments, curriculum }) => {
  const [currCode, setCurrCode] = useState(curriculum.curr_code);
  const [effectivity, setEffectivity] = useState(curriculum.effectivity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with Django backend via API
    console.log({
      curr_id: curriculum.curr_id,
      department_id: curriculum.department_id,
      curr_code: currCode,
      effectivity: effectivity,
    });
    alert("Curriculum update request submitted!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-fixed"
      style={{ backgroundImage: `url(/assets/Wave1.png)`, backgroundSize: "contain" }}
    >
      <div className="max-w-md w-[500px] bg-gradient-to-r from-white to-blue-100 p-6 rounded-lg shadow-lg">
        <img
          className="text-center mt-4 w-[240px] mx-auto mb-6"
          src="/assets/Edit Curriculum.png"
          alt="SyllabEase Logo"
        />
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            {/* Department Field */}
            <div className="m-2 mb-6">
              <label className="block text-left mb-2 font-medium" htmlFor="department_id">
                Department
              </label>
              <Select
                id="department_id"
                value={curriculum.department_id.toString()}
                disabled
                className="w-[340px]"
              >
                {departments.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>
                    {dept.department_code}
                  </option>
                ))}
              </Select>
            </div>

            {/* Curriculum Code Field */}
            <div className="m-2 mb-6">
              <label className="block text-left mb-2 font-medium" htmlFor="curr_code">
                Curriculum Code
              </label>
              <TextInput
                id="curr_code"
                value={currCode}
                onChange={(e) => setCurrCode(e.target.value)}
                required
                className="w-[340px]"
              />
            </div>

            {/* Effectivity Field */}
            <div className="m-2 mb-6">
              <label className="block text-left mb-2 font-medium" htmlFor="effectivity">
                Effectivity
              </label>
              <TextInput
                id="effectivity"
                value={effectivity}
                onChange={(e) => setEffectivity(e.target.value)}
                required
                className="w-[340px]"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" color="blue" className="mt-4 mb-4">
                Update Curriculum
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCurriculum;
