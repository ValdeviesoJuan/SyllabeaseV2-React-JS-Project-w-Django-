import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaUserGraduate,
  FaBriefcase,
  FaPeopleGroup,
  FaChalkboardUser,
  FaUserCheck,
  FaKey,
} from "react-icons/fa6"; // ✅ react-icons (FontAwesome v6)

interface Role {
  role_id: number;
  role_name: string;
}

const mockRoles: Role[] = [
  { role_id: 1, role_name: "Admin" },
  { role_id: 2, role_name: "Dean" },
  { role_id: 3, role_name: "Chairperson" },
  { role_id: 4, role_name: "Bayanihan Leader" },
  { role_id: 5, role_name: "Bayanihan Teacher" },
  { role_id: 6, role_name: "Auditor" },
];

export default function UserHome() {
  const navigate = useNavigate();
  const roles: Role[] = mockRoles;

  useEffect(() => {
    if (roles.length === 1) {
      const singleRole = roles[0];
      const href = getRoleHref(singleRole.role_id);
      navigate(href);
    }
  }, [roles, navigate]);

  const getRoleHref = (roleId: number): string => {
    switch (roleId) {
      case 1:
        return "/admin/home";
      case 2:
        return "/dean/home";
      case 3:
        return "/chairperson/home";
      case 4:
        return "/bayanihan-leader/home";
      case 5:
        return "/bayanihan-teacher/home";
      case 6:
        return "/auditor/home";
      default:
        return "#";
    }
  };

  // ✅ Map role_id to React Icons
  const roleIcons: Record<number, React.ReactElement> = {
    1: <FaUserShield />,
    2: <FaUserGraduate />,
    3: <FaBriefcase />,
    4: <FaPeopleGroup />,
    5: <FaChalkboardUser />,
    6: <FaUserCheck />,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/assets/ustp_pic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#F8BD0C]/20 pointer-events-none"></div>

      {/* Container */}
      <div className="relative bg-[#faf6e8] rounded-2xl p-8 max-w-lg mx-auto shadow-lg text-center z-10">
        {/* Logo */}
        <img
          src="/assets/Sample/syllabease.png"
          alt="SyllabEase"
          className="mx-auto mb-6 w-[240px]"
        />

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 mb-6">Login as</h1>

        {/* Role Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {roles.map((role) => (
            <button
              key={role.role_id}
              onClick={() => navigate(getRoleHref(role.role_id))}
              className="flex items-center justify-start gap-3 bg-[#d7ecf9] rounded-xl px-4 py-3 text-[#1a3557] font-medium shadow-sm hover:bg-[#c3dff3] transition w-full"
            >
              <span className="text-xl">
                {roleIcons[role.role_id] ?? <FaKey />}
              </span>
              {role.role_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
