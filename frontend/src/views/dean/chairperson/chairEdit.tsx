import React, { useState } from "react";


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

export default function ChairEdit() {
  const [form, setForm] = useState({
    user_id: chair.user_id,
    department_id: chair.entity_id,
    start_validity: chair.start_validity,
    end_validity: chair.end_validity,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    // Simulate request
    setTimeout(() => {
      setLoading(false);
      alert("Chair updated! (Frontend only demo)");
    }, 1000);
  };

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center pt-20 bg-no-repeat bg-top bg-cover bg-transparent" style={{ backgroundImage: "url(/assets/Wave.png)" }}>
      {/* Card */}
      <div className="max-w-md bg-white w-full sm:w-[560px] p-6 px-8 rounded-lg shadow-lg relative">
        <img
          className="edit_user_img text-center mt-4 mb-6 w-full max-w-[280px] m-auto"
          src="/assets/Edit Chairperson.png"
          alt="SyllabEase Logo"
        />

        <form onSubmit={handleSubmit}>
            {/* Chairperson Dropdown */}
            <div className="mb-6">
              <label htmlFor="user_id" className="block mb-1">
                Chairperson
              </label>
              <select
                name="user_id"
                id="user_id"
                className="px-1 py-1 w-full max-w-[400px] border rounded border-black"
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

            {/* Department Dropdown */}
            <div className="mb-6">
              <label htmlFor="department_id" className="block mb-1">
                Department
              </label>
              <select
                name="department_id"
                id="department_id"
                className="px-1 py-1 w-full max-w-[400px] border rounded border-black"
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

            {/* Validity Dates */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="mb-3">
                <label htmlFor="start_validity" className="block mb-1">
                  Start of Validity
                </label>
                <input
                  type="date"
                  name="start_validity"
                  id="start_validity"
                  className="px-1 py-1 w-full max-w-[190px] border rounded h-10 border-gray-400"
                  value={form.start_validity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_validity" className="block mb-1">
                  End of Validity
                </label>
                <input
                  type="date"
                  name="end_validity"
                  id="end_validity"
                  className="px-1 py-1 w-full max-w-[190px] border rounded h-10 border-gray-400"
                  value={form.end_validity}
                  onChange={handleChange}
                />
                {error && (
                  <div className="text-red-500 text-sm mt-1">{error}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="whitespace-nowrap rounded-xl px-6 py-2 mt-4 mb-4 flex items-center gap-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out hover:scale-105 disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="7" r="4" />
                  <path
                    d="M20 8v6M23 11h-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {loading ? "Assigning..." : "Assign Chair"}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
