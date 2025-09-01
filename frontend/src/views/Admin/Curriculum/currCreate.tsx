import React, { useState } from "react";

interface Department {
  department_id: number;
  department_code: string;
}

const CurrCreate: React.FC = () => {
  // Mocked departments (replace later with API call from Django backend)
  const [departments] = useState<Department[]>([
    { department_id: 1, department_code: "CS" },
    { department_id: 2, department_code: "IT" },
    { department_id: 3, department_code: "ENG" },
  ]);

  const [formData, setFormData] = useState({
    department_id: "",
    curr_code: "",
    effectivity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted ✅", formData);
    alert("Curriculum created (frontend only, no backend yet)!");
  };

  return (
    <div
      className="p-4 flex items-center justify-center min-h-screen bg-gray-100 bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url('/assets/Wave1.png')" }}
    >
      <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[500px] p-6 rounded-lg shadow-lg">
        {/* Logo */}
        <img
          className="text-center mt-4 w-[300px] m-auto mb-6"
          src="/assets/Create New Curriculum.png"
          alt="SyllabEase Logo"
        />

        {/* Form */}
        <form className="text-center" onSubmit={handleSubmit}>
          {/* Department */}
          <div className="m-4">
            <div>
              <label className="mr-[64%]" htmlFor="department_id">
                Department
              </label>
            </div>
            <div className="text-left ml-[6.5%]">
              <select
                name="department_id"
                id="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="px-1 py-[6px] w-[320px] border rounded border-gray-400"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>
                    {dept.department_code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Curriculum Code */}
          <div className="m-4">
            <div>
              <label className="mr-[54%]" htmlFor="curr_code">
                Curriculum Code
              </label>
            </div>
            <input
              type="text"
              name="curr_code"
              id="curr_code"
              value={formData.curr_code}
              onChange={handleChange}
              className="px-1 py-[6px] w-[320px] border rounded h-[35px] border-[#a3a3a3]"
              required
            />
          </div>

          {/* Effectivity */}
          <div className="m-4">
            <div>
              <label className="mr-[68%]" htmlFor="effectivity">
                Effectivity
              </label>
            </div>
            <input
              type="text"
              name="effectivity"
              id="effectivity"
              value={formData.effectivity}
              onChange={handleChange}
              className="px-1 py-[6px] w-[320px] border rounded h-[35px] border-[#a3a3a3]"
              required
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="text-white font-semibold px-6 py-2 rounded-lg m-2 mt-4 mb-4 bg-blue-500 hover:bg-blue-600 transition"
            >
              Create Curriculum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrCreate;
