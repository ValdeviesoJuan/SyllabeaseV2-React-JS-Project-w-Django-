import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ email, password });

    if (email && password) {
      navigate("/bayanihan-leader/home");
    }
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      <div className="flex h-screen">
        {/* Left Panel */}
        <div className="relative w-full lg:w-[40%] flex items-center justify-center px-6 bg-white overflow-hidden">
          {/* ✅ Top Right Smooth Side Blob */}
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
              fill="#3188CF"
              d="M360,0 Q330,90 270,120 Q210,150 180,90 Q150,30 90,60 Q30,90 0,0 L360,0Z"
            />
          </svg>

          {/* ✅ Bottom Left Smooth Side Blob */}
          <svg
            className="absolute bottom-0 left-0 z-0 pointer-events-none"
            width="420"
            height="300"
            viewBox="0 0 420 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ left: "-120px", bottom: "-60px" }}
          >
            <path
              fill="#3188CF"
              d="M0,300 Q60,200 140,170 Q220,140 260,210 Q300,280 380,250 Q420,230 420,300 L0,300Z"
            />
          </svg>

          {/* Login Form */}
          <div className="relative z-10 w-full max-w-md">
            <div className="text-center mx-auto mb-8">
              <img src="/assets/Sample/syllabease.png" alt="SyllabEase Logo" className="mx-auto w-60" />
            </div>

            <h1 className="text-xl font-bold text-black mb-6">Login</h1>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-2 block text-sm font-medium text-black">
                  Email address
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  <TextInput
                    id="email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={UserIcon}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="mb-2 block text-sm font-medium text-black">
                  Password
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
                    <LockClosedIcon className="h-5 w-5" />
                  </span>
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={LockClosedIcon}
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
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full bg-blue-500">
                Login
              </Button>

              <div className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-500 font-semibold hover:underline">
                  Create Account
                </a>
              </div>
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
