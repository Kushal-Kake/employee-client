import React from "react";
import { Register } from "../components/auth/Registration";
import { Link } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-purple-100 flex items-center justify-center">
        <div className="text-9xl animate-bounce select-none">🚀</div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <Register />

          {/* Bottom link to Login */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Already registered?{" "}
            <Link to="/" className="text-purple-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
