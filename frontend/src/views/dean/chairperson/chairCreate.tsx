import React, { useState } from "react";

export default function AssignChair() {
  const [chairperson, setChairperson] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      chairperson,
      department,
      startDate,
      endDate,
    };

    console.log("Assign Chair:", payload);

    setTimeout(() => {
      setLoading(false);
      alert("Chairperson assigned successfully! (dummy response)");
    }, 1500);
  };

  return (
    <div className="flex-1">
      <div className="min-h-screen flex items-center justify-center pt-12" 
      style={{
        backgroundImage: `url(/assets/Wave.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "transparent",
        minHeight: "100vh" // ensures it fills the screen
      }}> 

        {/* Card */}
        <div className="max-w-md bg-white w-[560px] p-6 px-8 rounded-lg shadow-lg relative">
          <img
            className="text-center mt-4 w-[330px] m-auto mb-6"
            src="/assets/Assign Chairperson.png"
            alt="Assign Chairperson"
          />

          <form onSubmit={handleSubmit}>
            {/* Chairperson Dropdown */}
            <div className="m-6">
              <label className="flex mb-1" htmlFor="user_id">
                Chairperson
              </label>
              <select
                id="user_id"
                className="w-full px-3 py-2 border rounded border-gray-400"
                value={chairperson}
                onChange={(e) => setChairperson(e.target.value)}
                required
              >
                <option value="">Select a chairperson</option>
                <option value="1">Doe, John</option>
                <option value="2">Smith, Jane</option>
                <option value="3">Garcia, Alex</option>
              </select>
            </div>

            {/* Department Dropdown */}
            <div className="m-6">
              <label className="flex mb-1" htmlFor="department_id">
                Department
              </label>
              <select
                id="department_id"
                className="w-full px-3 py-2 border rounded border-gray-400"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select a department</option>
                <option value="1">Computer Science</option>
                <option value="2">Information Technology</option>
                <option value="3">Engineering</option>
              </select>
            </div>

            {/* Validity Dates */}
            <div className="grid gap-6 md:grid-cols-2 m-6">
              <div>
                <label className="flex mb-1" htmlFor="start_validity">
                  Start of Validity
                </label>
                <input
                  type="date"
                  id="start_validity"
                  className="w-full px-3 py-2 border rounded border-gray-400"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="flex mb-1" htmlFor="end_validity">
                  End of Validity
                </label>
                <input
                  type="date"
                  id="end_validity"
                  className="w-full px-3 py-2 border rounded border-gray-400"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="whitespace-nowrap rounded-xl px-6 py-2 mt-4 mb-4 flex items-center gap-2 font-semibold text-black 
                          bg-blue-500 hover:bg-blue-100 transition ease-in-out hover:scale-105 disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
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

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
              <img
                src="/assets/Sample/loading.gif"
                alt="loading..."
                className="w-16"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
