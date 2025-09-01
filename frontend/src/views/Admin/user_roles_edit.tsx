import React, { useState } from "react";
import { Button } from "flowbite-react";

interface Role {
  ur_id: number;
  role_id: number;
  role_name: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  user_roles: Role[];
}

interface AllRole {
  role_id: number;
  role_name: string;
}

const UserRoles: React.FC = () => {
  // ✅ Mock user data
  const [user, setUser] = useState<User>({
    id: 1,
    firstname: "John",
    lastname: "Doe",
    user_roles: [
      { ur_id: 1, role_id: 1, role_name: "Admin" },
      { ur_id: 2, role_id: 2, role_name: "Editor" },
    ],
  });

  // ✅ Mock all roles
  const allRoles: AllRole[] = [
    { role_id: 1, role_name: "Admin" },
    { role_id: 2, role_name: "Editor" },
    { role_id: 3, role_name: "Viewer" },
  ];

  // ✅ Mock form state for updating roles
  const [rolesForm, setRolesForm] = useState(
    user.user_roles.reduce((acc, r) => {
      acc[r.ur_id] = r.role_id;
      return acc;
    }, {} as Record<number, number>)
  );

  // ✅ Handle select change
  const handleChange = (ur_id: number, value: number) => {
    setRolesForm({ ...rolesForm, [ur_id]: value });
  };

  // ✅ Mock update role
  const handleUpdate = (ur_id: number) => {
    console.log(`Update role ${ur_id} to ${rolesForm[ur_id]}`);
    alert("Role updated (frontend only)");
  };

  // ✅ Mock delete role
  const handleDelete = (ur_id: number) => {
    console.log(`Delete role ${ur_id}`);
    alert("Role deleted (frontend only)");
  };

  return (
    <div
      className="p-4 min-h-screen"
      style={{
        backgroundImage: "url('/assets/wave1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div className="flex flex-col justify-center mb-20">
        <div className="w-full max-w-[1030px] mx-auto bg-transparent py-12 px-12 flex flex-col space-y-6 rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between h-[110px] p-4 rounded-lg">
            <h2 className="text-3xl font-semibold text-center flex items-center gap-2">
              <svg
                className="-mb-2"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  stroke="#1e3a8a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              {user.firstname} {user.lastname}
            </h2>
            <a
              href={`/admin/user/roles/create/${user.id}`}
              className="flex items-center gap-2 px-4 py-2 font-semibold rounded-xl bg-blue-100 hover:bg-blue-200 transition transform hover:scale-105"
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
                <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
              </svg>
              Assign New Role
            </a>
          </div>

          {/* Roles Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {user.user_roles.map((role) => (
              <div
                key={role.ur_id}
                className="p-4 w-[280px] bg-gradient-to-r from-white to-blue-100 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
              >
                <div className="text-center text-2xl font-semibold mb-4">{role.role_name}</div>

                {/* Label beside select */}
                <div className="mb-6 flex items-center gap-2">
                  <label
                    htmlFor={`role-select-${role.ur_id}`}
                    className="font-semibold"
                  >
                    Role
                  </label>
                  <select
                    id={`role-select-${role.ur_id}`}
                    value={rolesForm[role.ur_id]}
                    onChange={(e) => handleChange(role.ur_id, parseInt(e.target.value))}
                    className="flex-1 p-1 border border-gray-300 rounded"
                  >
                    {allRoles.map((r) => (
                      <option key={r.role_id} value={r.role_id}>
                        {r.role_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Button
                    onClick={() => handleUpdate(role.ur_id)}
                    color="blue"
                    className="w-full"
                  >
                    Update Role
                  </Button>
                  <Button
                    onClick={() => handleDelete(role.ur_id)}
                    color="failure"
                    outline
                    className="w-full"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
