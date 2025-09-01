import React, { useState } from "react";

interface Role {
  role_id: number;
  role_name: string;
}

interface AssignRoleProps {
  userId: string;
  allRoles: Role[];
}

const AssignRole: React.FC<AssignRoleProps> = ({ userId, allRoles }) => {
  const [selectedRole, setSelectedRole] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet → just log data
    console.log("Assigning role:", { userId, selectedRole });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-top"
      style={{ backgroundImage: `url("/assets/wave1.png")` }}
    >
      <div className="p-4 flex items-center justify-center">
        <div className="max-w-md bg-gradient-to-r from-white to-blue-100 w-[500px] p-6 rounded-lg shadow-lg">
          {/* Logo */}
          <img
            className="text-center mt-2 w-[300px] m-auto mb-2"
            src="/assets/Create User Role.png"
            alt="SyllabEase Logo"
          />

          {/* Form */}
          <form className="p-4 pt-8" onSubmit={handleSubmit}>
            {/* Hidden input simulation */}
            <input type="hidden" name="user_id" value={userId} />

            {/* Role Selection */}
            <div className="mb-6">
              <label
                htmlFor="role_id"
                className="block font-semibold text-xl mb-2"
              >
                Role
              </label>
              <select
                id="role_id"
                name="role_id"
                value={selectedRole}
                onChange={(e) => setSelectedRole(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  -- Select a role --
                </option>
                {allRoles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-semibold py-2 rounded-lg m-2 mt-[40px] mb-4"
              >
                Assign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignRole;
