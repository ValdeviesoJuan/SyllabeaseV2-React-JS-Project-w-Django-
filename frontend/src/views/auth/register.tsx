import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    prefix: "",
    suffix: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    console.log("Submitted Data:", formData);
    navigate("/login");
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      <div className="flex h-screen">
        {/* Left Panel (Image) */}
        <div className="hidden lg:block w-[60%] relative">
          <img
            src="/assets/reg-img1.png"
            alt="Register"
            className="w-full h-full object-cover"
            style={{ objectPosition: "1% center" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "#FFFFFFFF", opacity: 0.15 }}
          />
        </div>

        {/* Right Panel (Form) */}
        <div className="relative w-full lg:w-[40%] flex items-center justify-center px-6 bg-white overflow-hidden">
          {/* Decorative Blobs */}
          <svg
            className="absolute top-0 right-0 z-0 pointer-events-none"
            width="360"
            height="260"
            viewBox="0 0 360 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ right: "-60px", top: "-40px" }}
          >
            <path
              fill="#3188CFFF"
              d="M360,0 Q330,90 270,120 Q210,150 180,90 Q150,30 90,60 Q30,90 0,0 L360,0Z"
            />
          </svg>

          

          <div className="relative z-10 w-full max-w-md ">
            <div className="text-center mx-auto mb-8">
              <img
                src="/assets/Sample/syllabease.png"
                alt="SyllabEase Logo"
                className="mx-auto w-60"
              />
              <p className="text-gray-500 text-sm mt-2">
                Please fill out all the fields.
              </p>
            </div>
             <h1 className="text-xl font-bold text-black mb-6">Create Account</h1>
            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-2">
                <div>
                  <Label htmlFor="id" className="mb-1 block text-sm font-medium">
                    Employee Number
                  </Label>
                  <TextInput
                    id="id"
                    name="id"
                    required
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Enter employee number"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="firstname"
                    className="mb-1 block text-sm font-medium"
                  >
                    First Name
                  </Label>
                  <TextInput
                    id="firstname"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="lastname"
                    className="mb-1 block text-sm font-medium"
                  >
                    Last Name
                  </Label>
                  <TextInput
                    id="lastname"
                    name="lastname"
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <Label
                      htmlFor="prefix"
                      className="mb-1 block text-sm font-medium"
                    >
                      Prefix
                    </Label>
                    <TextInput
                      id="prefix"
                      name="prefix"
                      placeholder="Engr."
                      value={formData.prefix}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2">
                    <Label
                      htmlFor="suffix"
                      className="mb-1 block text-sm font-medium"
                    >
                      Suffix
                    </Label>
                    <TextInput
                      id="suffix"
                      name="suffix"
                      placeholder="PhD"
                      value={formData.suffix}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium"
                  >
                    Phone
                  </Label>
                  <TextInput
                    id="phone"
                    name="phone"
                    required
                    placeholder="09xxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                  >
                    Email Address
                  </Label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium"
                  >
                    Password
                  </Label>
                  <TextInput
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password_confirmation"
                    className="mb-1 block text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <TextInput
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="mt-2">
                  {Object.entries(errors).map(([field, message]) => (
                    <p key={field} className="text-red-500 text-xs">
                      {message}
                    </p>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-500">
                Register
              </Button>

              <div className="text-center text-sm mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
