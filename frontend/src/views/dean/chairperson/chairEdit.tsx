import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";

// Mock data for users, departments, and a chair record
const users = [
  { id: 1, firstname: "Juan", lastname: "Valdevieso" },
  { id: 2, firstname: "Maria", lastname: "Santos" },
];
const departments = [
  { department_id: 1, department_name: "Computer Science" },
  { department_id: 2, department_name: "Mathematics" },
];
const chair = {
  ur_id: 1,
  user_id: 2,
  entity_id: 1,
  start_validity: "2024-09-01",
  end_validity: "2025-08-31",
};

const ChairEdit: React.FC = () => {
  const [form, setForm] = useState({
    user_id: chair.user_id,
    department_id: chair.entity_id,
    start_validity: chair.start_validity,
    end_validity: chair.end_validity,
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.end_validity && form.end_validity < form.start_validity) {
      setError("End of validity cannot be before start of validity.");
      return;
    }
    setError("");
    alert("Chair updated! (Frontend only demo)");
  };

  return (
    <div className="flex">
      {/* Sidebar and Header */}
      <DeanSidebar />
      <div className="flex-1">
        <DeanHeader children={undefined} />

        {/* Page content */}
        <div
          className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-contain"
          style={{ backgroundImage: "url(/assets/Wave1.png)" }}
        >
          <div className="max-w-md bg-gradient-to-r from-[#FFF] to-[#dbeafe] w-[500px] p-6 rounded-lg shadow-lg">
            <img
              className="edit_user_img text-center mt-4 mb-6 w-[280px] m-auto mb-2"
              src="/assets/Edit Chairperson.png"
              alt="SyllabEase Logo"
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="user_id">Chairperson</label>
                <select
                  name="user_id"
                  id="user_id"
                  className="px-1 py-[6px] w-[400px] border rounded border-black"
                  value={form.user_id}
                  onChange={handleChange}
                  required
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.lastname}, {user.firstname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="department_id">Department</label>
                <select
                  name="department_id"
                  id="department_id"
                  className="px-1 py-[6px] w-[400px] border rounded border-black"
                  value={form.department_id}
                  onChange={handleChange}
                  required
                >
                  {departments.map((department) => (
                    <option
                      key={department.department_id}
                      value={department.department_id}
                    >
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-6 mb-3 md:grid-cols-2">
                <div>
                  <label htmlFor="start_validity">Start of Validity</label>
                  <input
                    type="date"
                    name="start_validity"
                    id="start_validity"
                    className="px-1 py-[6px] w-[190px] border rounded h-[38px] border-[#a3a3a3]"
                    value={form.start_validity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="end_validity">End of Validity</label>
                  <input
                    type="date"
                    name="end_validity"
                    id="end_validity"
                    className="px-1 py-[6px] w-[190px] border rounded h-[38px] border-[#a3a3a3]"
                    value={form.end_validity}
                    onChange={handleChange}
                  />
                  {error && (
                    <div className="text-red-500 text-sm mt-1">{error}</div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary font-semibold text-white px-6 py-2 rounded-lg m-2 mb-4 bg-blue"
                >
                  Update Chairman
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairEdit;
