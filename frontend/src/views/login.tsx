import { useState } from "react";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password, remember });
    // For now, no backend – just log it
  };

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center bg-cover bg-fixed"
      style={{ backgroundImage: "url('/assets/ustp-cdo.png')" }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <img
              className="w-52"
              src="/assets/Sample/syllabease.png"
              alt="syllabease a syllabus management system"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <Label htmlFor="email">Your email</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <Button type="submit" className="w-full">
              Sign in
            </Button>

            {/* Sign up */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-yellow-500 hover:underline"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
