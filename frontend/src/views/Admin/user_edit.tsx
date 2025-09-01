import React, { useState } from "react";
import { Button } from "flowbite-react";

const UserEdit: React.FC = () => {
  // ✅ Temporary state for form fields (mocking $user from Laravel)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    prefix: "",
    suffix: "",
    phone: "",
    email: "",
  });

  // ✅ Update field values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Mock form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("User updated (frontend only). Check console log.");
  };

  return (
    <div
      className="p-4 flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/assets/wave1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div className="max-w-md w-[500px] p-6 bg-gradient-to-r from-white to-blue-100 rounded-lg shadow-lg">
        <img
          className="text-center mt-2 m-auto mb-2 w-[200px]"
          src="/assets/Edit User.png"
          alt="SyllabEase Logo"
        />

        <form onSubmit={handleSubmit} className="p-4">
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          {/* Prefix */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="prefix">
              Prefix
            </label>
            <input
              type="text"
              id="prefix"
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          {/* Suffix */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="suffix">
              Suffix
            </label>
            <input
              type="text"
              id="suffix"
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <Button type="submit" color="blue" className="px-8 py-2 font-semibold">
              Update User
            </Button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-4">
            <a
              href="/admin"
              className="text-blue-600 hover:underline font-medium"
            >
              Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
