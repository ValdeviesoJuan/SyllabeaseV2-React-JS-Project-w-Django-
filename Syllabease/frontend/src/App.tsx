import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      <div className="flex h-screen">
        {/* Left Panel */}
        <div className="relative w-full lg:w-[40%] flex items-center justify-center px-6 bg-white overflow-hidden">
          {/* Top Right Smooth Side Blob */}
          <svg
            className="absolute top-0 right-0 z-0 pointer-events-none"
            width="360"
            height="260"
            viewBox="0 0 360 260"
            aria-hidden
            style={{ right: -60, top: -40 }}
          >
            <path fill="#3188CFFF" d="M360,0 Q330,90 270,120 Q210,150 180,90 Q150,30 90,60 Q30,90 0,0 L360,0Z" />
          </svg>

          {/* Bottom Left Smooth Side Blob */}
          <svg
            className="absolute bottom-0 left-0 z-0 pointer-events-none"
            width="420"
            height="300"
            viewBox="0 0 420 300"
            aria-hidden
            style={{ left: -120, bottom: -60 }}
          >
            <path fill="#3188CFFF" d="M0,300 Q60,200 140,170 Q220,140 260,210 Q300,280 380,250 Q420,230 420,300 L0,300Z" />
          </svg>

          {/* Login Card */}
          <div className="relative z-10 w-full max-w-md">
            {/* Logo */}
            <div className="text-center mx-auto mb-10 p-5">
              <img src="/assets/Sample/syllabease.png" alt="SyllabEase Logo" className="mx-auto w-60" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <a href="/forgot-password" className="text-xs text-blue-700 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockClosedIcon className="h-5 w-5" />
                  </span>
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                    tabIndex={-1}
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

            {/* Bottom Text */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 font-semibold hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block w-[60%] relative">
          <img src="/assets/ustp_pic.jpg" alt="USTP Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: '#dfaa0c', opacity: 0.15 }} />
        </div>
      </div>
    </div>
  );
}
