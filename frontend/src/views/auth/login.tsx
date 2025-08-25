import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // ✅ import this

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // ✅ create navigator

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ email, password });

    // TODO: validate with Django backend later
    if (email && password) {
      navigate("/bayanihan-leader/home"); // ✅ redirect after login
    }
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      <div className="flex h-screen">
        {/* Left Panel */}
        <div className="relative w-full lg:w-[40%] flex items-center justify-center px-6 bg-white overflow-hidden">
          {/* Login Card */}
          <div className="relative z-10 w-full max-w-md">
            <div className="text-center mx-auto mb-10 p-5">
              <img src="/assets/Sample/syllabease.png" alt="SyllabEase Logo" className="mx-auto w-60" />
            </div>

            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </h2>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  <TextInput
                    id="email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockClosedIcon className="h-5 w-5" />
                  </span>
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block w-[60%] relative">
          <img src="/assets/ustp_pic.jpg" alt="USTP Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "#dfaa0c", opacity: 0.15 }} />
        </div>
      </div>
    </div>
  );
}
